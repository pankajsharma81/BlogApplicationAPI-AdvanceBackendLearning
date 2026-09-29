import { Comment } from "../../../generated/prisma/index.js";
import { CreateCommentDTO } from "./comment.schema.js";

export interface ICommentRepository {
    createComment(userId: string, data: CreateCommentDTO): Promise<Comment>;

    getCommentByUserIdAndCommentId(userId: string, commentId: string): Promise<Comment | null>;
    deleteComment(commentId: string): Promise<Comment>;
}