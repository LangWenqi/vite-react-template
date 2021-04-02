import React, { useEffect } from 'react'
import { Router, LocationProvider, WindowLocation, createHistory } from '@reach/router';
import routes, { I_Route } from './routes';
import { useStores } from '@/store';
import { observer } from 'mobx-react';
import Loading from '@/components/default/loading';

export const history = createHistory(window as any);

const AuthRoute = (route: I_Route, location: WindowLocation, index: number) => {
  // if (route.noAdmin) {
  return (
    <route.component path={route.path} key={index} default={!!route.default}>
      {Array.isArray(route.children) && route.children.length > 0
        ? Routes(route.children, location)
        : null}
    </route.component>
  )
  // } else {
  //   return <Redirect from={location.pathname} key={index} to='/403' noThrow />
  // }
}

const Routes = (routes: I_Route[], location: WindowLocation) => {
  return routes.map((route: I_Route, index: number) => {
    return AuthRoute(route, location, index);
  })
}

const RouterDom = () => {
  const { commonStore } = useStores();

  useEffect(() => {
    // 路由加载之前获取数据
    commonStore.setRouterLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='height-per-100'>
      {commonStore.routerLoading 
        ? <Loading />
        : (
          <LocationProvider history={history}>
            {({ location }) => (
              <Router>
                {Routes(routes, location)}
              </Router> 
            )}
          </LocationProvider>
        )}
    </div>
  )
} 

export default observer(RouterDom);
