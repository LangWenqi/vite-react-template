import React, { FC, useMemo } from 'react';
import { Layout, Avatar, Menu, Dropdown, Button } from 'antd';
import { observer } from 'mobx-react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useStores } from '@/store';
import IndexStyle from './styles/index.module.scss';
import classNames from 'classnames/bind';
const ClassNames = classNames.bind(IndexStyle);

const { Header } = Layout;

interface Iprops {
  userInfo?: {
    user?: {
      picture?: string;
      [key: string]: any;
    }
  }
}

const HeaderBar: FC<Iprops> = ({ userInfo = {} }) => {
  const { commonStore } = useStores();

  const handleLogout = (): void => {
   
  }
  const collapsedIcon = useMemo(() => {
    return (
      <span className='font-22'>
        {commonStore.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
    )
  }, [commonStore.collapsed])

  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <Button type='link' onClick={() => handleLogout()}>
          退出
        </Button>
      </Menu.Item>          
    </Menu>
  );

  return (
    <Header className={ClassNames('header__ant')}>
      <div flex='main:justify cross:center' className='height-per-100'>
        <div className='cursor' onClick={() => commonStore.setCollapsed(!commonStore.collapsed)} flex-box='0'>
          {collapsedIcon}
        </div>
        <Dropdown overlay={menu}>
          <div className={ClassNames('header__dropdown')}>
            <Avatar src={userInfo.user ? userInfo.user.picture : ''} />
            <span className={ClassNames('header__user-name')}>{userInfo.user ? userInfo.user.name : '--'} </span> 
          </div>
        </Dropdown>
      </div>
    </Header>
  )
}

export default observer(HeaderBar);
