import { Category } from "./Category";
import { User } from "./User";

export interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string;
    publishedDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    owner: User;
    categories: Category[] | null;
    status: BlogStatus;
}

export enum BlogStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED'
}