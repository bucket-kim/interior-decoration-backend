import type { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

const userService = new UserService();

export default class UserController {
    private readonly userService: UserService
    constructor() {
        this.userService = userService;
    }

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getAll();
            res.status(200).json({users})
        } catch(error){
            next(error)
        }
    }

    async getById(_req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.getById(_req.params.id);
            res.status(200).json({user})
        }
        catch(error) {
            next(error)
        }
    }

    async create(_req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.create(_req.body);
            res.status(201).json({user})
        }
        catch(error) {
            next(error)
        }
    }

    async update(_req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.update(_req.params.id, _req.body);
            res.status(200).json({user})
        }
        catch(error) {
            next(error)
        }
    }

    async delete(_req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.delete(_req.params.id);
            res.status(204).json({user})
        }
        catch(error) {
            next(error)
        }
    }
 }