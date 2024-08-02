import React from 'react';

const FAQ = ({
  contentRef,
}: {
  contentRef: React.MutableRefObject<HTMLIFrameElement | null>;
}) => {
  const iframeContent = contentRef?.current?.contentDocument.body.innerHTML;

  return <div>{iframeContent}</div>;
};

export default FAQ;
