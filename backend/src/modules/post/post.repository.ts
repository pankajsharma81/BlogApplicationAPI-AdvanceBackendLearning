import { prisma } from "../../lib/prisma.js";
import { IPostRepository } from "./post.interface.js";
import { GetPostsDTO, UpdatePostDTO } from "./post.schema.js";

export class PostRepository implements IPostRepository {
  async createPost(data: {
    userId: string;
    title: string;
    description: string;
    imageUrl?: string;
    imagePublicId?: string;
  }) {
    const post = await prisma.post.create({
      data: {
        userId: data.userId,
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        imagePublicId: data.imagePublicId,
      },
    });
    return post;
  }

  async getPosts(userId: string, data: GetPostsDTO) {
    const { page, limit } = data;
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  }

  async getPostByUserIdAndPostId(userId: string, postId: string) {
    const post = await prisma.post.findFirst({
      where: {
        userId,
        id: postId,
      },
    });

    return post;
  }

  async updatePost(postId: string, data: UpdatePostDTO) {
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: data.title,
        description: data.description
      }
    })
    return post
  }

  async deletePost(postId: string){
    return await prisma.post.delete({
      where: {
        id: postId
      }
    })
  }
}
