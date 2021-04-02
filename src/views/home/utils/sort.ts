
import { E_Third_settlement_flow_status, E_Hummer_settlement_flow_status, UnKnowThirdAppId } from '@/views/home/maps/common';
import { sortNumber } from '@/utils';
import { I_DataSource } from '@/views/home/typings/table';
import { I_ChildDataSource } from '@/views/home/typings/childTable';
import { T_DataSource } from '@/views/home/typings/common';

export const isComplete = (record: T_DataSource) => {
  return record.third_settlement_flow_status === E_Third_settlement_flow_status.complete &&
  record.hummer_settlement_flow_status === E_Hummer_settlement_flow_status.complete
}

export const isError = (record: T_DataSource) => {
  return !isNaN(Number(record.error_settlement_per)) && (Number(record.error_settlement_flow) !== 0 || record.third_mismatch_amount !== 0 || record.hummer_mismatch_amount !== 0)
}

export const sortUncomplete = (a: T_DataSource, b: T_DataSource) => {
  if (!isComplete(a) && isComplete(b)) {
    return 1;
  } else if (!isComplete(b) && isComplete(a)) {
    return -1;
  } else {
    return 0;
  }
}

export const sortUnknow = (a: I_ChildDataSource, b: I_ChildDataSource) => {
  if (Number(a.pc_app_id) === UnKnowThirdAppId || Number(a.third_app_id) === UnKnowThirdAppId) {
    return 1;
  } else if (Number(b.pc_app_id) === UnKnowThirdAppId || Number(b.third_app_id) === UnKnowThirdAppId) {
    return -1;
  } else {
    return 0;
  }
}

export const sortError = (a: T_DataSource, b: T_DataSource) => {
  if (isError(a) && !isError(b)) {
    return -1;
  } else if (isError(b) && !isError(a)) {
    return 1;
  } else {
    return 0;
  }
}

export const sortErrorSettlementPer = (a: T_DataSource, b: T_DataSource) => {
  return sortNumber(b.error_settlement_per) - sortNumber(a.error_settlement_per);
}

export const sortErrorSettlementFlow = (a: T_DataSource, b: T_DataSource) => {
  return sortNumber(b.error_settlement_flow) - sortNumber(a.error_settlement_flow);
}

export const sortYear = (a: I_DataSource, b: I_DataSource) => {
  return new Date(b.month_str).getFullYear() - new Date(a.month_str).getFullYear();
}

export const sortMonth = (a: I_DataSource, b: I_DataSource) => {
  return new Date(b.month_str).getMonth() - new Date(a.month_str).getMonth();
}
