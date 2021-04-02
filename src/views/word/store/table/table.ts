import { ReactText } from 'react';
import { makeAutoObservable } from 'mobx';
import { I_DataSource } from '@/views/word/typings/table';

export class TableStore {
  constructor () {
    makeAutoObservable(this)
  }

  loading: boolean = false;

  setLoading (loading: boolean) {
    this.loading = loading;
  }

  expandedRowKeys: ReactText[] = [];

  setExpandedRowKeys (expandedRowKeys: ReactText[]) {
    this.expandedRowKeys = expandedRowKeys;
  }

  pageSize: number = 15;

  total: number = 100;

  setTotal (total: number) {
    this.total = total;
  }

  page: number = 1;
   
  changePage (page: number) {
    this.setExpandedRowKeys([]);
    this.page = page;
  }

  dataSource: I_DataSource[] = [];

  setDataSource (dataSource: I_DataSource[]) {
    this.dataSource = dataSource || [];
  }

  handleDataSource (param: any = {}) {
    // const params = {
    //   ...param,
    //   page: this.page
    // }
  }
 
}
