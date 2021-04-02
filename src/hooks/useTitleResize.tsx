import React, { useState, ReactNode, ForwardRefExoticComponent } from 'react';
import { Tooltip } from 'antd';
import { useStores } from '@/store';
import { useResize } from '@/hooks';

export const useTitleResize = ({ offSize, fontSize, iconSize } : { offSize: number; fontSize: number; iconSize: number; }) => {
  const { commonStore } = useStores();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useResize(() => {
    setInnerWidth(window.innerWidth);
  })

  const titleComponent = (title: string, IconFont?: ForwardRefExoticComponent<any> | null, tooltip?: ReactNode | null) => {
    const length = title.length;
    const iconWidth = IconFont ? iconSize : 0;
    const offWidth = innerWidth - (commonStore.collapsed ? 0 : 120);
    const minWidth = fontSize * (offWidth > offSize ? length : Math.ceil(length / 2)) + iconWidth;
    const InnerContent = () => {
      if (offWidth > offSize) {
        return <span>{title}</span>
      } else {
        return (
          <div>
            <div>{title.slice(0, Math.ceil(length / 2))}</div>
            <div>{title.slice(-Math.floor(length / 2))}</div>
          </div>
        )
      }
    }
    const OuterContent = () => {
      return (
        <div flex='cross:center'>
          {InnerContent()}
          {IconFont ? <IconFont className='color-black-9 padding-left-4' /> : null}
        </div>
      )
    }
    return (
      <div style={{ minWidth }}>
        {tooltip
          ? (
            <Tooltip placement='top' title={tooltip}>
              {OuterContent()}
            </Tooltip>
          ) 
          : (
            <>
              {OuterContent()}
            </>
          )}
      </div>
    )
  }
  return { titleComponent }
}
