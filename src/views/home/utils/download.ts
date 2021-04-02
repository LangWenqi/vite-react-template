import { saveAs } from 'file-saver';
import { T_DataSource } from '@/views/home/typings/common';
import { UnKnowThirdAppId } from '@/views/home/maps/common';

export const isDownload = (record: T_DataSource) => {
  return Number(record.third_app_id) !== UnKnowThirdAppId && !isNaN(Number(record.error_settlement_flow)) && (Number(record.error_settlement_flow) !== 0 || record.third_mismatch_amount !== 0 || record.hummer_mismatch_amount !== 0); 
}

export const downLoadError = (url: string) => {
  saveAs(url);
  
}
