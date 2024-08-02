'use client';

import { Col, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useRef, useState } from 'react';
import FAQ from './_components/FAQ';

const page = () => {
  const contentRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeContent, setIframeContent] = useState<string>('Loading...');

  useEffect(() => {
    const iframe = contentRef.current;

    const handleLoad = () => {
      try {
        if (iframe && iframe.contentDocument) {
          console.log(
            '🚀 ~ handleLoad ~ iframe.contentDocument.body.innerHTML:',
            iframe.contentDocument.body.innerHTML
          );
          setIframeContent(iframe.contentDocument.body.innerHTML);
        }
      } catch (error) {
        console.error('Error accessing iframe content:', error);
        setIframeContent(
          'Unable to access iframe content due to cross-origin restrictions.'
        );
      }
    };

    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  return (
    <>
      <Col span={12}>
        <iframe
          src='https://zerodha-common.s3.ap-south-1.amazonaws.com/Varsity/Modules/Module%202_Technical%20Analysis.pdf'
          width='100%'
          height='100%'
          ref={contentRef}
          style={{ border: 'none' }}
        >
          Your browser does not support iframes.
        </iframe>
      </Col>
      <Col span={12}>
        <Tabs defaultActiveKey='1' type='card'>
          <TabPane tab='FAQs' key='1'>
            <p>{iframeContent}</p>
          </TabPane>
          <TabPane tab='Quiz' key='2'>
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </Col>
    </>
  );
};

export default page;
