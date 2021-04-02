import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

const asyncComponent = (importComponent: () => Promise<{ default: FC<RouteComponentProps<any>>}>) => {
  
  const AsyncComponent = (props: any) => {

    const [C, setC] = useState<FC<RouteComponentProps<any>> | null>(null);
  
    const RouteInit = async () => {
      const { default: component }: { default: FC<RouteComponentProps<any>> } = await importComponent();
      setC(() => component);
    };
  
    useEffect(() => {
      RouteInit();
    }, []);
  
    return (
      <>
        {(C ? <C {...props} /> : null)}
      </>
    )

  }
  return AsyncComponent;
 
}

export default asyncComponent;
