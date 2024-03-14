import Image from 'next/image';
import { ChangeEvent } from 'react';
import infoIcon from '../../../../public/infoIcon.svg';

const CustomInput = ({
  label,
  name,
  type,
  value,
  min,
  max,
  required,
  onChange,
  inputStyle,
  labelStyle,
  boxStyle,
  className,
  placeholder,
  defaultValue,
  readOnly,
  infoTag,
}: {
  name?: string;
  value?: string;
  type?: string;
  label?: string;
  readOnly?: boolean;
  className?: string;
  boxStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  min?: string | number;
  max?: string | number;
  onChange?: (val: string) => void;
  infoTag?: string;
}) => {
  const handleChange = onChange
    ? (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      }
    : undefined;
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
        <p
          className='c-label fs-sm'
          style={{
            marginBottom: 8,
            ...(labelStyle || {}),
          }}
        >
          {label}
          {!!required && <span className='c-primary'>*</span>}
        </p>
      )}
      <div className='d-flex align-center'>
        <input
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            ...(inputStyle || {}),
          }}
          name={name}
          type={type || 'text'}
          value={onChange ? value : undefined}
          defaultValue={defaultValue}
          onChange={handleChange}
          required={!!required}
          placeholder={placeholder}
          readOnly={readOnly}
          min={min}
          max={max}
        />
        {infoTag && (
          <Image alt={infoTag} src={infoIcon} height={16} width={16} />
        )}
      </div>
    </div>
  );
};

export default CustomInput;
