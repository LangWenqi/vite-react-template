import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { Input, Button } from 'antd';
import { usePageStores } from '@/views/word/store';

const RControl: FC = () => {
  const { controlStore } = usePageStores();
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    controlStore.setControlDataKey('keyword', keyword);
    // tableStore.changePage(1)
    // tableStore.handleDataSource(controlStore.controlData);
  }
  const handleKeyword = (keyword:string) => {
    setKeyword(keyword);
    if (!keyword) {
      controlStore.setControlDataKey('keyword', '');
    }
  }

  return (
    <div className='bg-white padding-all-16' flex='cross:center'>
      <span>关键词：</span>
      <div className='input-width'>
        {/* <Input placeholder='请输入关键词' value={controlStore.controlData.keyword} onChange={(e) => controlStore.setControlDataKey('keyword', e.target.value)} allowClear /> */}
        <Input placeholder='请输入关键词' value={keyword} onChange={(e) => handleKeyword(e.target.value)} allowClear />
      </div>
      <Button type='primary' className='margin-left-12' onClick={() => handleSearch()}>查询</Button>
    </div>
  );
}

export default observer(RControl);
