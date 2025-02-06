import type { Prisma } from '@prisma/client'
import FurnitureRepository from '../repositories/FurnitureRepository'
import { HttpException } from '../utils/HttpExceptions'
import dotenv from 'dotenv'

interface FurnitureTypes {
  id: string
  modelIndex: string
  positionX: number
  positionY: number
  positionZ: number
  rotationX: number
  rotationY: number
  rotationZ: number
}

dotenv.config();

const furnitureRepository = new FurnitureRepository()

export default class FurnitureService {
  private readonly furnitureRepository: FurnitureRepository

  constructor() {
    this.furnitureRepository = furnitureRepository
  }

  async createMany(
    userId: string,
    furnitureData: Omit<Prisma.FurnituresCreateInput, 'user'>[]
  ) {
    return await this.furnitureRepository.createMany(userId, furnitureData)
  }

  async getByUserId(id: string) {
    console.log(id)
    const furnitures = await this.furnitureRepository.getByUserId(id)
    console.log(furnitures)
    if (!furnitures) throw new HttpException(404, 'Furnitures not found')
    return furnitures
  }

  async update(userId: string, furnitureData: FurnitureTypes[]) {
    const currentFurniture = await this.getByUserId(userId)

    // Handle new furniture
    const newFurniture = furnitureData.filter(
      (f) => !currentFurniture.find((cf) => cf.id === f.id)
    )
    if (newFurniture.length > 0) {
      await this.createMany(
        userId,
        newFurniture.map((furniture) => ({
          ...furniture,
          modelIndex: furniture.modelIndex,
          name: furniture.modelIndex,
          positionX: furniture.positionX,
          positionY: furniture.positionY,
          positionZ: furniture.positionZ,
          rotationX: furniture.rotationX,
          rotationY: furniture.rotationY,
          rotationZ: furniture.rotationZ
        }))
      )
    }

    // Handle updates
    const updateFurnitures = furnitureData.filter((f) =>
      currentFurniture.find((cf) => cf.id === f.id)
    )
    if (updateFurnitures.length) {
      await Promise.all(
        updateFurnitures.map((furniture) =>
          this.furnitureRepository.update(furniture.id, furniture)
        )
      )
    }

    // Handle deletions
    const deletedFurnitures = currentFurniture.filter(
      (f) => !furnitureData.find((cf) => cf.id === f.id)
    )
    if (deletedFurnitures.length) {
      await Promise.all(
        deletedFurnitures.map((furniture) =>
          this.furnitureRepository.delete(furniture.id)
        )
      )
    }

    return {
      message: 'Furniture updated successfully',
      data: {
        newFurniture,
        updateFurnitures,
        deletedFurnitures
      }
    }
  }

  async delete(id: string) {
    return await this.furnitureRepository.delete(id)
  }
}

const furnitureService = new FurnitureService()

export {furnitureService}