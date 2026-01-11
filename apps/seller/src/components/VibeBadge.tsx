import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './VibeBadge.css';

export interface VibeBadgeProps {
    children: React.ReactNode;
    variant?: 'filled' | 'outlined' | 'subtle';
    color?: 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
    shape?: 'rounded' | 'pill';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    dot?: boolean;
    onClose?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export const VibeBadge: React.FC<VibeBadgeProps> = ({
    children,
    variant = 'filled',
    color = 'brand',
    size = 'md',
    shape = 'rounded',
    leftIcon,
    rightIcon,
    dot,
    onClose,
    className = '',
    style,
}) => {
    const baseClass = 'vibe-badge';
    const classes = [
        baseClass,
        `${baseClass}--${variant}`,
        `${baseClass}--${color}`,
        `${baseClass}--${size}`,
        `${baseClass}--${shape}`,
        className,
    ].filter(Boolean).join(' ');

    return (
        <span className={classes} style={style}>
            {dot && <span className="vibe-badge__dot" />}
            {leftIcon && <span className="vibe-badge__icon vibe-badge__icon--left">{leftIcon}</span>}
            <span className="vibe-badge__content">{children}</span>
            {rightIcon && <span className="vibe-badge__icon vibe-badge__icon--right">{rightIcon}</span>}
            {onClose && (
                <button
                    type="button"
                    className="vibe-badge__close"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    <CloseOutlined />
                </button>
            )}
        </span>
    );
};

export default VibeBadge;
