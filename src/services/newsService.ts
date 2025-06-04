import { api } from './api';
import { News, CreateNewsRequest, UpdateNewsRequest, NewsCategory } from '../types/news';
import { ApiResponse, PaginatedResponse } from '../types/api';

export const newsService = {
  // Lấy danh sách tin tức
  getNews: async (page: number = 1, pageSize: number = 10, categoryId?: number) => {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (categoryId) {
      params.append('categoryId', categoryId.toString());
    }

    const response = await api.get<ApiResponse<PaginatedResponse<News>>>(`/news?${params}`);
    return response.data;
  },

  // Lấy tin tức theo ID
  getNewsById: async (id: number) => {
    const response = await api.get<ApiResponse<News>>(`/news/${id}`);
    return response.data;
  },

  // Tạo tin tức mới
  createNews: async (newsData: CreateNewsRequest) => {
    const response = await api.post<ApiResponse<News>>('/news', newsData);
    return response.data;
  },

  // Cập nhật tin tức
  updateNews: async (newsData: UpdateNewsRequest) => {
    const response = await api.put<ApiResponse<News>>(`/news/${newsData.id}`, newsData);
    return response.data;
  },

  // Xóa tin tức
  deleteNews: async (id: number) => {
    const response = await api.delete<ApiResponse<boolean>>(`/news/${id}`);
    return response.data;
  },

  // Lấy danh mục tin tức
  getCategories: async () => {
    const response = await api.get<ApiResponse<NewsCategory[]>>('/categories');
    return response.data;
  },

  // Upload ảnh
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<ApiResponse<{ url: string }>>('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};