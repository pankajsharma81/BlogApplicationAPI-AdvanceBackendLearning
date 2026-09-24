import { PostResponse } from "./post.response.js";

export const mapPostResponse = (post: {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}): PostResponse => {
  return {
    id: post.id,
    userId: post.userId,
    title: post.title,
    description: post.description,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
};
