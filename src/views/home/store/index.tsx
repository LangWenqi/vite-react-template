import React, { FC, createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react';
import { TableStore } from './table/table';
import { ControlStore } from './control/control';
import { ModalStore } from './modal/modal';

interface I_PageStore {
  tableStore: TableStore;
  controlStore: ControlStore;
  modalStore: ModalStore;
}

const createStore = () => {
  return {
    tableStore: new TableStore(),
    controlStore: new ControlStore(),
    modalStore: new ModalStore()
  }
}

const storeContext = createContext<I_PageStore | null>(import.meta.env.NODE_ENV === 'production' ? null : createStore());

export const StoreProvider: FC = ({ children }) => {
  const store = useLocalObservable(createStore)
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const usePageStores = () => {
  const store = useContext(storeContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
