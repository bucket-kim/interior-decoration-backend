import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import UserService from './UserService'
import { type AuthTokens, JwtService } from './JWTService'
import type {
  LoginUserInput,
  RegisterUserInput
} from '../validations/UserValidations'
import { HttpException } from '../utils/HttpExceptions'
import { Role } from '@prisma/client'

dotenv.config()

const userService = new UserService()
const jwtService = new JwtService()

export default class AuthService {
  private readonly userService: UserService
  private readonly jwtService: JwtService

  constructor() {
    this.userService = userService
    this.jwtService = jwtService
  }

  async login(data: LoginUserInput): Promise<AuthTokens> {
    let user

    if (data.email) user = await this.userService.getByKey('email', data.email)

    if (!user || !(await bcrypt.compare(data.password, user.password)))
      throw new HttpException(400, 'Wrong Credentials')

    const { id, email, roles, firstName, lastName } = user

    const { accessToken, refreshToken } = this.jwtService.getAuthToken({
        id,
      email,
      roles
    })

    await this.userService.update(user.id, { refreshToken })

    return {
      accessToken,
      refreshToken,
      user: { id, email, roles, firstName, lastName }
    }
  }

  async register(data: RegisterUserInput): Promise<AuthTokens> {
    const newUser = await this.userService.create(data)

    const { id, email, roles, firstName, lastName } = newUser

    const { accessToken, refreshToken } = this.jwtService.getAuthToken({
      email,
      roles
    })

    await this.userService.update(newUser.id, { refreshToken })

    return {
      accessToken,
      refreshToken,
      user: { id, email, roles, firstName, lastName }
    }
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    const user = await this.userService.getByKey('refreshToken', refreshToken)

    if (!user) throw new HttpException(403, 'Forbidden')

    const decoded = await this.jwtService.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    )

    const isRoleMatch = user.roles.every((role: Role) =>
      decoded.roles.includes(role)
    )

    if (decoded.email !== user.email || !isRoleMatch)
      throw new HttpException(403, 'Forbidden')

    const { accessToken } = this.jwtService.getAuthToken({
      email: user.email,
      roles: user.roles
    })

    return { accessToken }
  }

  async logout(refreshToken: string) {
    const user = await this.userService.getByKey('refreshToken', refreshToken)
    if (user)
      return await this.userService.update(user.id, { refreshToken: '' })
  }
}
