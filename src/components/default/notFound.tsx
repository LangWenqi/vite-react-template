import React, { FC } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { Result, Button } from 'antd';

const Home: FC<RouteComponentProps> = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Result
        status='404'
        title='404'
        subTitle='页面不存在~'
        extra={[
          <Button type='primary' key='home' onClick={() => navigate('/')}>返回首页</Button>,
          <Button type='primary' key='back' onClick={() => navigate(-1)}>返回上一页</Button>
        ]}
      />
    </div>
  );
}

export default Home;
