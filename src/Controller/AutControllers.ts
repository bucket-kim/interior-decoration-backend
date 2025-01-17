import type { CookieOptions, Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";

const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production"
}

const authService = new AuthService();

export default class AuthController {
    private readonly authService: AuthService
    
    constructor() {
        this.authService = authService
    }

    async login(_req: Request, res: Response, next: NextFunction) {
        try {
            const {accessToken, refreshToken} = await this.authService.login(_req.body);
            res.cookie("jwt", refreshToken, COOKIE_OPTIONS).status(200).send({accessToken})
        } catch (error) {
            next(error)
        }
    }

    async register(_req: Request, res: Response, next: NextFunction) {
        try {  
            const {accessToken, refreshToken} = await this.authService.register(_req.body);
            res.cookie("jwt", refreshToken, COOKIE_OPTIONS).status(201).send({accessToken})
        } catch(error) {
            next(error)
        }
    }

    async refresh(_req: Request, res: Response, next: NextFunction) {
        try{
            const {accessToken} = await this.authService.refresh(_req.cookies.jwt);

            res.status(200).send({accessToken})
        }catch(error) {
            next(error)
        }
    }

    async logout(_req: Request, res: Response, next: NextFunction) {
        try{
            const refreshToken = _req.cookies.jwt;
            if (!refreshToken) {
                res.sendStatus(204)
                return
            }
            const user = await this.authService.logout(refreshToken);
            if (user) {
                res.clearCookie("jwt", COOKIE_OPTIONS).sendStatus(204)
                return
            }
            res.clearCookie("jwt", COOKIE_OPTIONS).sendStatus(204)
        }catch(error) {
            next(error)
        }
    }
}