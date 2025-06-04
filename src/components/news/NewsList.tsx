import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Pagination,
  Select,
  Input,
  Button,
  Empty,
  Spin,
  message,
} from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { News, NewsCategory } from '../../types/news';
import { newsService } from '../../services/newsService';
import NewsCard from './NewsCard';

const { Search } = Input;

const NewsList: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    loadNews();
    loadCategories();
  }, [currentPage, selectedCategory]);

  const loadNews = async () => {
    try {
      setLoading(true);
      const response = await newsService.getNews(currentPage, pageSize, selectedCategory);
      
      if (response.success) {
        setNews(response.data.items);
        setTotalCount(response.data.totalCount);
      }
    } catch (error) {
      message.error('Không thể tải tin tức');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await newsService.getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      message.error('Không thể tải danh mục');
    }
  };

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
    // Implement search logic here
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <Row gutter={16} align="middle">
          <Col span={8}>
            <Search
              placeholder="Tìm kiếm tin tức..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="Chọn danh mục"
              allowClear
              size="large"
              style={{ width: '100%' }}
              onChange={handleCategoryChange}
            >
              {categories.map(category => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Button
              icon={<ReloadOutlined />}
              size="large"
              onClick={loadNews}
              loading={loading}
            >
              Làm mới
            </Button>
          </Col>
        </Row>
      </Card>

      {/* News Grid */}
      <Spin spinning={loading}>
        {news.length > 0 ? (
          <>
            <Row gutter={[24, 24]}>
              {news.map(item => (
                <Col key={item.id} xs={24} sm={12} lg={8} xl={6}>
                  <NewsCard news={item} />
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalCount}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total, range) => 
                  `${range[0]}-${range[1]} của ${total} tin tức`
                }
              />
            </div>
          </>
        ) : (
          <Empty
            description="Không có tin tức nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Spin>
    </div>
  );
};

export default NewsList;