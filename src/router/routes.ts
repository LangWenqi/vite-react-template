
import React from 'react'
import { RouteComponentProps } from '@reach/router';
import lazy from '@/router/asyncPage';
import NotFound from '@/components/default/notFound';
import NotAllow from '@/components/default/notAllow';
const Index = lazy(() => import('@/views/index/index'));
const Home = lazy(() => import('@/views/home/index'));
const Word = lazy(() => import('@/views/word/index'));

export interface I_Route {
  component: React.FC<RouteComponentProps<any>>;
  path: string;
  noAdmin?: boolean;
  default?: boolean;
  children?: I_Route[]
}

const routes: I_Route[] = [
  {
    component: Index,
    path: '/',
    children: [
      {
        component: Home,
        path: '/'
      },
      {
        component: Word,
        path: 'word'
      },
      {
        component: NotFound,
        path: '/404',
        noAdmin: true,
        default: true
      }
    ]
  },
  {
    component: NotAllow,
    noAdmin: true,
    path: '/403'
  },
  {
    component: NotFound,
    path: '/404',
    noAdmin: true,
    default: true
  }
]

export default routes;
