import { Post } from "../../../generated/prisma/index.js";
import { GetPostsDTO, UpdatePostDTO } from "./post.schema.js";

export interface IPostRepository {
  createPost(data: {
    userId: string;
    title: string;
    description: string;
    imageUrl?: string;
    imagePublicId?: string;
  }): Promise<Post>;

  getPosts(
    userId: string,
    data: GetPostsDTO,
  ): Promise<
    (Post & {
      comments: {
        id: string;
        comment: string;
        postId: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      }[];
    })[]
  >;
  getAllPosts(
    page: number,
    limit: number,
  ): Promise<{ posts: Post[]; total: number }>;

  getPostByUserIdAndPostId(
    userId: string,
    postId: string,
  ): Promise<Post | null>;
  updatePost(postId: string, data: UpdatePostDTO): Promise<Post>;

  deletePost(postId: string): Promise<Post>;

  getPostByPostId(postId: string): Promise<Post | null>;
}
