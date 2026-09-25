import { CommentResponse } from "../comment/comment.response.js";

export interface PostResponse {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  comments: CommentResponse[];
}
