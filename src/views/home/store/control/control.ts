import { makeAutoObservable } from 'mobx';
import { I_ControlData } from '@/views/home/typings/control';
const defaultControlData: I_ControlData = {
  month: undefined,
  enterprise: undefined,
  channel_type: undefined,
  channel_short_id: undefined
}
export class ControlStore {
  constructor () {
    makeAutoObservable(this)
  }

  controlData: I_ControlData = { ...defaultControlData };

  setControlData (controlData: I_ControlData) {
    this.controlData = controlData;
  }
  
  setControlDataKey (key: keyof I_ControlData, value: any) {
    this.controlData[key] = value;
  }

  resetControlData () {
    this.controlData = { ...defaultControlData };
  }
}
