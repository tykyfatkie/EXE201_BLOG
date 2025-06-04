import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Switch,
  Card,
  message,
  Row,
  Col,
} from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { newsService } from '../../services/newsService';
import { CreateNewsRequest, UpdateNewsRequest, NewsCategory, News } from '../../types/news';

const { TextArea } = Input;

interface NewsFormProps {
  initialData?: News;
  onSubmit: (data: CreateNewsRequest | UpdateNewsRequest) => Promise<void>;
  isLoading?: boolean;
}

const NewsForm: React.FC<NewsFormProps> = ({ initialData, onSubmit, isLoading = false }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [content, setContent] = useState(initialData?.content || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  useEffect(() => {
    loadCategories();
    if (initialData) {
      form.setFieldsValue({
        title: initialData.title,
        summary: initialData.summary,
        categoryId: initialData.categoryId,
        isPublished: initialData.isPublished,
      });
      setContent(initialData.content);
      setImageUrl(initialData.imageUrl || '');
    }
  }, [initialData, form]);

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

  const handleImageUpload = async (file: File) => {
    try {
      const response = await newsService.uploadImage(file);
      if (response.success) {
        setImageUrl(response.data.url);
        message.success('Upload ảnh thành công');
      }
    } catch (error) {
      message.error('Upload ảnh thất bại');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const newsData = {
        ...values,
        content,
        imageUrl,
        ...(initialData && { id: initialData.id }),
      };

      await onSubmit(newsData);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <Card title={initialData ? 'Chỉnh sửa tin tức' : 'Tạo tin tức mới'}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          isPublished: false,
        }}
      >
        <Row gutter={24}>
          <Col span={16}>
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
            >
              <Input placeholder="Nhập tiêu đề tin tức" size="large" />
            </Form.Item>

            <Form.Item
              name="summary"
              label="Tóm tắt"
              rules={[{ required: true, message: 'Vui lòng nhập tóm tắt' }]}
            >
              <TextArea
                rows={3}
                placeholder="Nhập tóm tắt ngắn gọn về tin tức"
              />
            </Form.Item>

            <Form.Item label="Nội dung" required>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                style={{ minHeight: '300px' }}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="categoryId"
              label="Danh mục"
              rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
            >
              <Select placeholder="Chọn danh mục">
                {categories.map(category => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Ảnh đại diện">
              <Upload
                beforeUpload={(file) => {
                  handleImageUpload(file);
                  return false;
                }}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
              {imageUrl && (
                <div className="mt-2">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
            </Form.Item>

            <Form.Item name="isPublished" label="Xuất bản" valuePropName="checked">
              <Switch checkedChildren="Công khai" unCheckedChildren="Nháp" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                icon={<SaveOutlined />}
                size="large"
                block
              >
                {initialData ? 'Cập nhật' : 'Tạo tin tức'}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default NewsForm;