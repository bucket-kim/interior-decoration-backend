import { db } from "../config/database";
import type { Prisma } from "@prisma/client";

export default class UserRepository {
    private readonly db;
    constructor() {
        this.db = db;
    }

    // fetch all user data
    async getAll() {
        return await this.db.user.findMany();
    }

    // fetch user by unique id
    async getById(id: string) {
        return await this.db.user.findUnique({where: {id}})
    }

    // fetch user by key value pair
    async getByKey(key: keyof Prisma.UserWhereInput, value: Prisma.UserWhereInput[keyof Prisma.UserWhereInput]) {
        return await this.db.user.findFirst({where: {[key] : value}})
    }

    // create new user data
    async create(data: Prisma.UserCreateInput) {
        return await this.db.user.create({data})
    }

    // update existing user data by id
    async update(id: string, data: Prisma.UserUpdateInput) {
        return await this.db.user.update({where: {id}, data})
    }

    // delete user by id
    async delete(id: string) {
        return await this.db.user.delete({where: {id}})
    }
} 