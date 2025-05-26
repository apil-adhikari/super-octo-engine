import { z } from "zod";

// Making certain things positive
const positiveNumberFromString = z
  .string()
  .regex(/^\d+$/, { message: "Must be a positive integer string" })
  .transform((val) => parseInt(val, 10));

// Add user
export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const updateUserSchema = createUserSchema.extend({
  id: z.number(),
});
// Update user
// export const updateUserSchema = z.object({

//   name: z.string(),
//   email: z.email(),
// });

// get user
export const getUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
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

// This will allow us to use the only the properties
// that we need (mainly sets the properties to optional)
const partialUser: Partial<TUpdateUserSchema> = {};
