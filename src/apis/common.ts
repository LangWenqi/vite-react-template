import Http from '@/utils/request';

export const getCheckFilters = (): Promise<any> => {
  return Http({
    url: '/filter/index',
    data: {}
  });
}
