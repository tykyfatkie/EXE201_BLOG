import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import NewsForm from '../components/news/NewsForm';
import { newsService } from '../services/newsService';
import { CreateNewsRequest } from '../types/news';

const CreateNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateNewsRequest) => {
    try {
      setLoading(true);
      const response = await newsService.createNews(data);
      
      if (response.success) {
        message.success('Tạo tin tức thành công');
        navigate(`/news/${response.data.id}`);
      } else {
        message.error(response.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      message.error('Không thể tạo tin tức');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <NewsForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
};

export default CreateNewsPage;