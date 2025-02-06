import type { NextFunction, Request, Response } from 'express'
import FurnitureService from '../services/FurnitureService'

const furnitureService = new FurnitureService()

export default class FurnitureController {
  private readonly furnitureService: FurnitureService

  constructor() {
    this.furnitureService = furnitureService
  }

  async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id // or req.user.id if using auth middleware
      console.log(userId)
      const furnitures = await this.furnitureService.getByUserId(req.params.id)
      res.status(200).json({
        success: true,
        data: furnitures
      })
    } catch (error) {
      next(error)
    }
  }

  async createMany(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id // or req.user.id if using auth middleware

      const furnitureData = await this.furnitureService.createMany(
        userId,
        req.body
      )
      res.status(201).json({
        // Changed to 201 for creation
        success: true,
        data: furnitureData
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id // or req.user.id if using auth middleware
      const furnitureData = await this.furnitureService.update(userId, req.body)
      res.status(200).json({ success: true, data: furnitureData })
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const furnitureData = await this.furnitureService.delete(req.params.id)
      res.status(200).json({ success: true, data: furnitureData })
    } catch (error) {
      next(error)
    }
  }
}
