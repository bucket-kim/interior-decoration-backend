import { Prisma } from "@prisma/client";
import { db } from "../config/db";

export default class FurnitureRepository {
    private readonly db;

    constructor() {
        this.db = db;
    }
    async create(userId: string, furnitureData: Prisma.FurnituresCreateInput) {
        const { user, ...rest } = furnitureData;
        return await this.db.furnitures.create({
            data: {
                ...rest,
                userId
            }
        });
    }

    async getByUserId(id: string) {
        return await this.db.furnitures.findMany({where: {id}})
    }

    async update(id: string, furnitureData: Prisma.FurnituresUpdateInput) {
        return await this.db.furnitures.update({where: {id}, data: furnitureData});
    }

    async delete(id: string) {
        return await this.db.furnitures.delete({where: {id}});
    }
}