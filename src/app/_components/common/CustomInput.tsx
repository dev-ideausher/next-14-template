import Image from 'next/image';
import { ChangeEvent } from 'react';
import infoIcon from '../../../../public/infoIcon.svg';
import Label from './Label';
import InputWrapper from './InputWrapper';

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
    <InputWrapper
      boxStyle={boxStyle}
      labelStyle={labelStyle}
      required={required}
      className={className}
      label={label}
    >
      <div className='d-flex align-center'>
        <input
          className='simple w-100'
          style={inputStyle || {}}
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
    </InputWrapper>
  );
};

export default CustomInput;
