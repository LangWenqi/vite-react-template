import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Result, Button } from 'antd';

const Home: FC<RouteComponentProps> = () => {
  const apply = () => {
    window.open('');
  }

  return (
    <div>
      <Result
        status='403'
        title='403'
        subTitle='无权限访问~'
        extra={<Button type='primary' onClick={() => apply()}>申请权限</Button>}
      />,
    </div>
  );
}

export default Home;
