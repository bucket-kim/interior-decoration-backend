import { Role } from "@prisma/client";
import { z } from "zod";

export const createUserSchema = z.object({
    firstName: z.string().min(1, {message: "Must contain at least 1 character"}),
    lastName: z.string().min(1, {message: "Must contain at least 1 character"}),
    email: z.string().email({message: "Must be a valid email address"}),
    password: z.string().min(6, {message: "Must be at least 6 characters long"}),
    roles: z.array(z.enum([Role.ADMIN, Role.MANAGER, Role.USER])).optional(),
    refreshToken: z.string().optional()
})

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.partial();

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const registerUserSchema = createUserSchema.omit({
  roles: true,
  refreshToken: true,
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = registerUserSchema.omit({ firstName: true, lastName: true }).extend({
  email: z.string().email({ message: "Must be a valid email address" }).optional(),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
