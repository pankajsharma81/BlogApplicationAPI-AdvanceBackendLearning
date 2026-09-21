export interface IPostRepository {
  createPost(data: {
    userId: string;
    title: string;
    description: string;
    imageUrl?: string;
    imagePublicId?: string;
  }): Promise<any>;
}
