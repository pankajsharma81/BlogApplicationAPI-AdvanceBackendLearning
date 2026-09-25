import { AppError } from "../../utils/app-error.js";
import { IPostRepository } from "../post/post.interface.js";
import { ICommentRepository } from "./comment.interface.js";
import { mapCommentResponse } from "./comment.mapper.js";
import { CreateCommentDTO } from "./comment.schema.js";

export class CommentService {
  constructor(
    private commentRepo: ICommentRepository,
    private postRepo: IPostRepository,
  ) {}

  async createComment(userId: string, data: CreateCommentDTO) {
    if (!userId) {
      throw new AppError("userId is not valid", 401);
    }

    const post = await this.postRepo.getPostByPostId(data.postId);

    if (!post) {
      throw new AppError("post not found", 404);
    }
    
    const comment = await this.commentRepo.createComment(userId, data);
    
    return mapCommentResponse(comment);
  }
  
  async deleteComment (userId: string, commentId: string){

    if(!userId){
      throw new AppError("userId is not valid", 401);
    }
    
    const comment = await this.commentRepo.getCommentByUserIdAndCommentId(userId, commentId)
    
    if(!comment){
      throw new AppError("comment not found", 404);
    }

    return this.commentRepo.deleteComment(commentId)
  }
}
