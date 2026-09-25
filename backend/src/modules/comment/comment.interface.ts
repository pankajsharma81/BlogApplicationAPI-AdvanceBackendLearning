import { CreateCommentDTO } from "./comment.schema.js";

export interface ICommentRepository {
    createComment(userId: string, data: CreateCommentDTO): Promise<any>;
}