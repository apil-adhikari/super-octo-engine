import { email, z } from "zod/v4";

// Making certain things positive
const positiveNumberFromString = z
  .string()
  .regex(/^\d+$/, { message: "Must be a positive integer string" })
  .transform((val) => parseInt(val, 10));

// Add user
export const createUserSchema = z.object({
  name: z.string(),
  email: z.email(),
});

// Update user
export const updateUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
});

// get user
export const getUserSchema = z.object({
  name: z.string(),
  email: z.email(),
});

// delete user
export const deleteUserSchema = z.object({
  id: positiveNumberFromString.optional(),
});

// Types
export type TAddUserSchema = z.infer<typeof createUserSchema>;
export type TUpdateUserSchema = z.infer<typeof updateUserSchema>;
export type TDeleteUserSchema = z.infer<typeof deleteUserSchema>;
export type TGetUserSchema = z.infer<typeof getUserSchema>;
