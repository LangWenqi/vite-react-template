import React, { FC, useEffect } from 'react';
import { Table, Button, Pagination, TablePaginationConfig } from 'antd';
import { observer } from 'mobx-react';
import { usePageStores } from '@/views/home/store';
import { I_DataSource } from '@/views/home/typings/table';
import RChildTable from '@/views/home/components/childTable/childTable';
import ErrorSettlePer from '@/views/home/components/errorSettlePer/errorSettlePer';
import { InfoCircleOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { moneyFormat, fentoYuan } from '@/utils';
import { useTitleResize } from '@/hooks';
import { isDownload, downLoadError } from '@/views/home/utils/download';
import { isComplete } from '@/views/home/utils/sort';

import {
  M_Third_settlement_bill_status,
  M_Third_settlement_flow_status,
  E_Third_settlement_bill_status,
  E_Third_settlement_flow_status,
  M_Hummer_settlement_flow_status,
  E_Hummer_settlement_flow_status
} from '@/views/home/maps/common';

const RTable: FC = () => {
  const { tableStore, controlStore } = usePageStores();

  const { titleComponent } = useTitleResize({
    offSize: 1700,
    fontSize: 14,
    iconSize: 22
  })

  const columns: any = [
    {
      title: (
        <div>
          {titleComponent('核对月份', InfoCircleOutlined, '用户原始充值金额归属期，显示为某年某月')}
        </div>
      ),
      dataIndex: 'month_str',
      key: 'month_str'
    },
    {
      title: (
        <div>
          {titleComponent('主体资质', InfoCircleOutlined, '合同签订的本企业全称')}
        </div>
      ),
      dataIndex: 'enterprise',
      key: 'enterprise'
    },
    {
      title: (
        <div>
          {titleComponent('渠道类型', InfoCircleOutlined, '业务合作模式，分为直充、联运、广告三种类型')}
        </div>
      ),
      dataIndex: 'channel_type',
      key: 'channel_type'
    },
    {
      title: (
        <div>
          {titleComponent('渠道标签', InfoCircleOutlined, '业务为便捷地区分渠道而填写的备注')}
        </div>
      ),
      key: 'channel_short_name',
      dataIndex: 'channel_short_name'
    },
    {
      title: (
        <div>
          {titleComponent('渠道全称/渠道账户', InfoCircleOutlined, (
            <div>
              <div>渠道全称：（联运和广告）签订合同中三方企业全称；</div>
              <div>渠道账户：（直充-支付宝、微信、iOS）渠道账户</div>
            </div>
          ))}
        </div>
      ),
      key: 'channel_name',
      dataIndex: 'channel_name'
    },
    {
      title: (
        <div>
          {titleComponent('三方结算单原始总额（元）', InfoCircleOutlined, '用户原始充值总金额')}
        </div>
      ),
      key: 'third_settlement_bill',
      render (text: unknown, record: I_DataSource) {
        return (
          <div style={{ minWidth: 120 }}>
            {record.third_settlement_bill_status === E_Third_settlement_bill_status.complete
              ? moneyFormat(fentoYuan(record.third_settlement_bill)) 
              : `-（${M_Third_settlement_bill_status[record.third_settlement_bill_status]}）`}
          </div>
        )
      }
    },
    {
      title: (
        <div style={{ minWidth: 120 }}>
          {titleComponent('三方流水总额（元）', InfoCircleOutlined, '渠道所有流水明细累加的总金额')}
        </div>
      ),
      key: 'third_settlement_flow',
      render (text: unknown, record: I_DataSource) {
        return (
          <div>{}
            {record.third_settlement_flow_status === E_Third_settlement_flow_status.complete
              ? moneyFormat(fentoYuan(record.third_settlement_flow)) 
              : `-（${M_Third_settlement_flow_status[record.third_settlement_flow_status]}）`}
          </div>
        )
      }
    },
    {
      title: (
        <div>
          {titleComponent('内部流水总额（元）', InfoCircleOutlined, '由hummer交易服务记录的所有流水明细累加的总金额')}
        </div>
      ),
      key: 'hummer_settlement_flow',
      render (text: unknown, record: I_DataSource) {
        return (
          <div style={{ minWidth: 120 }}>
            {record.hummer_settlement_flow_status === E_Hummer_settlement_flow_status.complete
              ? moneyFormat(fentoYuan(record.hummer_settlement_flow)) 
              : `-（${M_Hummer_settlement_flow_status[record.hummer_settlement_flow_status]}）`}
          </div>
        )
      }
    },
    {
      title: (
        <div>
          {titleComponent('内外流水差额（元）', InfoCircleOutlined, '内部流水总额 - 三方流水总额')}
        </div>
      ),
      key: 'error_settlement_flow',
      sorter: true,
      sortOrder: tableStore.sortedInfo.columnKey === 'error_settlement_flow' && tableStore.sortedInfo.order,
      render (text: unknown, record: I_DataSource) {
        return (
          <div>
            {isComplete(record) ? <span className={Number(record.error_settlement_flow) !== 0 ? 'color-red' : ''}>{moneyFormat(fentoYuan(record.error_settlement_flow))}</span> : '-'}
          </div>
        )
      }
    },
    {
      title: (
        <div>
          {titleComponent('内外流水差额率', InfoCircleOutlined, '内部流水总额 / 三方流水总额 - 1')}
        </div>
      ),
      key: 'error_settlement_per',
      sorter: true,
      sortOrder: tableStore.sortedInfo.columnKey === 'error_settlement_per' && tableStore.sortedInfo.order,
      render (text: unknown, record: I_DataSource) {
        return (
          <div>
            {isComplete(record) 
              ? <ErrorSettlePer record={record} />
              : '-'}
          </div>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render (text: unknown, record: I_DataSource) {
        return (
          <div className='ant-btn-no-padding'>
            <div>
              {isComplete(record) && isDownload(record)
                ? (
                  <Button type='link' onClick={() => downLoadError(record.download)}>
                    下载差错流水
                  </Button>
                )
                : null}
            </div>
            <Button type='link' onClick={() => handleExpandedRowKeys(record)}>
              详情
              {isExpanded(record)
                ? <DownOutlined className='ant-icon-in-btn' />
                : <RightOutlined className='ant-icon-in-btn' />}
            </Button>
          </div>
        )
      }
    }
  ];

  const isExpanded = (record: I_DataSource) => {
    return tableStore.expandedRowKeys.includes(record.id)
  }
  
  const handleExpandedRowKeys = (record: I_DataSource) => {
    tableStore.setExpandedRowKeys(isExpanded(record) ? [] : [record.id]);
    // const expandedRowKeys = [...tableStore.expandedRowKeys];
    // const expandedRowKeyIndex = expandedRowKeys.indexOf(record.id);
    // if (expandedRowKeyIndex > -1) {
    //   expandedRowKeys.splice(expandedRowKeyIndex, 1);
    // } else {
    //   expandedRowKeys.push(record.id);
    // }
    // tableStore.setExpandedRowKeys(expandedRowKeys);
  }

  const changeCurrent = (page: number) => {
    tableStore.changePage(page);
    tableStore.handleDataSource(controlStore.controlData);
  }

  const handleTableChange = (pagination: TablePaginationConfig, filters: any, sorter: any) => {
    const columnKey = (sorter.order && sorter.columnKey) || '';
    const order = sorter.order || false;

    tableStore.setSortedInfo({
      columnKey,
      order
    })

    changeCurrent(1);
  }
  
  useEffect(() => {
    // changeCurrent(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='bg-white padding-all-16'>
      <div className='overflow--auto ant-table-expanded-color'>
        <Table
          locale={{
            cancelSort: '',
            triggerAsc: '',
            triggerDesc: ''
          }}
          sortDirections={['descend']}
          onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
          expandedRowKeys={tableStore.expandedRowKeys}
          expandIconColumnIndex={-1}
          loading={tableStore.loading}
          rowKey='id'
          // onRow={record => {
          //   return {
          //     onDoubleClick: () => {
          //       handleExpandedRowKeys(record);
          //     }
          //   };
          // }}
          expandable={{
            expandedRowRender (record: I_DataSource) {
              return (
                <>
                  <div className='font-weight font-14'>结算详情：</div>
                  <RChildTable parentRecord={record} isParentExpanded={isExpanded(record)} />
                </>
              )
            }
            // rowExpandable: record => !!record,
          }}
          columns={columns}
          dataSource={tableStore.dataSource}
          bordered
          size='small'
          pagination={false}
        />
        <div className='padding-all-12' flex='main:right'>
          <Pagination
            size='default'
            total={tableStore.total}
            current={tableStore.page}
            pageSize={tableStore.pageSize}
            showTotal={(total, range) => `共${total}条（${range[0]}-${range[1]}条） `}
            // hideOnSinglePage
            showQuickJumper
            showSizeChanger={false}
            onChange={(current: number) => changeCurrent(current)}
          />
        </div>
      </div>
    </div>
  );
}

export default observer(RTable);
