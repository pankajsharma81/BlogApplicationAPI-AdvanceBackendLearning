import z from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
});

export const getPostsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export const updatePostSchema = z.object({
  title: z.string().min(1, "title is required").optional(),
  description: z.string().min(1, "description is required").optional(),
});

export type CreatePostDTO = z.infer<typeof createPostSchema>;
export type GetPostsDTO = z.infer<typeof getPostsSchema>;
export type UpdatePostDTO = z.infer<typeof updatePostSchema>;
