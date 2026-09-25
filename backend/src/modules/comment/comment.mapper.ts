import { CommentResponse } from "./comment.response.js";

export const mapCommentResponse = (comment: {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}): CommentResponse => {
  return {
    id: comment.id,
    userId: comment.userId,
    postId: comment.postId,
    comment: comment.comment,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
};
