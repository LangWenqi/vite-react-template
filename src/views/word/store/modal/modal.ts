import { makeAutoObservable } from 'mobx';
import { I_FormData } from './types';
export class ModalStore {
  constructor () {
    makeAutoObservable(this)
  }

  visible: boolean = false;

  setVisible (visible: boolean) {
    this.visible = visible;
  }

  fromData: I_FormData = {
    name: undefined
  };

  setFormData (fromData: I_FormData) {
    this.fromData = fromData;
  }
  
  setFormDataKey (key: keyof I_FormData, value: any) {
    this.fromData[key] = value;
  }
}
