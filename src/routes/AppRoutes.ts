import { Router } from 'express'
import { UserRoutes } from './UserRoutes'
import { AuthRoutes } from './AuthRoutes'
import Auth from '../middlewares/Auth'
import { Role } from '@prisma/client'
import { FurnitureRoutes } from './FurnitureRoutes'

const router = Router()
const authMiddleware = new Auth()

router.use(
  '/users',
  authMiddleware.verifyToken,
  //   authMiddleware.verifyRoles([Role.MANAGER, Role.ADMIN]),
  UserRoutes
)
router.use('/auth', AuthRoutes)
router.use('/furnitures',(req, res, next) => authMiddleware.verifyToken(req, res, next), FurnitureRoutes)

export { router as AppRoutes }
