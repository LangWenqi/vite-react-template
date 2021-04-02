import { useEffect, useState } from 'react';
import { getCheckFilters } from '@/apis/common';
import { I_ChannelShort, I_ChannelType } from '@/typings/common';

export const useFilterData = () => {

  const [channelShort, setChannelShort] = useState<I_ChannelShort[]>([]);

  const [enterprises, setEnterprises] = useState<string[]>([]);

  const [channelType, setChannelType] = useState<I_ChannelType[]>([]);

  useEffect(() => {
    // getCheckFilters().then((data: { channelShort: I_ChannelShort[]; enterprises: string[]; channelType: I_ChannelType[] }) => {
    //   setChannelShort(data.channelShort || []);
    //   setEnterprises(data.enterprises || []);
    //   setChannelType(data.channelType || []);
    // })
  }, [])

  return {
    channelShort,
    enterprises,
    channelType
  }

}
