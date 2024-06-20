import React, { CSSProperties } from 'react';

const Label = ({
  label,
  style,
  required,
}: {
  label: string;
  required?: boolean;
  style?: CSSProperties;
}) => {
  return (
    <p
      className='c-label fs-sm'
      style={{
        marginBottom: 8,
        ...(style || {}),
      }}
    >
      {label}
      {!!required && <span className='c-primary'>*</span>}
    </p>
  );
};

export default Label;
