/* ZOD Schemas to create:
- For creating a post: createPostSchema
- For updating a post: updatePostSchema
- For response
*/

import { z } from "zod";

/*
Using generate enums from prisma instead of hardcoded enum values:
Avoids typos.
Syncs directly with Prisma (if you change enum values later).
Ensures consistency between backend logic and DB.
*/
import { PostStatus } from "@prisma/client"; // We can use types provided by prisma

export const postBaseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(), // status can be optional
  authorId: z.number(),
});

// We dont need to create all the schema from the start, we can extend the base schema
export const createPostSchema = postBaseSchema.extend({});

// For updates, typically all fiels can optional
export const updatePostSchema = postBaseSchema.extend({}).partial();

// Response Schema:
export const postResponseSchema = postBaseSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Zod generated matching TypeScript types
export type TCreatePostSchema = z.infer<typeof createPostSchema>;
// we can make the the update partial
export type TUpdatePostSchema = z.infer<typeof updatePostSchema>;
export type TPostResponseSchema = z.infer<typeof postResponseSchema>;
// To make fields partial ***
// const partialPostUpdate: Partial<TUpdatePostSchema> = {};
