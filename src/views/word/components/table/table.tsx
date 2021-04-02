import React, { FC, useEffect } from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react';
import { usePageStores } from '@/views/word/store';
import { I_DataSource } from '@/views/word/typings/table';

const RTable: FC = () => {
  const { tableStore, controlStore } = usePageStores();

  const columns: any = [
   
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
      width: 150
    },
    {
      title: '简短解释',
      key: 'desc',
      render (text: string, record: I_DataSource) {
        return (
          <div className='line-height-30' dangerouslySetInnerHTML={{ __html: record.desc }} />
        )
      }
    },
    {
      title: '详细解释',
      key: 'detail',
      render (text: string, record: I_DataSource) {
        return (
          <div className='line-height-30' dangerouslySetInnerHTML={{ __html: record.detail }} />
        )
      }
    }
    // {
    //   title: '操作',
    //   key: 'action',
    //   width: 100,
    //   render (text: unknown, record: I_DataSource) {
    //     return (
    //       <div className='ant-btn-no-padding'>
    //         <div>
    //           <Button type='link'>
    //             编辑
    //           </Button>
    //         </div>
    //         {/* <Button type='link' onClick={() => handleExpandedRowKeys(record)}>
    //           详情
    //           {isExpanded(record)
    //             ? <DownOutlined className='ant-icon-in-btn'/>
    //             : <RightOutlined className='ant-icon-in-btn'/>
    //           }
    //         </Button> */}
    //       </div>
    //     )
    //   }
    // },
  ];

  // const isExpanded = (record: I_DataSource) => {
  //   return tableStore.expandedRowKeys.includes(record.id)
  // }
  
  // const handleExpandedRowKeys = (record: I_DataSource) => {
  //   tableStore.setExpandedRowKeys(isExpanded(record) ? [] : [record.id]);
  // }

  const changeCurrent = (page: number) => {
    tableStore.changePage(page);
    tableStore.handleDataSource(controlStore.controlData);
  }

  useEffect(() => {
    changeCurrent(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDataSource = () => {
    return tableStore.dataSource.filter((item: I_DataSource) => {
      return item.name.includes(controlStore.controlData.keyword) || 
      item.desc.includes(controlStore.controlData.keyword) || 
      item.detail.includes(controlStore.controlData.keyword)
    })
    
  }
  return (
    <div className='bg-white padding-all-16'>
      <Table
        expandedRowKeys={tableStore.expandedRowKeys}
        // expandIconColumnIndex={-1}
        loading={tableStore.loading}
        rowKey='name'
        // onRow={record => {
        //   return {
        //     onDoubleClick: () => {
        //       handleExpandedRowKeys(record);
        //     }
        //   };
        // }}
        // expandable={{
        //   expandedRowRender(record: I_DataSource) {
        //     return <>
        //       {isExpanded(record) && <div></div>}
        //     </>
        //   },
        // }}
        columns={columns}
        dataSource={getDataSource()}
        bordered
        size='middle'
        pagination={false}
      />
      {/* <div className='padding-all-12' flex='main:right'>
        <Pagination
          size='default'
          total={tableStore.total}
          current={tableStore.page}
          pageSize={tableStore.pageSize}
          showTotal={(total, range) => `共${total}条（${range[0]}条-${range[1]}条） `}
          hideOnSinglePage
          showQuickJumper
          showSizeChanger={false}
          onChange={(current: number) => changeCurrent(current)}
        />
      </div> */}
    </div>
  );
}

export default observer(RTable);
