import type { Prisma } from '@prisma/client'
import { db } from '../config/db'

export default class FurnitureRepository {
  private readonly db

  constructor() {
    this.db = db
  }

  async createMany(
    userId: string,
    furnitureData: Omit<Prisma.FurnituresCreateInput, 'user'>[]
  ) {
    return await this.db.furnitures.createMany({
      data: furnitureData.map((furniture) => ({
        ...furniture,
        userId
      }))
    })
  }

  async getByUserId(userId: string) {
    return await this.db.furnitures.findMany({ where: { userId } })
  }

  async update(id: string, furnitureData: Prisma.FurnituresUpdateInput) {
    return await this.db.furnitures.update({
      where: { id },
      data: furnitureData
    })
  }

  async delete(id: string) {
    return await this.db.furnitures.delete({ where: { id } })
  }
}
