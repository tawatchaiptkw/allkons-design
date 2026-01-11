import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Form,
    Input,
    InputNumber,
    Button,
    Select,
    Card,
    Typography,
    message,
    Space,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { apiClient } from '../lib/api-client';
import './ProductForm.css';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function ProductForm() {
    const { shopId, productId } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (productId && productId !== 'new') {
            setIsEdit(true);
            fetchProduct();
        }
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const response = await apiClient.get(`/products/${productId}`);
            form.setFieldsValue(response.data.data);
        } catch (error) {
            message.error('Failed to load product');
            navigate(`/seller/shop/${shopId}/products`);
        }
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            if (isEdit) {
                await apiClient.put(`/products/${productId}`, values);
                message.success('Product updated successfully');
            } else {
                await apiClient.post('/products', {
                    ...values,
                    shopId,
                });
                message.success('Product created successfully');
            }
            navigate(`/seller/shop/${shopId}/products`);
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-form-container">
            <Card>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                        <Button
                            type="link"
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate(`/seller/shop/${shopId}/products`)}
                            style={{ paddingLeft: 0 }}
                        >
                            Back to Products
                        </Button>
                        <Title level={3}>{isEdit ? 'Edit Product' : 'Create New Product'}</Title>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        initialValues={{ status: 'DRAFT', stock: 0 }}
                    >
                        <Form.Item
                            label="Product Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter product name' }]}
                        >
                            <Input size="large" placeholder="e.g., Portland Cement Type I" />
                        </Form.Item>

                        <Form.Item label="Description" name="description">
                            <TextArea
                                rows={4}
                                placeholder="Describe your product..."
                                size="large"
                            />
                        </Form.Item>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Form.Item
                                label="Price (฿)"
                                name="price"
                                rules={[
                                    { required: true, message: 'Please enter price' },
                                    { type: 'number', min: 0, message: 'Price must be positive' },
                                ]}
                            >
                                <InputNumber
                                    size="large"
                                    style={{ width: '100%' }}
                                    placeholder="0.00"
                                    precision={2}
                                    min={0}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Stock"
                                name="stock"
                                rules={[
                                    { required: true, message: 'Please enter stock quantity' },
                                    { type: 'number', min: 0, message: 'Stock must be positive' },
                                ]}
                            >
                                <InputNumber
                                    size="large"
                                    style={{ width: '100%' }}
                                    placeholder="0"
                                    min={0}
                                />
                            </Form.Item>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Form.Item label="SKU (Optional)" name="sku">
                                <Input size="large" placeholder="e.g., CEM-001" />
                            </Form.Item>

                            <Form.Item label="Status" name="status">
                                <Select size="large">
                                    <Option value="DRAFT">Draft</Option>
                                    <Option value="ACTIVE">Active</Option>
                                    <Option value="INACTIVE">Inactive</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Space>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    loading={loading}
                                    className="submit-button"
                                >
                                    {isEdit ? 'Update Product' : 'Create Product'}
                                </Button>
                                <Button
                                    size="large"
                                    onClick={() => navigate(`/seller/shop/${shopId}/products`)}
                                >
                                    Cancel
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>
        </div>
    );
}
