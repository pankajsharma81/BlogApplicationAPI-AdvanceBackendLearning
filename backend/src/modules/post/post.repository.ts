import { prisma } from "../../lib/prisma.js";
import { IPostRepository } from "./post.interface.js";

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
}
