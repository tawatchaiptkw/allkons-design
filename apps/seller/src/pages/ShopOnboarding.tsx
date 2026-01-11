import { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api-client';
import './ShopOnboarding.css';

const { Title, Text, Paragraph } = Typography;

export default function ShopOnboarding() {
    const [loading, setLoading] = useState(false);
    const [checkingSlug, setCheckingSlug] = useState(false);
    const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
    const [organizationId, setOrganizationId] = useState<string>('');
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        // Fetch user's organization
        const fetchOrganization = async () => {
            try {
                const response = await apiClient.get('/organizations/mine');
                if (response.data.data) {
                    setOrganizationId(response.data.data.id);
                } else {
                    message.error('No organization found. Please complete organization setup first.');
                    navigate('/seller/onboarding/org');
                }
            } catch (error) {
                message.error('Failed to load organization');
                navigate('/seller/onboarding/org');
            }
        };

        fetchOrganization();
    }, [navigate]);

    const checkSlugAvailability = async (slug: string) => {
        if (!slug || slug.length < 3) {
            setSlugAvailable(null);
            return;
        }

        setCheckingSlug(true);
        try {
            const response = await apiClient.get(`/shops/check-slug?slug=${slug}`);
            setSlugAvailable(response.data.data.available);
        } catch (error) {
            setSlugAvailable(null);
        } finally {
            setCheckingSlug(false);
        }
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
        form.setFieldValue('slug', value);

        // Debounce slug check
        const timeoutId = setTimeout(() => {
            checkSlugAvailability(value);
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    const handleSubmit = async (values: any) => {
        if (!slugAvailable) {
            message.error('Please choose an available slug');
            return;
        }

        setLoading(true);
        try {
            const response = await apiClient.post('/shops', {
                name: values.name,
                slug: values.slug,
                description: values.description,
                organizationId,
            });

            message.success('Shop created successfully!');
            const shopId = response.data.data.id;
            navigate(`/seller/shop/${shopId}`);
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to create shop');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-content">
                <Title level={2}>Create Your Shop</Title>
                <Paragraph type="secondary">
                    Set up your shop to start selling on Allkons
                </Paragraph>

                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Shop Name"
                        name="name"
                        rules={[
                            { required: true, message: 'Please enter shop name' },
                            { min: 3, message: 'Shop name must be at least 3 characters' },
                        ]}
                    >
                        <Input size="large" placeholder="My Construction Materials Shop" />
                    </Form.Item>

                    <Form.Item
                        label="Shop URL (Slug)"
                        name="slug"
                        rules={[
                            { required: true, message: 'Please enter shop slug' },
                            {
                                pattern: /^[a-z0-9-]+$/,
                                message: 'Only lowercase letters, numbers, and hyphens allowed',
                            },
                            { min: 3, message: 'Slug must be at least 3 characters' },
                        ]}
                        help={
                            <Text type="secondary">
                                Your shop will be available at: allkons.com/shop/
                                <strong>{form.getFieldValue('slug') || 'your-slug'}</strong>
                            </Text>
                        }
                    >
                        <Input
                            size="large"
                            placeholder="my-shop"
                            onChange={handleSlugChange}
                            suffix={
                                checkingSlug ? (
                                    <Text type="secondary">Checking...</Text>
                                ) : slugAvailable === true ? (
                                    <Text type="success">✓ Available</Text>
                                ) : slugAvailable === false ? (
                                    <Text type="danger">✗ Taken</Text>
                                ) : null
                            }
                        />
                    </Form.Item>

                    {slugAvailable === false && (
                        <Alert
                            message="This slug is already taken"
                            description="Please choose a different slug for your shop"
                            type="error"
                            showIcon
                            style={{ marginBottom: 16 }}
                        />
                    )}

                    <Form.Item label="Description (Optional)" name="description">
                        <Input.TextArea
                            size="large"
                            rows={4}
                            placeholder="Tell customers about your shop..."
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={loading}
                            disabled={!slugAvailable}
                            className="submit-button"
                        >
                            Create Shop
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
