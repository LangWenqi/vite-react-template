import React, { FC } from 'react';
import RouterDom from '@/router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { StoreProvider } from '@/store';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './styles/base.scss';
import './styles/antd.scss';
import './styles/flex.scss';
moment.locale('zh-cn');

const App: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <StoreProvider>
        <RouterDom />
      </StoreProvider>
    </ConfigProvider>
  );
}

export default App;
