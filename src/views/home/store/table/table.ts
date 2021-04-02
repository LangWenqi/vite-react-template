import { ReactText } from 'react';
import { makeAutoObservable } from 'mobx';
import { I_DataSource, I_SortedInfo } from '@/views/home/typings/table';
import { getChannelIndex } from '@/apis/check';
import { I_getChannelIndex } from '@/typings/apis/check';
import { I_ControlData } from '@/views/home/typings/control'
import { sortUncomplete, sortError, sortYear, sortMonth, sortErrorSettlementPer, sortErrorSettlementFlow } from '@/views/home/utils/sort';
import moment from 'moment';
export class TableStore {
  constructor () {
    makeAutoObservable(this)
  }

  loading: boolean = false;

  setLoading (loading: boolean) {
    this.loading = loading;
  }

  sortedInfo: I_SortedInfo = {
    columnKey: '',
    order: false
  }

  setSortedInfo (sortedInfo: I_SortedInfo) {
    this.sortedInfo = sortedInfo;
  }

  expandedRowKeys: ReactText[] = [];

  setExpandedRowKeys (expandedRowKeys: ReactText[]) {
    this.expandedRowKeys = expandedRowKeys;
  }

  pageSize: number = 1000;

  total: number = 0;

  setTotal (total: number) {
    this.total = total;
  }

  page: number = 1;
   
  changePage (page: number) {
    this.setExpandedRowKeys([]);
    this.page = page;
  }

  sortAsDefault (a: I_DataSource, b: I_DataSource) {
    if (sortUncomplete(a, b) !== 0) {
      return sortUncomplete(a, b);
    } else if (sortYear(a, b) !== 0) {
      return sortYear(a, b);
    } else if (sortMonth(a, b) !== 0) {
      return sortMonth(a, b);
    } else if (sortErrorSettlementPer(a, b) !== 0) {
      return sortErrorSettlementPer(a, b);
    } else if (sortErrorSettlementFlow(a, b) !== 0) {
      return sortErrorSettlementFlow(a, b);
    } else {
      return sortError(a, b);
    } 
  }

  sortAsErrorSettlementPer (a: I_DataSource, b: I_DataSource) {
    if (sortUncomplete(a, b) !== 0) {
      return sortUncomplete(a, b);
    } if (sortErrorSettlementPer(a, b) !== 0) {
      return sortErrorSettlementPer(a, b)
    } else if (sortErrorSettlementFlow(a, b) !== 0) {
      return sortErrorSettlementFlow(a, b);
    } else if (sortError(a, b) !== 0) {
      return sortError(a, b);
    } else if (sortYear(a, b) !== 0) {
      return sortYear(a, b);
    } else {
      return sortMonth(a, b);
    } 
  }

  sortAsErrorSettlementFlow (a: I_DataSource, b: I_DataSource) {
    if (sortUncomplete(a, b) !== 0) {
      return sortUncomplete(a, b);
    } if (sortErrorSettlementFlow(a, b) !== 0) {
      return sortErrorSettlementFlow(a, b);
    } else if (sortErrorSettlementPer(a, b) !== 0) {
      return sortErrorSettlementPer(a, b);
    } else if (sortError(a, b) !== 0) {
      return sortError(a, b);
    } else if (sortYear(a, b) !== 0) {
      return sortYear(a, b);
    } else {
      return sortMonth(a, b);
    } 
  }

  dataSource: I_DataSource[] = [];

  setDataSource (dataSource: I_DataSource[]) {
    switch (this.sortedInfo.columnKey) {
    case 'error_settlement_flow':
      dataSource.sort((a: I_DataSource, b: I_DataSource) => this.sortAsErrorSettlementFlow(a, b));
      break;
    case 'error_settlement_per':
      dataSource.sort((a: I_DataSource, b: I_DataSource) => this.sortAsErrorSettlementPer(a, b));
      break;
    default:
      dataSource.sort((a: I_DataSource, b: I_DataSource) => this.sortAsDefault(a, b));
      break;
    }
    this.dataSource = dataSource || [];
  }

  handleDataSource (param: I_ControlData) {
    this.setLoading(true);
    const params: I_getChannelIndex = {
      ...param,
      month: param.month ? moment(param.month).format('YYYYMM') : param.month,
      page: this.page,
      page_size: this.pageSize
    }
    // if (this.sortedInfo.order) {
    //   params.order_by = `${this.sortedInfo.columnKey} desc`
    // }
    getChannelIndex(params).then((data: any) => {
      this.setTotal(data.page.rcount || 0);
      this.setDataSource(data.list || []);
      this.setLoading(false);
    })
  }
 
}
