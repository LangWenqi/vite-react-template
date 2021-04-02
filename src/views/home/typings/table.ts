import { E_Third_settlement_bill_status, E_Third_settlement_flow_status } from '../maps/common';
export interface I_DataSource {
  month_str: string;
  id: number;
  month: string;
  enterprise: string;
  channel_type: string;
  channel_name: string;
  third_settlement_bill: number;
  third_settlement_flow: number;
  error_settlement_flow: string;
  error_settlement_per: string;
  match_amount: number;
  third_mismatch_amount: number;
  hummer_mismatch_amount: number;
  task_id: string;
  download: string;
  third_settlement_bill_status: E_Third_settlement_bill_status;
  third_settlement_flow_status: E_Third_settlement_flow_status;
  [key: string]: any;
}
export interface I_SortedInfo {
  columnKey: string;
  order: string | boolean
}
