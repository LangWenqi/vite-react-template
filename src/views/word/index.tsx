import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import RTable from './components/table/table';
import RControl from './components/control/control';
// import RModal from './components/modal/modal';
import { StoreProvider } from './store';

const Word: FC<RouteComponentProps> = () => {

  return (
    <div className='content-height padding-all-16'>
      <div className='bg-white min-height-per-100'>
        <StoreProvider>
          <RControl />
          <div className='line-grey-16' />
          <RTable />
          {/* <RModal/> */}
        </StoreProvider>
      </div>
    </div>
  );
}

export default Word;
