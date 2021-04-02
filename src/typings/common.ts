import { E_ChannelType } from '@/maps/common';
export interface ImenuInterface {
  name: string;
  module: string;
  routes: Array<{
    name: string;
    module: string;
    select: string;
    path: string;
  }>
}
export interface I_ChannelShort {
  id: number;
  name: string;
  type: E_ChannelType;
}

export interface I_ChannelType {
  id: E_ChannelType;
  name: string;
}
