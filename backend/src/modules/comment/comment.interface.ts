import { CreateCommentDTO } from "./comment.schema.js";

export interface ICommentRepository {
    createComment(userId: string, data: CreateCommentDTO): Promise<any>;

    getCommentByUserIdAndCommentId(userId: string, commentId: string): Promise<any>;
    deleteComment(commentId: string): Promise<any>;
}