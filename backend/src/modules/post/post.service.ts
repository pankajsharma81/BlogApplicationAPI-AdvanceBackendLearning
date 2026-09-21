import { AppError } from "../../utils/app-error.js";
import { uploadToCloudinary } from "../../utils/cloudinary.helper.js";
import { IPostRepository } from "./post.interface.js";
import { mapPostResponse } from "./post.mapper.js";
import { CreatePostDTO } from "./post.schema.js";

export class PostService {
  constructor(private repo: IPostRepository) {}

  async createPost(
    data: CreatePostDTO,
    userId: string,
    file?: Express.Multer.File,
  ) {
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
}
