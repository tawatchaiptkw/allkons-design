import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Card, Spin, Button, Row, Col, Statistic } from 'antd';
import { ShopOutlined, AppstoreOutlined } from '@ant-design/icons';
import { apiClient } from '../lib/api-client';

const { Title, Paragraph } = Typography;

export default function ShopDashboard() {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const [shop, setShop] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const response = await apiClient.get(`/shops/${shopId}`);
                setShop(response.data.data);
            } catch (error) {
                console.error('Failed to load shop', error);
            } finally {
                setLoading(false);
            }
        };

        if (shopId) {
            fetchShop();
        }
    }, [shopId]);

    if (loading) {
        return (
            <div style={{ padding: 48, textAlign: 'center' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: 48, maxWidth: 1200, margin: '0 auto' }}>
            <Title level={2}>
                <ShopOutlined /> {shop?.name || 'Shop Dashboard'}
            </Title>
            <Paragraph type="secondary">
                Manage your shop and products
            </Paragraph>

            <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
                <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic
                            title="Shop Status"
                            value={shop?.status || 'ACTIVE'}
                            valueStyle={{ color: '#2e7d32' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card>
                        <Statistic
                            title="Shop Slug"
                            value={shop?.slug}
                            valueStyle={{ fontSize: 16 }}
                        />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginTop: 24 }} title="Quick Actions">
                <Button
                    type="primary"
                    size="large"
                    icon={<AppstoreOutlined />}
                    onClick={() => navigate(`/seller/shop/${shopId}/products`)}
                    block
                >
                    Manage Products
                </Button>
            </Card>
        </div>
    );
}
