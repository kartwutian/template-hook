import request from '../../../../utils/request';
import { stringify } from 'qs';

export function getDemo(params) {
  return request(
    '/api/ftts/user/login',
    {
      method: 'GET',
      data: params,
    },
    false,
  );
}

export function postTest(params) {
  return request('/app/ajaxLogout', {
    method: 'post',
    data: params,
  });
}

// 获取详情
export function getDetail(params) {
  return request(`/api/subsidy/detail?${stringify(params)}`, {
    method: 'GET',
  });
}
