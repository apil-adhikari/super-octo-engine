/* ZOD Schemas to create:
- For creating a post: createPostSchema
- For updating a post: updatePostSchema
- For response
*/

import { z } from "zod";

export const postBaseSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(), // status can be optional
  authorId: z.number(),
});

// We dont need to create all the schema from the start, we can extend the base schema
export const createPostSchema = postBaseSchema.extend({});

// For updates, typically all fiels can optional
export const updatePostSchema = postBaseSchema.extend({}).partial();

// Zod generated matching TypeScript types
export type TCreatePostSchema = z.infer<typeof createPostSchema>;

// we can make the the update partial
export type TUpdatePostSchema = z.infer<typeof updatePostSchema>;

// To make fields partial ***
// const partialPostUpdate: Partial<TUpdatePostSchema> = {};

// Response Schema:
export const postResponseSchema = postBaseSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type TPostResponseSchema = z.infer<typeof postResponseSchema>;
