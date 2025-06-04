import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import NewsList from '../../components/news/newsList';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="text-center py-12">
          <Title level={1} className="!text-white !mb-4">
            Chào mừng đến với Tin Tức 24h
          </Title>
          <Paragraph className="!text-white text-lg max-w-2xl mx-auto">
            Cập nhật những tin tức mới nhất, chính xác và đáng tin cậy từ nhiều lĩnh vực khác nhau
          </Paragraph>
        </div>
      </Card>

      {/* Featured News */}
      <div>
        <Title level={2} className="mb-6">Tin tức nổi bật</Title>
        <NewsList />
      </div>
    </div>
  );
};

export default HomePage;