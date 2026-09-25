import { mapCommentResponse } from "../comment/comment.mapper.js";
import { CommentResponse } from "../comment/comment.response.js";
import { PostResponse } from "./post.response.js";

export const mapPostResponse = (post: {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  comments: CommentResponse[];
}): PostResponse => {
  return {
    id: post.id,
    userId: post.userId,
    title: post.title,
    description: post.description,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    comments: post.comments?.map(mapCommentResponse) ?? [],
  };
};
