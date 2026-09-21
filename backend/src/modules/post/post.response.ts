
export interface PostResponse {
    id: string;
    userId: string;
    title: string;
    description: string;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}