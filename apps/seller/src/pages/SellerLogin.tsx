import { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api-client';
import './SellerLogin.css';

const { Title, Text, Link } = Typography;

export default function SellerLogin() {
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [phone, setPhone] = useState('');
    const [refCode, setRefCode] = useState('');
    const navigate = useNavigate();

    const handleRequestOtp = async (values: { phone: string }) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/auth/otp/request', {
                phone: values.phone,
            });

            setPhone(values.phone);
            setRefCode(response.data.data.refCode);
            setOtpSent(true);
            message.success('OTP sent! Check console for mock code (123456)');
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (values: { otp: string }) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/auth/otp/verify', {
                phone,
                otp: values.otp,
            });

            const { accessToken, user } = response.data.data;
            localStorage.setItem('accessToken', accessToken);

            // Fetch profile bootstrap to determine routing
            const profileResponse = await apiClient.get('/me');
            const profile = profileResponse.data.data;

            // Routing logic based on profile state
            if (!profile.hasOrg) {
                navigate('/seller/onboarding/org');
            } else if (profile.shops.length === 0) {
                navigate('/seller/onboarding/shop');
            } else if (profile.shops.length === 1) {
                navigate(`/seller/shop/${profile.shops[0].id}`);
            } else {
                navigate('/seller/shops');
            }
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="seller-login-container">
            <div className="seller-login-illustration">
                <div className="illustration-content">
                    <div className="illustration-placeholder">
                        {/* Placeholder for 3D illustration */}
                        <div className="phone-icon">📱</div>
                        <div className="floating-icons">
                            <span>🎁</span>
                            <span>💳</span>
                            <span>🪙</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="seller-login-form">
                <div className="form-content">
                    {!otpSent ? (
                        <>
                            <Title level={2}>Register an account with us</Title>
                            <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
                                Enter your phone number to get started
                            </Text>

                            <Form onFinish={handleRequestOtp} layout="vertical">
                                <Form.Item
                                    label="Phone Number"
                                    name="phone"
                                    rules={[
                                        { required: true, message: 'Please enter your phone number' },
                                        {
                                            pattern: /^\+66[0-9]{9}$/,
                                            message: 'Phone must be in format +66XXXXXXXXX'
                                        }
                                    ]}
                                    initialValue="+66"
                                >
                                    <Input
                                        size="large"
                                        placeholder="+66812345678"
                                        maxLength={12}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        block
                                        loading={loading}
                                        className="register-button"
                                    >
                                        Register
                                    </Button>
                                </Form.Item>

                                <div style={{ textAlign: 'center' }}>
                                    <Text>Already have an account? </Text>
                                    <Link onClick={() => message.info('Login flow - same as register for MVP')}>
                                        Login here
                                    </Link>
                                </div>
                            </Form>
                        </>
                    ) : (
                        <>
                            <div className="otp-icon">
                                <div className="lock-container">
                                    <div className="lock-circle"></div>
                                    <div className="lock-circle"></div>
                                    <div className="lock-circle"></div>
                                    <span className="lock-emoji">🔒</span>
                                </div>
                            </div>

                            <Title level={2}>Enter OTP</Title>
                            <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
                                We've sent a 6-digit code to {phone}
                            </Text>
                            <Text type="secondary" style={{ display: 'block', marginBottom: 24, fontSize: 12 }}>
                                Ref: {refCode}
                            </Text>

                            <Form onFinish={handleVerifyOtp} layout="vertical">
                                <Form.Item
                                    label="OTP Code"
                                    name="otp"
                                    rules={[
                                        { required: true, message: 'Please enter OTP' },
                                        { len: 6, message: 'OTP must be 6 digits' }
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="123456"
                                        maxLength={6}
                                        style={{ letterSpacing: '0.5em', textAlign: 'center', fontSize: 20 }}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        block
                                        loading={loading}
                                        className="confirm-button"
                                    >
                                        Confirm
                                    </Button>
                                </Form.Item>

                                <div style={{ textAlign: 'center' }}>
                                    <Link onClick={() => setOtpSent(false)}>
                                        ← Back to phone input
                                    </Link>
                                </div>
                            </Form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
