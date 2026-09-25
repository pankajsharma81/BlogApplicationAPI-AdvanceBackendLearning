import { prisma } from "../../lib/prisma.js";
import { ICommentRepository } from "./comment.interface.js";
import { CreateCommentDTO } from "./comment.schema.js";


export class CommentRepository implements ICommentRepository{
    async createComment(userId: string, data: CreateCommentDTO){
        const newComment = await prisma.comment.create({
            data: {
                comment: data.comment,
                postId: data.postId,
                userId,
            }
        })
        return newComment
    }
}