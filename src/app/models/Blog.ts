import { User } from "./User";

export interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string;
    publishedDate: Date | null;
    createAt: Date | null;
    updatedAt: Date | null;
    owner: User;
}