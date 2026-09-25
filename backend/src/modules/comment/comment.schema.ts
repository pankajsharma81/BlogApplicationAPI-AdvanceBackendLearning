import z from "zod";

export const createCommentSchema = z.object({
  comment: z.string().min(1, "comment is required"),
  postId: z.string().min(1, "Post Id is required"),
});

export type CreateCommentDTO = z.infer<typeof createCommentSchema>;
