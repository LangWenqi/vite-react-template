import React, { FC, useState, useRef, useEffect, useCallback } from 'react';
import { Table, Pagination, Button, TablePaginationConfig } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { I_ChildDataSource } from '@/views/home/typings/childTable';
import { I_DataSource, I_SortedInfo } from '@/views/home/typings/table';
import { moneyFormat, fentoYuan } from '@/utils';
import { getChannelApp } from '@/apis/check';
import { I_getChannelApp } from '@/typings/apis/check';
import { useTitleResize } from '@/hooks';
import ErrorSettlePer from '@/views/home/components/errorSettlePer/errorSettlePer';
import { sortUncomplete, sortError, sortUnknow, sortErrorSettlementPer, sortErrorSettlementFlow, isComplete } from '@/views/home/utils/sort';
import { isDownload, downLoadError } from '@/views/home/utils/download';
import {
  M_Third_settlement_bill_status,
  M_Third_settlement_flow_status,
  E_Third_settlement_bill_status,
  E_Third_settlement_flow_status,
  M_Hummer_settlement_flow_status,
  E_Hummer_settlement_flow_status
} from '@/views/home/maps/common';
interface I_Props {
  parentRecord: I_DataSource;
  isParentExpanded: boolean;
}

const RChildTable: FC<I_Props> = ({ parentRecord, isParentExpanded }) => {
  const [childDataSource, setChildDataSource] = useState<I_ChildDataSource[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortedInfo, setSortedInfo] = useState<I_SortedInfo>({
    columnKey: '',
    order: false
  });

  const pageSize = useRef<number>(1000);

  const { titleComponent } = useTitleResize({
    offSize: 1700,
    fontSize: 14,
    iconSize: 22
  })

  const columns: any = [

    {
      title: '部门',
      key: 'department',
      render (text: unknown, record: I_ChildDataSource) {
        return (
          <div style={{ minWidth: 30 }}>
            {record.department || '-'}
          </div>
        )
      }
    },
    {
      title: (
        <div>
          {titleComponent('财务游戏备注', InfoCircleOutlined, '财务为便捷地区分游戏而填写的备注（原游戏大类）')}
        </div>
      ),
      key: 'financial_remark',
      render (text: unknown, record: I_ChildDataSource) {
        return (
          <div>
            {record.financial_remark || '-'}
          </div>
        )
      }
    },
    {
      title: (
        <div>
          {titleComponent('三方结算单原始总额（元）', InfoCircleOutlined, '用户原始充值总金额')}
        </div>
      ),
      key: 'third_settlement_bill',
      render (text: unknown, record: I_ChildDataSource) {
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
        <div>
          {titleComponent('三方流水总额（元）', InfoCircleOutlined, '渠道所有流水明细累加的总金额')}
        </div>
      ),
      key: 'third_settlement_flow',
      render (text: unknown, record: I_ChildDataSource) {
        return (
          <div style={{ minWidth: 120 }}>
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
      render (text: unknown, record: I_ChildDataSource) {
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
      sortOrder: sortedInfo.columnKey === 'error_settlement_flow' && sortedInfo.order,
      render (text: unknown, record: I_ChildDataSource) {
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
      sortOrder: sortedInfo.columnKey === 'error_settlement_per' && sortedInfo.order,
      render (text: unknown, record: I_ChildDataSource) {
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
      fixed: 'right',
      render (text: unknown, record: I_ChildDataSource) {
        return (
          <div className='ant-btn-no-padding'>
            {isComplete(record) && isDownload(record)
              ? (
                <Button type='link' onClick={() => downLoadError(record.download)}>
                  下载差错流水
                </Button>
              )
              : '-'}
          </div>
        )
      }
    }
  ];

  const getColumns = () => {
    if (parentRecord.channel_type === '直充') {
      return columns;
    }
    const newColumns = [...columns];
    newColumns.splice(1, 0, {
      title: (
        <div>
          {titleComponent('三方应用ID', InfoCircleOutlined, '三方渠道提供的，在三方后台标识应用唯一的ID')}
        </div>
      ),
      key: 'third_app_id',
      dataIndex: 'third_app_id'
    },
    {
      title: (
        <div>
          {titleComponent('三方应用名', InfoCircleOutlined, '三方渠道后台显示的游戏主体名称')}
        </div>
      ),
      key: 'third_app_name',
      dataIndex: 'third_app_name'
    })
    return newColumns;
  }

  const sortAsDefault = (a: I_ChildDataSource, b: I_ChildDataSource) => {
    if (sortUnknow(a, b) !== 0) {
      return sortUnknow(a, b);
    } else if (sortUncomplete(a, b) !== 0) {
      return sortUncomplete(a, b);
    } else if (sortErrorSettlementPer(a, b) !== 0) {
      return sortErrorSettlementPer(a, b);
    } else if (sortErrorSettlementFlow(a, b) !== 0) {
      return sortErrorSettlementFlow(a, b);
    } else {
      return sortError(a, b);
    } 
  }

  const sortAsErrorSettlementPer = (a: I_ChildDataSource, b: I_ChildDataSource) => {
    if (sortUnknow(a, b) !== 0) {
      return sortUnknow(a, b);
    } else if (sortUncomplete(a, b) !== 0) {
      return sortUncomplete(a, b);
    } else if (sortErrorSettlementPer(a, b) !== 0) {
      return sortErrorSettlementPer(a, b);
    } else if (sortErrorSettlementFlow(a, b) !== 0) {
      return sortErrorSettlementFlow(a, b);
    } else {
      return sortError(a, b);
    } 
  }

  const sortAsErrorSettlementFlow = (a: I_ChildDataSource, b: I_ChildDataSource) => {
    if (sortUnknow(a, b) !== 0) {
      return sortUnknow(a, b);
    } else if (sortUncomplete(a, b) !== 0) {
      return sortUncomplete(a, b);
    } else if (sortErrorSettlementFlow(a, b) !== 0) {
      return sortErrorSettlementFlow(a, b);
    } else if (sortErrorSettlementPer(a, b) !== 0) {
      return sortErrorSettlementPer(a, b);
    } else {
      return sortError(a, b);
    }
  }
  
  const handleChildDataSource = useCallback(() => {
    setLoading(true);
    const params: I_getChannelApp = {
      page,
      task_id: parentRecord.task_id,
      page_size: pageSize.current
    }
    // if (sortedInfo.order) {
    //   params.order_by = `${sortedInfo.columnKey} desc`
    // }
    getChannelApp(params).then((data: any) => {
      setTotal(data.page.rcount || 0);
      data.list = data.list || [];
      switch (sortedInfo.columnKey) {
      case 'error_settlement_flow':
        data.list.sort((a: I_ChildDataSource, b: I_ChildDataSource) => sortAsErrorSettlementFlow(a, b));
        break;
      case 'error_settlement_per':
        data.list.sort((a: I_ChildDataSource, b: I_ChildDataSource) => sortAsErrorSettlementPer(a, b));
        break;
      default:
        data.list.sort((a: I_ChildDataSource, b: I_ChildDataSource) => sortAsDefault(a, b));
        break;
      }
      setChildDataSource(data.list);
      setLoading(false);
    });
    // 依赖不正确，但不影响使用，时间紧先注释
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortedInfo, parentRecord.task_id])

  const changeCurrent = (page: number) => {
    setPage(page);
  }

  const handleTableChange = (pagination: TablePaginationConfig, filters: any, sorter: any) => {

    const columnKey = (sorter.order && sorter.columnKey) || '';
    const order = sorter.order || false;

    setSortedInfo({
      columnKey,
      order
    })
    changeCurrent(1);
  }

  useEffect(() => {
    if (isParentExpanded) {
      handleChildDataSource();
    }
    return () => {
      if (!isParentExpanded) {
        changeCurrent(1);
      }
    }
  }, [handleChildDataSource, isParentExpanded])

  return (
    <div className='padding-top-12'>
      <div className='overflow--auto'>
        <Table
          locale={{
            cancelSort: '',
            triggerAsc: '',
            triggerDesc: ''
          }}
          onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
          sortDirections={['descend']}
          loading={loading}
          rowKey='id'
          columns={getColumns()}
          dataSource={childDataSource}
          bordered
          size='small'
          pagination={false}
        />
        <div className='padding-all-12' flex='main:right'>
          <Pagination
            size='small'
            total={total}
            current={page}
            pageSize={pageSize.current}
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

export default RChildTable;
