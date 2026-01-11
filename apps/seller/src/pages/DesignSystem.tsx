import { useState } from 'react';
import {
    Typography,
    Button,
    Input,
    Row,
    Col,
    Tag,
    Checkbox,
    Switch,
    Alert,
    Radio,
    Space,
    Divider,
} from 'antd';
import VibeBadge from '../components/VibeBadge';
import {
    SearchOutlined,
    UserOutlined,
    HeartOutlined,
    ShoppingCartOutlined,
    LayoutOutlined,
    SkinOutlined,
    FontSizeOutlined,
    BgColorsOutlined,
    GatewayOutlined,
    BlockOutlined,
    ArrowRightOutlined,
} from '@ant-design/icons';
import {
    RiHome2Line,
    RiShoppingCartLine,
    RiCheckboxCircleLine,
} from '@remixicon/react';
import './DesignSystem.css';
import logoAllkons from '../assets/logo-allkons.png';

const { Title, Text, Paragraph } = Typography;

// --- Vibe Component Showcase Layer ---

const StatCard = ({ title, value, trend, icon: Icon }: any) => (
    <div className="vibe-card stat-card-preview" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size={12}>
            <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>{title}</Text>
                {Icon && <Icon size={20} style={{ color: 'rgba(255,255,255,0.9)' }} />}
            </Space>
            <div>
                <Title level={2} style={{ color: 'white', margin: 0 }}>{value}</Title>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    <Tag color="success" style={{ border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                        {trend}
                    </Tag>
                    <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>vs last month</Text>
                </div>
            </div>
        </Space>
    </div>
);

export default function DesignSystem() {
    const [activeSection, setActiveSection] = useState('getting-started');
    const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');

    const navItems = [
        { id: 'getting-started', label: 'Getting Started', icon: <GatewayOutlined /> },
        { id: 'typography', label: 'Typography', icon: <FontSizeOutlined /> },
        { id: 'colors', label: 'Color Palette', icon: <BgColorsOutlined /> },
        { id: 'spacing', label: 'Spacing & Radii', icon: <BlockOutlined /> },
        { id: 'shadows', label: 'Elevations', icon: <SkinOutlined /> },
        { id: 'components', label: 'Base Components', icon: <LayoutOutlined /> },
        { id: 'badges', label: 'Vibe Badges', icon: <ShoppingCartOutlined /> },
        { id: 'vibe-layer', label: 'Vibe Showcase', icon: <HeartOutlined /> },
    ];

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="design-system">
            <aside className="design-sidebar">
                <div className="sidebar-brand">
                    <img src={logoAllkons} alt="Allkons" className="sidebar-logo-img" />
                </div>

                <nav className="design-nav">
                    {navItems.map((item) => (
                        <div
                            key={item.id}
                            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(item.id)}
                        >
                            <Space>
                                {item.icon}
                                {item.label}
                            </Space>
                        </div>
                    ))}
                </nav>
            </aside>

            <main className="design-content">
                <header id="getting-started" className="design-header">
                    <Title level={1}>Allkons Design System</Title>
                    <Paragraph style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: 800 }}>
                        A modular, token-driven design language built for high-performance commerce.
                        Powered by Ant Design and extended with the "Vibe" component layer.
                    </Paragraph>
                </header>

                {/* Typography Section */}
                <section id="typography" className="design-section">
                    <h2>Typography</h2>
                    <div className="vibe-card">
                        <Space direction="vertical" size={48} style={{ width: '100%' }}>
                            {/* Display Scale */}
                            <div>
                                <Title level={5} type="secondary" style={{ marginBottom: 24, textTransform: 'uppercase', letterSpacing: '1px' }}>Display Scale</Title>
                                <Space direction="vertical" size={24} style={{ width: '100%' }}>
                                    {[
                                        { class: 'display-xl', label: '.display-xl', var: '--size-11xl', px: '72px' },
                                        { class: 'display-lg', label: '.display-lg', var: '--size-10xl', px: '64px' },
                                    ].map((t) => (
                                        <div key={t.var}>
                                            <div className={t.class} style={{ margin: 0 }}>The future of commerce.</div>
                                            <Text code>{t.label} / {t.var} ({t.px}) / Bold</Text>
                                        </div>
                                    ))}
                                </Space>
                            </div>

                            <Divider />

                            {/* Heading Scale */}
                            <div>
                                <Title level={5} type="secondary" style={{ marginBottom: 24, textTransform: 'uppercase', letterSpacing: '1px' }}>Heading Scale</Title>
                                <Space direction="vertical" size={24} style={{ width: '100%' }}>
                                    {[
                                        { tag: 'h1', label: 'h1', var: '--size-9xl', px: '56px', weight: 'Bold' },
                                        { tag: 'h2', label: 'h2', var: '--size-7xl', px: '44px', weight: 'Semibold' },
                                        { tag: 'h3', label: 'h3', var: '--size-5xl', px: '36px', weight: 'Semibold' },
                                        { tag: 'h4', label: 'h4', var: '--size-3xl', px: '24px', weight: 'Semibold' },
                                        { tag: 'h5', label: 'h5', var: '--size-xl', px: '18px', weight: 'Medium' },
                                    ].map((t) => {
                                        const Tag = t.tag as any;
                                        return (
                                            <div key={t.var}>
                                                <Tag style={{ margin: 0 }}>{t.label.toUpperCase()} - Designing the core</Tag>
                                                <Text code>{t.label} / {t.var} ({t.px}) / {t.weight}</Text>
                                            </div>
                                        );
                                    })}
                                </Space>
                            </div>

                            <Divider />

                            {/* Body & Small Scale */}
                            <div>
                                <Title level={5} type="secondary" style={{ marginBottom: 24, textTransform: 'uppercase', letterSpacing: '1px' }}>Body & Utility Scale</Title>
                                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                    {[
                                        { label: 'Body Large', var: '--size-lg', px: '18px' },
                                        { label: 'Body Medium (Base)', var: '--size-md', px: '16px' },
                                        { label: 'Body Small', var: '--size-sm', px: '14px' },
                                        { label: 'Caption', var: '--size-xs', px: '12px' },
                                        { label: 'Micro', var: '--size-2xs', px: '10px' },
                                    ].map((t) => (
                                        <div key={t.var} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: `var(${t.var})` }}>{t.label} - High-performance commerce experience.</Text>
                                            <Text code>{t.var} ({t.px})</Text>
                                        </div>
                                    ))}
                                </Space>
                            </div>
                        </Space>
                    </div>
                </section>

                {/* Colors Section */}
                <section id="colors" className="design-section">
                    <h2>Color Palette</h2>
                    <Title level={4}>Brand Primary</Title>
                    <div className="color-grid">
                        {[
                            { name: 'Default', var: '--background-brand-default', color: '#00AF43' },
                            { name: 'Darker', var: '--background-brand-darker', color: '#008F35' },
                            { name: 'Lighter', var: '--background-brand-lighter', color: '#33BF69' },
                            { name: 'Subtle', var: '--background-brand-subtle', color: '#E6F7ED' },
                        ].map((c) => (
                            <div key={c.name} className="color-swatch-premium">
                                <div className="swatch-fill" style={{ background: `var(${c.var})` }} />
                                <div className="swatch-meta">
                                    <span className="swatch-label">{c.name}</span>
                                    <span className="swatch-var">{c.var}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Title level={4} style={{ marginTop: 40 }}>System Tones</Title>
                    <div className="color-grid">
                        {[
                            { name: 'Success', var: '--background-success-default', color: '#1EB950' },
                            { name: 'Warning', var: '--background-warning-default', color: '#FF9500' },
                            { name: 'Error', var: '--background-error-default', color: '#FF3B30' },
                            { name: 'Info', var: '--background-info-default', color: '#007AFF' },
                        ].map((c) => (
                            <div key={c.name} className="color-swatch-premium">
                                <div className="swatch-fill" style={{ background: `var(${c.var})` }} />
                                <div className="swatch-meta">
                                    <span className="swatch-label">{c.name}</span>
                                    <span className="swatch-var">{c.var}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Spacing & Radii */}
                <section id="spacing" className="design-section">
                    <h2>Spacing & Foundation</h2>
                    <Row gutter={32}>
                        <Col span={14}>
                            <Title level={4}>Spacing System</Title>
                            <div className="vibe-card spacing-viz">
                                {[
                                    { label: '--- 1 (4px / 0.25rem)', var: '--spacing-1' },
                                    { label: '--- 2 (8px / 0.5rem)', var: '--spacing-2' },
                                    { label: 'xs -- 4 (16px / 1rem)', var: '--spacing-4' },
                                    { label: 'md -- 6 (24px / 1.5rem)', var: '--spacing-6' },
                                    { label: 'xl -- 8 (32px / 2rem)', var: '--spacing-8' },
                                    { label: '5xl -- 12 (48px / 3rem)', var: '--spacing-12' },
                                    { label: '9xl -- 16 (64px / 4rem)', var: '--spacing-16' },
                                    { label: '13xl -- 24 (96px / 6rem)', var: '--spacing-24' },
                                    { label: '20xl -- 48 (192px / 12rem)', var: '--spacing-48' },
                                ].map((s) => (
                                    <div key={s.label} className="spacing-item">
                                        <Text className="spacing-label" style={{ minWidth: 100 }}>{s.label}</Text>
                                        <div className="spacing-bar-container">
                                            <div className="spacing-bar" style={{ width: `var(${s.var})` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                        <Col span={10}>
                            <Title level={4}>Border Radii</Title>
                            <div className="vibe-card">
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <div style={{ height: 48, background: 'var(--background-secondary)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                                        <Text style={{ fontSize: '14px' }}>Extra Small (4px)</Text>
                                    </div>
                                    <div style={{ height: 48, background: 'var(--background-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                                        <Text style={{ fontSize: '14px' }}>Small (8px)</Text>
                                    </div>
                                    <div style={{ height: 48, background: 'var(--background-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                                        <Text style={{ fontSize: '14px' }}>Medium (12px)</Text>
                                    </div>
                                    <div style={{ height: 48, background: 'var(--background-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                                        <Text style={{ fontSize: '14px' }}>Large (16px)</Text>
                                    </div>
                                    <div style={{ height: 48, background: 'var(--background-secondary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                                        <Text style={{ fontSize: '14px' }}>Extra Large (24px)</Text>
                                    </div>
                                    <div style={{ height: 48, background: 'var(--background-secondary)', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                                        <Text style={{ fontSize: '14px' }}>Full (Circular)</Text>
                                    </div>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </section>

                {/* Shadows Section */}
                <section id="shadows" className="design-section">
                    <h2>Elevations</h2>
                    <div className="shadow-wall">
                        {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((s) => (
                            <div key={s} className="shadow-preview" style={{ boxShadow: `var(--shadow-${s})` }}>
                                <Text strong style={{ textTransform: 'uppercase' }}>{s}</Text>
                                <Text type="secondary" style={{ fontSize: 10 }}>--shadow-{s}</Text>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Base Components Section */}
                <section id="components" className="design-section">
                    <h2>Base Components</h2>
                    <div className="vibe-card">
                        <Space direction="vertical" size={24} style={{ width: '100%' }}>
                            <div>
                                <Title level={5} style={{ marginBottom: 24 }}>Buttons Matrix</Title>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-primary)' }}>
                                            <th style={{ padding: '12px 0' }}><Text type="secondary">Size</Text></th>
                                            <th style={{ padding: '12px 0' }}><Text type="secondary">Primary</Text></th>
                                            <th style={{ padding: '12px 0' }}><Text type="secondary">Secondary</Text></th>
                                            <th style={{ padding: '12px 0' }}><Text type="secondary">Text / Ghost</Text></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { size: 'large', label: 'Large (md)' },
                                            { size: 'middle', label: 'Middle (sm)' },
                                            { size: 'small', label: 'Small (xs)' },
                                        ].map((s) => (
                                            <tr key={s.size} style={{ borderBottom: '1px solid var(--border-secondary)' }}>
                                                <td style={{ padding: '16px 0' }}><Text strong>{s.label}</Text></td>
                                                <td style={{ padding: '16px 0' }}>
                                                    <Button type="primary" size={s.size as any}>Primary</Button>
                                                </td>
                                                <td style={{ padding: '16px 0' }}>
                                                    <Button size={s.size as any}>Secondary</Button>
                                                </td>
                                                <td style={{ padding: '16px 0' }}>
                                                    <Button type="text" size={s.size as any}>Text Button</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Divider />
                            <div>
                                <Title level={5}>Inputs & Selection</Title>
                                <Row gutter={[32, 24]}>
                                    <Col span={12}>
                                        <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>Text Inputs</Text>
                                        <Space direction="vertical" style={{ width: '100%' }} size={12}>
                                            <Input size="large" prefix={<UserOutlined style={{ color: 'var(--text-tertiary)' }} />} placeholder="Enter username" />
                                            <Input size="large" placeholder="With search" suffix={<SearchOutlined style={{ color: 'var(--text-tertiary)' }} />} />
                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>Feedback Banners</Text>
                                        <Space direction="vertical" style={{ width: '100%' }} size={12}>
                                            <Alert message="Successfully updated product price." type="success" showIcon />
                                            <Alert message="New inventory alert nearby." type="info" showIcon />
                                        </Space>
                                    </Col>
                                    <Col span={24}>
                                        <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>Radio Button - Detail Alignment</Text>
                                        <div className="vibe-card" style={{ padding: '24px' }}>
                                            <Row gutter={[48, 24]}>
                                                {[
                                                    { label: 'Small (sm)', size: 'vibe-radio-sm' },
                                                    { label: 'Medium (md)', size: 'vibe-radio-md' },
                                                    { label: 'Large (lg)', size: 'vibe-radio-lg' }
                                                ].map((variant) => (
                                                    <Col span={8} key={variant.size}>
                                                        <Space direction="vertical" size={20} style={{ width: '100%' }}>
                                                            <div className={variant.size}>
                                                                <Radio checked>
                                                                    <div style={{ marginLeft: 8 }}>
                                                                        <Text style={{ fontWeight: 500, display: 'block' }}>Remember me</Text>
                                                                        <Text type="secondary" style={{ fontSize: '12px' }}>Save my login details for next time.</Text>
                                                                    </div>
                                                                </Radio>
                                                            </div>
                                                            <div className={variant.size}>
                                                                <Radio>
                                                                    <div style={{ marginLeft: 8 }}>
                                                                        <Text style={{ fontWeight: 500, display: 'block' }}>Remember me</Text>
                                                                        <Text type="secondary" style={{ fontSize: '12px' }}>Save my login details for next time.</Text>
                                                                    </div>
                                                                </Radio>
                                                            </div>
                                                            <div className={variant.size}>
                                                                <Radio disabled>
                                                                    <div style={{ marginLeft: 8 }}>
                                                                        <Text style={{ fontWeight: 500, display: 'block' }}>Remember me</Text>
                                                                        <Text type="secondary" style={{ fontSize: '12px' }}>Save my login details for next time.</Text>
                                                                    </div>
                                                                </Radio>
                                                            </div>
                                                        </Space>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>Checkbox - Detail Alignment</Text>
                                        <div className="vibe-card" style={{ padding: '24px' }}>
                                            <Row gutter={[48, 24]}>
                                                {[
                                                    { label: 'Small (sm)', size: 'vibe-checkbox-sm' },
                                                    { label: 'Medium (md)', size: 'vibe-checkbox-md' },
                                                    { label: 'Large (lg)', size: 'vibe-checkbox-lg' }
                                                ].map((variant) => (
                                                    <Col span={8} key={variant.size}>
                                                        <Space direction="vertical" size={20} style={{ width: '100%' }}>
                                                            <div className={variant.size}>
                                                                <Checkbox checked>
                                                                    <div style={{ marginLeft: 8 }}>
                                                                        <Text style={{ fontWeight: 500, display: 'block' }}>Remember me</Text>
                                                                        <Text type="secondary" style={{ fontSize: '12px' }}>Save my login details for next time.</Text>
                                                                    </div>
                                                                </Checkbox>
                                                            </div>
                                                            <div className={variant.size}>
                                                                <Checkbox>
                                                                    <div style={{ marginLeft: 8 }}>
                                                                        <Text style={{ fontWeight: 500, display: 'block' }}>Remember me</Text>
                                                                        <Text type="secondary" style={{ fontSize: '12px' }}>Save my login details for next time.</Text>
                                                                    </div>
                                                                </Checkbox>
                                                            </div>
                                                            <div className={variant.size}>
                                                                <Checkbox disabled>
                                                                    <div style={{ marginLeft: 8 }}>
                                                                        <Text style={{ fontWeight: 500, display: 'block' }}>Remember me</Text>
                                                                        <Text type="secondary" style={{ fontSize: '12px' }}>Save my login details for next time.</Text>
                                                                    </div>
                                                                </Checkbox>
                                                            </div>
                                                        </Space>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>Toggles (Switches)</Text>
                                        <Space size="large">
                                            <Space direction="vertical">
                                                <Switch checked />
                                                <Switch />
                                            </Space>
                                            <Space direction="vertical">
                                                <Switch checked disabled />
                                                <Switch disabled />
                                            </Space>
                                        </Space>
                                    </Col>
                                </Row>
                            </div>
                        </Space>
                    </div>
                </section>

                {/* Vibe Badges Section */}
                <section id="badges" className="design-section">
                    <h2>Vibe Badges</h2>
                    <Paragraph style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
                        A versatile badge system for statuses, counts, and tags. Supports multiple variants, colors, and shapes.
                    </Paragraph>

                    <div className="vibe-card">
                        <Space direction="vertical" size={32} style={{ width: '100%' }}>
                            {/* Variants */}
                            <div>
                                <Title level={5} style={{ marginBottom: 16 }}>Styles & Variants</Title>
                                <Space size="middle" wrap>
                                    <VibeBadge color="brand" variant="filled">Filled</VibeBadge>
                                    <VibeBadge color="brand" variant="subtle">Subtle</VibeBadge>
                                    <VibeBadge color="brand" variant="outlined">Outlined</VibeBadge>
                                    <VibeBadge color="brand" variant="filled" shape="pill">Pill Shape</VibeBadge>
                                    <VibeBadge color="neutral" variant="subtle" dot>Status Dot</VibeBadge>
                                </Space>
                            </div>

                            <Divider />

                            {/* Color Palettes */}
                            <div>
                                <Title level={5} style={{ marginBottom: 16 }}>Color Palettes</Title>
                                <Row gutter={[0, 16]}>
                                    <Col span={24}>
                                        <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>Subtle (Recommended for UI states)</Text>
                                        <Space size="middle" wrap>
                                            <VibeBadge color="neutral" variant="subtle">Neutral</VibeBadge>
                                            <VibeBadge color="brand" variant="subtle">Brand</VibeBadge>
                                            <VibeBadge color="success" variant="subtle">Success</VibeBadge>
                                            <VibeBadge color="warning" variant="subtle">Warning</VibeBadge>
                                            <VibeBadge color="error" variant="subtle">Error</VibeBadge>
                                            <VibeBadge color="info" variant="subtle">Info</VibeBadge>
                                        </Space>
                                    </Col>
                                    <Col span={24}>
                                        <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>Filled (High Attention)</Text>
                                        <Space size="middle" wrap>
                                            <VibeBadge color="neutral" variant="filled">Neutral</VibeBadge>
                                            <VibeBadge color="brand" variant="filled">Brand</VibeBadge>
                                            <VibeBadge color="success" variant="filled">Success</VibeBadge>
                                            <VibeBadge color="warning" variant="filled">Warning</VibeBadge>
                                            <VibeBadge color="error" variant="filled">Error</VibeBadge>
                                            <VibeBadge color="info" variant="filled">Info</VibeBadge>
                                        </Space>
                                    </Col>
                                </Row>
                            </div>

                            <Divider />

                            {/* Icons & Closable */}
                            <div>
                                <Title level={5} style={{ marginBottom: 16 }}>Icons & Closable</Title>
                                <Space size="middle" wrap>
                                    <VibeBadge color="brand" variant="subtle" leftIcon={<ShoppingCartOutlined />}>Cart Items</VibeBadge>
                                    <VibeBadge color="neutral" variant="outlined" rightIcon={<ShoppingCartOutlined />}>Checkout</VibeBadge>
                                    <VibeBadge color="success" variant="subtle" leftIcon={<ArrowRightOutlined />}>Completed</VibeBadge>
                                    <VibeBadge color="brand" variant="subtle" onClose={() => console.log('Closed')}>Dismissible</VibeBadge>
                                    <VibeBadge color="error" variant="filled" shape="pill">99+</VibeBadge>
                                </Space>
                            </div>
                        </Space>
                    </div>
                </section>

                {/* Vibe Layer Showcase */}
                <section id="vibe-layer" className="design-section">
                    <Row align="middle" justify="space-between" style={{ marginBottom: 24 }}>
                        <Col>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <Title level={2} style={{ margin: 0 }}>Vibe Showcase</Title>
                                <Tag color="cyan">Premium Layer</Tag>
                            </div>
                        </Col>
                        <Col>
                            <Space>
                                <Text type="secondary">Preview Theme:</Text>
                                <Radio.Group value={previewTheme} onChange={(e) => setPreviewTheme(e.target.value)} buttonStyle="solid">
                                    <Radio.Button value="light">Light</Radio.Button>
                                    <Radio.Button value="dark">Dark</Radio.Button>
                                </Radio.Group>
                            </Space>
                        </Col>
                    </Row>

                    <div className={previewTheme === 'dark' ? 'dark-preview-container' : ''} style={{
                        padding: 32,
                        borderRadius: 'var(--radius-lg)',
                        background: previewTheme === 'dark' ? '#121212' : 'transparent',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        border: previewTheme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--border-primary)'
                    }}>
                        <Paragraph style={{ color: previewTheme === 'dark' ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)', marginBottom: 32 }}>
                            High-level functional components built with Vibe design tokens.
                            Optimized for business-to-business efficiency.
                        </Paragraph>

                        <Row gutter={24}>
                            <Col span={8}>
                                <StatCard
                                    title="Total Revenue"
                                    value="฿1,248,000"
                                    trend="+12.5%"
                                    icon={RiShoppingCartLine}
                                />
                            </Col>
                            <Col span={8}>
                                <StatCard
                                    title="Active Shops"
                                    value="42"
                                    trend="+4"
                                    icon={RiHome2Line}
                                />
                            </Col>
                            <Col span={8}>
                                <StatCard
                                    title="Processing Orders"
                                    value="156"
                                    trend="-2.4%"
                                    icon={RiCheckboxCircleLine}
                                />
                            </Col>
                        </Row>
                    </div>
                </section>

                <footer style={{ height: 120 }} />
            </main>
        </div>
    );
}
