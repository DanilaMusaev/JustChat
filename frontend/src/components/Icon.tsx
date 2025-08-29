import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: string;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = '', ...props }) => {
    return (
        <svg className={`icon ${className}`} {...props}>
            <use xlinkHref={`/sprite.svg#icon-${name}`} />
        </svg>
    );
};

export default Icon;
