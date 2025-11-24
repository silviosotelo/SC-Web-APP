
import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'rounded',
  width,
  height
}) => {
  const baseStyles = "bg-gray-200 animate-pulse";
  
  const variantStyles = {
    text: "rounded mt-1 mb-1",
    circular: "rounded-full",
    rectangular: "",
    rounded: "rounded-xl",
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
    ></div>
  );
};

export default Skeleton;
