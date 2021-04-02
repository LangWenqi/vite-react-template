import { E_Third_settlement_bill_status, E_Third_settlement_flow_status } from '../maps/common';
export interface I_ChildDataSource {
  id: number;
  task_id: string;
  pc_app_id: number;
  pc_app_name: string;
  third_app_id: string;
  third_app_name: string;
  third_settlement_bill: number;
  third_settlement_flow: number;
  hummer_settlement_flow: number;
  error_settlement_flow: string;
  error_settlement_per: string;
  match_amount: number;
  third_mismatch_amount: number;
  hummer_mismatch_amount: number;
  third_settlement_bill_status: E_Third_settlement_bill_status;
  third_settlement_flow_status: E_Third_settlement_flow_status;
  download: string;
  [key: string]: any;
}
