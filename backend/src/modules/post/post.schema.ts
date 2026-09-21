import z from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
});

export type CreatePostDTO = z.infer<typeof createPostSchema>;
