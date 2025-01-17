import { Router } from "express";
import UserController from "../Controller/UserController";
import ValidateRequest from "../middlewares/ValidateRequests";
import { createUserSchema, updateUserSchema } from "../validations/UserValidations";

const userController = new UserController();
const router = Router();

router
  .get("/", userController.getAll.bind(userController))
  .get("/:id", userController.getById.bind(userController))
  .post("/", ValidateRequest(createUserSchema), userController.create.bind(userController))
  .patch("/:id",ValidateRequest(updateUserSchema), userController.update.bind(userController))
  .delete(
    "/:id", userController.delete.bind(userController)
  );

export { router as UserRoutes };