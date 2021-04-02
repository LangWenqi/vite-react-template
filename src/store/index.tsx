import React, { FC, useContext, createContext } from 'react';
import { useLocalObservable } from 'mobx-react';
import { CommonStore } from './common/common';

interface I_Store {
  commonStore: CommonStore
}

export const store = {
  commonStore: new CommonStore()
}

const storeContext = createContext<I_Store>(store);

export const StoreProvider: FC = ({ children }) => {
  const localStore = useLocalObservable(() => store);
  return <storeContext.Provider value={localStore}>{children}</storeContext.Provider>
}

export const useStores = () => {
  const store = useContext(storeContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
