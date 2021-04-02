import React, { FC, useState, useEffect, ReactText } from 'react';
import { Layout, Menu } from 'antd';
import { observer } from 'mobx-react';
import { MoneyCollectOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from '@reach/router';
import { useStores } from '@/store';
import IndexStyle from './styles/index.module.scss';
import classNames from 'classnames/bind';
const ClassNames = classNames.bind(IndexStyle);
const { SubMenu } = Menu;
const { Sider } = Layout;

const SideBar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { commonStore } = useStores();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname])

  useEffect(() => {
    findOpenKeys();
    // eslint-disable-next-line
  }, [])

  const changeMenuUrl = (url: string) => {
    navigate(url);
  }
  const changeSubMenu = (openKeys: ReactText[]) => {
    const len: number = openKeys.length;
    setOpenKeys(len > 0 ? [String(openKeys[len - 1])] : []);
  }
  const findOpenKeys = () => {
    const url: string = location.pathname;
    if (Array.isArray(commonStore.menuList)) {
      for (const menuItem of commonStore.menuList) {
        if (Array.isArray(menuItem.children) && menuItem.children.length > 0) {
          for (const menuChildItem of menuItem.children) {
            if (menuChildItem.url === url) {
              setOpenKeys([String(menuItem.menu_id)]);
              return;
            }
          }
        } else if (menuItem.url === url) {
          return;
        } else {
          continue;
        }
        
      }
    }
   
  }

  const menuContent = () => {
    return Array.isArray(commonStore.menuList) && commonStore.menuList.map((menuItem) => {
      if (Array.isArray(menuItem.children) && menuItem.children.length > 0) {
        return (
          <SubMenu key={menuItem.menu_id} title={menuItem.name}>
            {menuItem.children.map((menuChildItem) => {
              return <Menu.Item key={menuChildItem.url} onClick={() => changeMenuUrl(menuChildItem.url)}>{menuChildItem.name}</Menu.Item>
            })}
          </SubMenu>
        )
      }
      return <Menu.Item key={menuItem.url} onClick={() => changeMenuUrl(menuItem.url)}>{menuItem.name}</Menu.Item>
    })
  }
  return (
    <div>
      <Sider width={200} collapsed={commonStore.collapsed} className={ClassNames('sider__ant')}>
        <div className={ClassNames('sider__ant__title', 'overflow--hidden--nowrap')} flex='cross:center main:center'>
          <MoneyCollectOutlined className='font-22' /> 
          {!commonStore.collapsed && <span className='margin-left-12'>react</span>}
        </div>
        <div className={ClassNames('menu__ant', 'overflow--auto--hide-scrollbar', 'content-height')}>
          <Menu
            theme='dark' mode='inline'
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            style={{ height: '100%' }}
            onOpenChange={(openKeys: ReactText[]) => changeSubMenu(openKeys)}
          >
            {menuContent()}
          </Menu>
        </div>
      </Sider>
    </div>
  )
}

export default observer(SideBar);
