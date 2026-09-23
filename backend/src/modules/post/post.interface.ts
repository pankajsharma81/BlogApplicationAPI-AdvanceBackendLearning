import { GetPostsDTO, UpdatePostDTO } from "./post.schema.js";

export interface IPostRepository {
  createPost(data: {
    userId: string;
    title: string;
    description: string;
    imageUrl?: string;
    imagePublicId?: string;
  }): Promise<any>;

  getPosts(userId: string, data: GetPostsDTO): Promise<any>;

  getPostByUserIdAndPostId(userId: string, postId: string): Promise<any>;
  updatePost(postId: string, data: UpdatePostDTO): Promise<any>;
}

