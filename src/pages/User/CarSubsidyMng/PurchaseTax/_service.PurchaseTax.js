import request, { URL_EXCHANGE } from '../../../../utils/request';
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

//新增增值税
export function subsidyAddVax(params) {
  return request('/api/subsidy/addVax', {
    method: 'post',
    data: params,
  });
}

//详情
export function subsidyDetail(params) {
  return request(`/api/subsidy/detail?applyItemId=${params}`, {
    method: 'get',
  });
}

//编辑
export function subsidyUpdate(params) {
  return request('api/subsidy/update', {
    method: 'post',
    data: params,
  });
}

/**
 * 返回上传图片接口地址
 * @returns {代理请求}
 */
export function uploadPic() {
  return URL_EXCHANGE(`/common/OBSFile/uploadFile`);
}
