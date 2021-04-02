import { Moment } from 'moment';

export interface I_ControlData {
  month: Moment | undefined;
  enterprise: string | undefined;
  channel_type: number | undefined;
  channel_short_id: number | undefined
}
