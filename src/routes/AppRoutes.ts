import { Router } from "express";
import { UserRoutes } from "./UserRoutes";
import Auth from "../middlewares/Auth";
import { Role } from "@prisma/client";

const router = Router();

const authMiddleware = new Auth();

router.use("/users" ,authMiddleware.verifyToken,authMiddleware.verifyRoles([Role.MANAGER, Role.ADMIN]), UserRoutes)

router.use("/users", UserRoutes);

export {router as AppRoutes}