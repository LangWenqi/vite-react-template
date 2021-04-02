import { makeAutoObservable } from 'mobx';
import { I_MenuItem } from '@/typings/store/common';
export class CommonStore {
  constructor () {
    makeAutoObservable(this)
  }

  routerLoading: boolean = false;

  setRouterLoading (routerLoading: boolean) {
    this.routerLoading = routerLoading;
  }

  collapsed: boolean = true;

  setCollapsed (collapsed: boolean) {
    this.collapsed = collapsed;
  }

  menuList: I_MenuItem[] = [
    {
      icon: '',
      menu_id: 1,
      name: '菜单一',
      pid: 0,
      url: '/'
    },
    {
      icon: '',
      menu_id: 2,
      name: '菜单二',
      pid: 0,
      url: '/word'
    }
  ];

  setMenuList (menuList: I_MenuItem[]) {
    this.menuList = menuList;
  }
}
