import { z } from "zod";

// USER DATA CAN BE MADE OF BASE CLASS AND THAT CAN BE EXTENDED FORDWARD

export const userBaseSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Must be a valid email."),
});

// Password field is only used in creation:
export const userPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters"),
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/\d/, "Password must contain at least one number")
  // .regex(
  //   /[^A-Za-z0-9]/,
  //   "Password must contain at least one special character"
  // ),
});

// We can combine the userBaseSchema and userPasswordSchema for creating user
export const createUserSchema = userBaseSchema.merge(userPasswordSchema); // this will work for register

/*
▫️Updating a user: all fields are optional
*/
export const updateUserSchema = userBaseSchema
  .merge(userPasswordSchema.partial())
  .partial();

/*
▫️Why we need to define a Separate Schema for Login
We should not use base schema for login because our base schema is intended for creating user & has fields like name and email but our typical login should have email and password.

This ensures:
- Only required fields (email, password) are validated.
- No extra or missing fields (like name) cause validation errors.
*/

export const userLoginSchema = z.object({
  email: z.string().email("Must be a valid email address."),
  password: z.string().min(8, "Password is required"),
});

// Validation for route paramter:
export const userParamSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Id must be a number",
    }),
  }),
});

// We need to include database generated fields too
export const userResponseSchema = userBaseSchema
  .merge(userPasswordSchema.omit({ password: true }))
  .extend({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

// Types Inference
export type TUserBase = z.infer<typeof userBaseSchema>;
export type TCreateUserInput = z.infer<typeof createUserSchema>;
export type TUpdateUserInput = z.infer<typeof updateUserSchema>;
export type TUserLoginInput = z.infer<typeof userLoginSchema>;
export type TUserResponse = z.infer<typeof userResponseSchema>;
