import React, { FC } from 'react';
import { Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { I_ErrorSettlePer_Record } from './types';
import { moneyFormat, fentoYuan } from '@/utils';
interface I_Props {
  record: I_ErrorSettlePer_Record;
}

const ErrorSettlePer: FC<I_Props> = ({ record }) => {

  const isError = (record: I_ErrorSettlePer_Record) => {
    return Number(record.error_settlement_flow) !== 0 || record.third_mismatch_amount !== 0 || record.hummer_mismatch_amount !== 0;
  }
  
  return (
    <span>
      {!isNaN(Number(record.error_settlement_per)) 
        ? (
          <span>
            <span className={isError(record) ? 'color-red' : ''}>
              {`${fentoYuan(record.error_settlement_per)}%`}
            </span>
            {isError(record) && (
              <Tooltip
                placement='topLeft' title={(
                  <div>
                    <div>成功匹配订单金额：{moneyFormat(fentoYuan(record.match_amount))}元</div>
                    <div>内匹外失败金额：{moneyFormat(fentoYuan(record.hummer_mismatch_amount))}元</div>
                    <div>外匹内失败金额：{moneyFormat(fentoYuan(record.third_mismatch_amount))}元</div>
                  </div>
                )}
              >
                <ExclamationCircleOutlined className='color-red margin-left-4' />
              </Tooltip>
            )}
          </span>)
        : <span className={isError(record) ? 'color-red' : ''}>{record.error_settlement_per}</span>}
    </span>
  )
}

export default ErrorSettlePer;
