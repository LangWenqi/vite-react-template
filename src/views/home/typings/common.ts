import { I_DataSource } from './table';
import { I_ChildDataSource } from './childTable';

export type T_DataSource = I_DataSource | I_ChildDataSource;
