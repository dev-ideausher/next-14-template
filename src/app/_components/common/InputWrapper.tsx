import React, { CSSProperties, ReactNode } from 'react';
import Label from './Label';

const InputWrapper = ({
  boxStyle,
  labelStyle,
  required,
  children,
  className,
  label,
}: {
  boxStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  required?: boolean;
  children: ReactNode;
  className?: string;
  label?: string;
}) => {
  return (
    <div
      className={className || ''}
      style={{
        textAlign: 'left',
        borderBottom: '2px solid #F0F0F3',
        padding: '8px 0px',
        ...(boxStyle || {}),
      }}
    >
      {label && (
        <Label label={label} style={labelStyle} required={!!required} />
      )}
      {children}
    </div>
  );
};

export default InputWrapper;
