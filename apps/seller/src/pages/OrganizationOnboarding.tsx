import { useState } from 'react';
import { Form, Input, Button, Typography, Select, Modal, Checkbox, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api-client';
import './OrganizationOnboarding.css';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

type BusinessType = 'INDIVIDUAL' | 'REGISTERED_BUSINESS' | 'JURISTIC';

export default function OrganizationOnboarding() {
    const [loading, setLoading] = useState(false);
    const [showConsentModal, setShowConsentModal] = useState(false);
    const [formData, setFormData] = useState<any>(null);
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        const businessType = values.type as BusinessType;

        // Show consent modal for registered_business or juristic
        if (businessType === 'REGISTERED_BUSINESS' || businessType === 'JURISTIC') {
            setFormData(values);
            setShowConsentModal(true);
            return;
        }

        // For individual, proceed directly
        await createOrganization(values);
    };

    const handleConsentAccept = async () => {
        setShowConsentModal(false);
        await createOrganization(formData);
    };

    const createOrganization = async (values: any) => {
        setLoading(true);
        try {
            await apiClient.post('/organizations', {
                legalName: values.legalName,
                type: values.type,
                taxId: values.taxId,
                registrationNumber: values.registrationNumber,
                address: values.address,
            });

            message.success('Organization created successfully!');
            navigate('/seller/onboarding/shop');
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to create organization');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-content">
                <Title level={2}>Business Information</Title>
                <Paragraph type="secondary">
                    Tell us about your business to get started
                </Paragraph>

                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ type: 'INDIVIDUAL' }}
                >
                    <Form.Item
                        label="Business Type"
                        name="type"
                        rules={[{ required: true, message: 'Please select business type' }]}
                    >
                        <Select size="large">
                            <Option value="INDIVIDUAL">Individual (บุคคลธรรมดา)</Option>
                            <Option value="REGISTERED_BUSINESS">
                                Registered Business (บุคคลธรรมดาจดทะเบียนพาณิชย์)
                            </Option>
                            <Option value="JURISTIC">Juristic Person (นิติบุคคล)</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Business Name"
                        name="legalName"
                        rules={[{ required: true, message: 'Please enter business name' }]}
                    >
                        <Input size="large" placeholder="Enter your business name" />
                    </Form.Item>

                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                            prevValues.type !== currentValues.type
                        }
                    >
                        {({ getFieldValue }) => {
                            const type = getFieldValue('type');
                            if (type === 'REGISTERED_BUSINESS' || type === 'JURISTIC') {
                                return (
                                    <>
                                        <Form.Item
                                            label="Tax ID"
                                            name="taxId"
                                            rules={[{ required: true, message: 'Please enter tax ID' }]}
                                        >
                                            <Input size="large" placeholder="0000000000000" maxLength={13} />
                                        </Form.Item>

                                        {type === 'REGISTERED_BUSINESS' && (
                                            <Form.Item
                                                label="Commercial Registration Number"
                                                name="registrationNumber"
                                            >
                                                <Input size="large" placeholder="Enter registration number" />
                                            </Form.Item>
                                        )}
                                    </>
                                );
                            }
                            return null;
                        }}
                    </Form.Item>

                    <Form.Item label="Address (Optional)" name="address">
                        <Input.TextArea
                            size="large"
                            rows={3}
                            placeholder="Enter business address"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={loading}
                            className="submit-button"
                        >
                            Continue
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <Modal
                title="Organization Data Consent"
                open={showConsentModal}
                onOk={handleConsentAccept}
                onCancel={() => setShowConsentModal(false)}
                okText="Accept & Continue"
                cancelText="Cancel"
                okButtonProps={{ size: 'large' }}
                cancelButtonProps={{ size: 'large' }}
            >
                <div style={{ padding: '16px 0' }}>
                    <Paragraph>
                        By registering as a <strong>Registered Business</strong> or{' '}
                        <strong>Juristic Person</strong>, you consent to:
                    </Paragraph>
                    <ul>
                        <li>Sharing your business registration information with Allkons</li>
                        <li>Verification of your business documents by our team</li>
                        <li>Compliance with Thai commercial law and regulations</li>
                        <li>Regular updates to your business information as required</li>
                    </ul>
                    <Paragraph type="secondary" style={{ marginTop: 16 }}>
                        This information will be used for verification purposes and to ensure
                        compliance with marketplace regulations.
                    </Paragraph>
                </div>
            </Modal>
        </div>
    );
}
