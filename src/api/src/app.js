import request from '@/utils/request';

export default {
  getFoundationData(data = {}, options = {}) {
    return request({
      url: `/pingzhongdata/${data.code}.js?v=20160518155842`,
      method: 'get',
      data:{},
      options
    });
  }
};
