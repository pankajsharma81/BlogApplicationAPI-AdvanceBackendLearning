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
  getAllPosts(page: number, limit: number): Promise<{posts:{
        title: string;
        description: string;
        id: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
  }[], total:number}>;

  getPostByUserIdAndPostId(userId: string, postId: string): Promise<any>;
  updatePost(postId: string, data: UpdatePostDTO): Promise<any>;

  deletePost(postId: string): Promise<any>;

  getPostByPostId(postId: string): Promise<any>;
}
