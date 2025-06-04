export interface News {
  id: number;
  title: string;
  content: string;
  summary: string;
  imageUrl?: string;
  authorId: number;
  authorName: string;
  categoryId: number;
  categoryName: string;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  viewCount: number;
}

export interface CreateNewsRequest {
  title: string;
  content: string;
  summary: string;
  imageUrl?: string;
  categoryId: number;
  isPublished: boolean;
}

export interface UpdateNewsRequest extends CreateNewsRequest {
  id: number;
}

export interface NewsCategory {
  id: number;
  name: string;
  description: string;
}