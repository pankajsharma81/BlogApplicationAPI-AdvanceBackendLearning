import { AppError } from "../../utils/app-error.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../../utils/cloudinary.helper.js";
import { IPostRepository } from "./post.interface.js";
import { mapPostResponse } from "./post.mapper.js";
import { CreatePostDTO, GetPostsDTO, UpdatePostDTO } from "./post.schema.js";

export class PostService {
  constructor(private repo: IPostRepository) {}

  async createPost( data: CreatePostDTO, userId: string, file?: Express.Multer.File ) {
    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (file) {
      try {
        const result = await uploadToCloudinary(file.buffer, "blog-app/posts");

        imageUrl = result.secure_url;
        imagePublicId = result.public_id;
      } catch (error) {
        console.error("cloudinary upload error", error);

        throw new AppError("Failed to upload post image", 500);
      }
    }

    const post = await this.repo.createPost({
      userId,
      title: data.title,
      description: data.description,
      imageUrl,
      imagePublicId,
    });

    return mapPostResponse(post);
  }

  async getAllPosts (data: GetPostsDTO){
    const { page, limit } = data;

    const { posts, total } = await this.repo.getAllPosts(page, limit)

    const totalPages = Math.ceil(total/ limit);

    return {
      posts: posts.map(mapPostResponse),
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    }
  }

  async getPosts(userId: string, data: GetPostsDTO) {
    const posts = await this.repo.getPosts(userId, data);

    return posts.map(mapPostResponse);
  }

  async updatePost(userId: string, postId: string, data: UpdatePostDTO) {
    if (!userId) {
      throw new AppError("Invalid User", 401);
    }

    const post = await this.repo.getPostByUserIdAndPostId(userId, postId);

    if (!post) {
      throw new AppError("Post Not Found", 404);
    }

    const updatedPost = await this.repo.updatePost(postId, data);

    return mapPostResponse(updatedPost);
  }

  async deletePost(userId: string, postId: string){
    if (!userId){
      throw new AppError("Invalid User", 401);
    }

    const post = await this.repo.getPostByUserIdAndPostId(userId,postId);

    if(!post){
      throw new AppError("Post Not Found", 404);
    }

    if(post.imagePublicId){
      await deleteFromCloudinary(post.imagePublicId);
    }

    return this.repo.deletePost(postId)
  }

}
