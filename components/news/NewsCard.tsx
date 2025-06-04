import React from 'react';
import { Card, Tag, Avatar, Typography } from 'antd';
import { UserOutlined, EyeOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { News } from '../../types/news';

const { Meta } = Card;
const { Paragraph, Text } = Typography;

interface NewsCardProps {
  news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${news.id}`);
  };

  return (
    <Card
      hoverable
      cover={
        news.imageUrl ? (
          <img
            alt={news.title}
            src={news.imageUrl}
            className="h-48 object-cover"
          />
        ) : (
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <Text type="secondary">Không có ảnh</Text>
          </div>
        )
      }
      actions={[
        <div key="views" className="flex items-center gap-1">
          <EyeOutlined />
          <span>{news.viewCount}</span>
        </div>,
        <div key="date" className="flex items-center gap-1">
          <CalendarOutlined />
          <span>{dayjs(news.publishDate).format('DD/MM')}</span>
        </div>,
      ]}
      onClick={handleClick}
      className="h-full"
    >
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <Tag color="blue">{news.categoryName}</Tag>
          {!news.isPublished && <Tag color="orange">Nháp</Tag>}
        </div>

        <Meta
          title={
            <Typography.Title level={5} className="!mb-0 line-clamp-2">
              {news.title}
            </Typography.Title>
          }
          description={
            <Paragraph
              ellipsis={{ rows: 3 }}
              className="!mb-0 text-gray-600"
            >
              {news.summary}
            </Paragraph>
          }
        />

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Avatar size="small" icon={<UserOutlined />} />
            <Text type="secondary" className="text-sm">
              {news.authorName}
            </Text>
          </div>
          
          <Text type="secondary" className="text-xs">
            {dayjs(news.publishDate).format('DD/MM/YYYY')}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;