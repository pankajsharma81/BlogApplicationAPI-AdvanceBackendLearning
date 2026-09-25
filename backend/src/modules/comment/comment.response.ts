export interface CommentResponse {
  id: string;
  comment: string;
  postId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
