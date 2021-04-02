import axios from 'axios';
import { getType, qs } from '@/utils/object';
import { BASE_URL } from '@/utils/variable';
import { message } from 'antd';
import { history } from '@/router';
import { E_ErrorCode } from '@/maps/errorCode';

axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error && error.response && error.response.status === E_ErrorCode.NoLogin) {
    console.log('redirect');
  }
  return Promise.reject(error);
});

interface Iparams {
  [key: string]: any;
}

interface Iconfig {
  [key: string]: any;
}
function Http ({
  url = '',
  data = {},
  method = 'get',
  type = 'json',
  fullPath = false,
  responseType = 'json',
  showMessage = true
}: Iparams) {
  const fullUrl = fullPath ? url : BASE_URL + url;
  const config: Iconfig = {
    method,
    url: fullUrl,
    responseType
  };
  config.headers = {
    'X-Requested-With': 'XMLHttpRequest'
  };
  
  if (method === 'get' || method === 'GET') {
    Object.assign(config, {
      params: data
    });
  } else {
    if (type === 'form') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      Object.assign(config, {
        data: qs.stringify(data)
      });
    } else if (type === 'json') {
      config.headers['Content-Type'] = 'application/json';
      Object.assign(config, {
        data
      });
    } else if (type === 'formData') {
      const formData = new FormData();
      Object.keys(data).forEach((key: string): void => {
        formData.append(key, data[key]);
      });
      config.headers['Content-Type'] = 'multipart/form-data';
      Object.assign(config, {
        data: formData,
        processData: false
      });
    } else if (type === 'oss') {
      config.headers['Content-Type'] = data.type;
      Object.assign(config, {
        data
      });
    }
  }
  return new Promise((resolve, reject) => {
    axios(config).then((response: any) => {
      if (getType(response) === 'object') {
        const res = response.data;
        const { code, data } = res;
        if (code === E_ErrorCode.Ok) {
          resolve(data);
          return;
        } else if (code === E_ErrorCode.NoLogin) {
          const refererUrl = res.data.refererUrl;
          window.location.href = refererUrl;
        } else if (code === E_ErrorCode.NoAllow) {
          history.navigate('/403');
        } else if (showMessage && response.message) {
          message.error({ content: response.message, key: response.message });
        }
        reject(res);
      } else {
        resolve(response);
      }
      
    }, (error) => {
      reject(error);
    }).catch((error) => {
      reject(error);
    });
  });
};
export default Http;
