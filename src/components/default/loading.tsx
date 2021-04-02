import React, { FC } from 'react';
import { Spin } from 'antd';

const Loading: FC<{ loading?: boolean }> = () => {
  
  return (
    <Spin tip='Loading...'>
      <div className='height-vh-100' />
    </Spin>
  );
}

export default Loading;
