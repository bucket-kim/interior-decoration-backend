import { Router } from "express";
import FurnitureController from "../controllers/FurnitureControllers";

const furnitureController = new FurnitureController()

const router = Router()

router.get('/:id', furnitureController.getByUserId.bind(furnitureController))
router.post('/:id', furnitureController.createMany.bind(furnitureController))
router.put('/:id', furnitureController.update.bind(furnitureController))
router.delete('/:id', furnitureController.delete.bind(furnitureController))

export {router as FurnitureRoutes}