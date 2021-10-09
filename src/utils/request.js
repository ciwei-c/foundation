import axios from 'axios';
import { Message } from 'element-ui';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  request => {
    return request;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code.
   */
  response => {
    const res = response.data;
    return res;
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

const hasKey = v => {
  if (v === 0) return true;
  return !!v;
};

const getRequestObj = params => {
  if (!params.url) {
    return { error: '请求失败，请求url为空！' };
  }
  if (Array.isArray(params.data)) {
    return {
      url: params.url,
      data: params.data
    };
  }
  let url = params.url;
  let { ...data } = params.data;
  let matchList = url.match(/:([A-Za-z0-9_]*)+?/g);
  let error = '';
  if (matchList && matchList.length > 0) {
    matchList.forEach(query => {
      let key = query.replace(':', '');
      if (data && hasKey(data[key])) {
        url = url.replace(query, data[key]);
        delete data[key];
      } else {
        error = `请求失败，请求参数${key}不存在！`;
      }
    });
    if (error) {
      return { error: error };
    }
  }
  return {
    url: url,
    data: data
  };
};

const getRequest = params => {
  let requestObj = getRequestObj(params);
  if (requestObj.error) {
    return Promise.reject(requestObj.error);
  }
  return service({
    url: requestObj.url,
    method: 'get',
    params: requestObj.data
  });
};

const otherRequest = params => {
  let requestObj = getRequestObj(params);
  if (requestObj.error) {
    return Promise.reject(requestObj.error);
  }
  let data = {};
  if (params.responseType) data.responseType = params.responseType;
  if (params.type) data.type = params.type;
  let queryData = Object.assign(data, {
    url: requestObj.url,
    method: params.method,
    data: requestObj.data
  });
  return service(queryData);
};
const upload = params => {
  if (!params.url) {
    return { error: '请求失败，请求url为空！' };
  }
  return service({
    url: params.url,
    method: params.method,
    data: params.data
  });
};
const request = params => {
  if (params.upload) {
    return upload(params);
  }
  if (params.method === 'get') {
    return getRequest(params);
  } else {
    return otherRequest(params);
  }
};

export default request;
