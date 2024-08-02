import { Col, Layout, Row } from 'antd';
import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout style={{ height: '100%', minHeight: '100vh' }}>
      <Row style={{ height: '100vh' }}>{children}</Row>
    </Layout>
  );
};

export default layout;
