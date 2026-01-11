import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Typography,
    Card,
    Button,
    Table,
    Space,
    Tag,
    Popconfirm,
    message,
    Empty,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { apiClient } from '../lib/api-client';
import './ProductManagement.css';

const { Title } = Typography;

interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    sku?: string;
    status: 'DRAFT' | 'ACTIVE' | 'INACTIVE';
    createdAt: string;
}

export default function ProductManagement() {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, [shopId]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/products?shopId=${shopId}`);
            setProducts(response.data.data);
        } catch (error) {
            message.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await apiClient.delete(`/products/${id}`);
            message.success('Product deleted successfully');
            fetchProducts();
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to delete product');
        }
    };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: Product) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{text}</div>
                    {record.sku && (
                        <div style={{ fontSize: 12, color: '#999' }}>SKU: {record.sku}</div>
                    )}
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `฿${price.toLocaleString()}`,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            render: (stock: number) => (
                <Tag color={stock > 0 ? 'green' : 'red'}>
                    {stock} {stock === 1 ? 'unit' : 'units'}
                </Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const colors = {
                    DRAFT: 'default',
                    ACTIVE: 'success',
                    INACTIVE: 'error',
                };
                return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Product) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => navigate(`/seller/shop/${shopId}/products/${record.id}/edit`)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete product"
                        description="Are you sure you want to delete this product?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="product-management">
            <div className="product-header">
                <Title level={3}>Products</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate(`/seller/shop/${shopId}/products/new`)}
                    size="large"
                >
                    Add Product
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    dataSource={products}
                    rowKey="id"
                    loading={loading}
                    locale={{
                        emptyText: (
                            <Empty
                                description="No products yet"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => navigate(`/seller/shop/${shopId}/products/new`)}
                                >
                                    Create Your First Product
                                </Button>
                            </Empty>
                        ),
                    }}
                />
            </Card>
        </div>
    );
}
