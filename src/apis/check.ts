import Http from '@/utils/request';
import { I_getChannelIndex, I_getChannelApp } from '@/typings/apis/check';

export const getChannelIndex = (data: I_getChannelIndex): Promise<any> => {
  return Http({
    url: '/channel/index',
    data
  });
}
export const getChannelApp = (data: I_getChannelApp): Promise<any> => {
  return Http({
    url: '/channel/app',
    data
  });
}
