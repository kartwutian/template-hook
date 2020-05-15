import request, { URL_EXCHANGE } from '../../../../utils/request';
import { stringify } from 'qs';

function UrlExchange(url) {
  return `${requestBaseUrl}${url}`;
}

export function subsidyList(params) {
  return request('/api/subsidy/list', {
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

//撤回接口
export function subsidyRevert(params) {
  return request(`/api/subsidy/revert?${stringify(params)}`, {
    method: 'get',
  });
}

//撤回接口
export function subsidyDelete(params) {
  return request(`/api/subsidy/delete?${stringify(params)}`, {
    method: 'get',
  });
}

/**
 * 返回上传图片接口地址
 * @returns {代理请求}
 */
export function uploadPic() {
  return URL_EXCHANGE(`/common/OBSFile/uploadFile`);
}
