import request, { URL_EXCHANGE } from '../../../../utils/request';
import { stringify } from 'qs';
/**
 * 获取审核列表
 * @param {*} params
 */
export function getMerchantlist(params) {
  return request('/api/merchant/list', {
    method: 'post',
    data: params,
  });
}

/**
 * 审核接口
 * @param {*} params
 */
export function subsidyAudit(params) {
  return request('/api/subsidy/audit', {
    method: 'post',
    data: params,
  });
}

/**
 * 校验发票
 * @param {*} params
 */
export function veryfyVax(params) {
  return request(`/api/subsidy/veryfyVax?${stringify(params)}`, {
    method: 'get',
  });
}

/**
 * 1:导出购置税发票（待审核） 2 ：导出补贴名单
 * @param {*} parmas
 */
export function exportUrl(parmas) {
  return URL_EXCHANGE(`/api/subsidy/export?${stringify(parmas)}`);
}
