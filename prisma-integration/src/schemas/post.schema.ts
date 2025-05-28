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
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  content: z.string().optional(),
  status: z.nativeEnum(PostStatus).optional(),
  authorId: z.number().int().positive("Author id must be positive."),
});

// all fields are requied except optional ones(content & status)
// export const createPostSchema = postBaseSchema.extend({}); // BEFORE
export const createPostSchema = postBaseSchema.pick({
  title: true,
  description: true,
  content: true,
  status: true,
  authorId: true,
});

// ✅ Update Schema: we should make all fields optional for PATCH updates
// export const updatePostSchema = postBaseSchema.extend({}).partial(); // BEFORE
export const updatePostSchema = postBaseSchema.partial();

// IMP: We generally don't need a Zod schema for DELETE operations , and we usually don't validate GET requests in the same way as POST/PUT.

// ✅ Post Response Schema
export const postResponseSchema = postBaseSchema.extend({
  id: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ✅ Type Inference:
export type TCreatePostInput = z.infer<typeof createPostSchema>;
export type TCreatePostUpdate = z.infer<typeof updatePostSchema>;
export type TPostResponse = z.infer<typeof postResponseSchema>;

// // Zod generated matching TypeScript types
// export type TCreatePostSchema = z.infer<typeof createPostSchema>;
// // we can make the the update partial
// export type TUpdatePostSchema = z.infer<typeof updatePostSchema>;
// export type TPostResponseSchema = z.infer<typeof postResponseSchema>;
// // To make fields partial ***
// // const partialPostUpdate: Partial<TUpdatePostSchema> = {};
