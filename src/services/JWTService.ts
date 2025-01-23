import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { HttpException } from '../utils/HttpExceptions';
import { Role } from '@prisma/client';

dotenv.config();

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        roles: Role[];
    }
}

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env as { [key: string]: string };

export class JwtService {
    sign(payload: object, secret: string, options? : jwt.SignOptions): string {
        return jwt.sign(payload, secret, options)
    }
    
    getAuthToken(payload: object): AuthTokens {
        const accessToken = this.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRY,
        })

        const refreshToken = this.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRY
        })

        return {accessToken, refreshToken, user: {
            id: (payload as any).id,
            firstName: (payload as any).firstName,
            lastName: (payload as any).lastName,
            email: (payload as any).email,
            roles: (payload as any).roles
        }}
    }

    async verify(token: string, secret: string): Promise<jwt.JwtPayload> {
        const decoded: jwt.JwtPayload = await new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
              if (err) reject(new HttpException(403, "Forbidden"));
              else resolve(decoded as jwt.JwtPayload);
            });
          });
          return decoded;
    }

}