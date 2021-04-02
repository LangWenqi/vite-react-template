import { makeAutoObservable } from 'mobx';
import { I_ControlData } from '@/views/word/typings/control';
const defaultControlData: I_ControlData = {
  keyword: ''
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
}
