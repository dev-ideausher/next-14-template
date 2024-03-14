'use client';

import { ReactNode, CSSProperties, useRef } from 'react';
import { message } from 'antd';

const CustomUpload = ({
  file,
  setFile,
  children,
  style,
  name,
  fileType,
  multiple,
}: {
  multiple?: boolean;
  file?: File;
  name?: string;
  fileType?: string;
  children?: ReactNode;
  style?: CSSProperties;
  setFile?: (file: File[] | undefined) => void;
}) => {
  const fileRef = useRef(null);
  const handleChange = (files: File[]) => {
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      const isLt2M = files[i].size / 1024 / 1024 <= 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return;
      }
    }
    if (setFile) {
      setFile(files);
    }
  };
  return (
    <>
      <div
        className='place-middle'
        style={{
          flexDirection: 'column',
          background: 'rgba(251, 148, 0, 0.10)',
          border: !children ? '1px dashed #FB9400' : 'none',
          ...(style || {}),
        }}
        onClick={() => {
          //@ts-ignore
          fileRef?.current?.click();
        }}
      >
        {children || (
          <span
            className='c-primary'
            style={{
              fontSize: '2rem',
            }}
          >
            +
          </span>
        )}
        <input
          name={name}
          style={{ display: 'none' }}
          type='file'
          ref={fileRef}
          multiple={multiple}
          accept={fileType || 'image/*'}
          onChange={(e) => {
            if (e.target.files) {
              handleChange(Array.from(e.target.files));
            }
          }}
        />
      </div>
    </>
  );
};

export default CustomUpload;
