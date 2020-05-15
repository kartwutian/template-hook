import request from '../../../utils/request';

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

export function getList(params) {
  return request('/api/merchant/list', {
    method: 'post',
    data: params,
  });
}

export function getdetailInfo(params) {
  return request('/api/subsidyStock/detail', {
    method: 'post',
    data: params,
  });
}

export function getTypeList(params) {
  return request('/api/subsidy/getList', {
    method: 'post',
    data: params,
  });
}

export function add(params) {
  return request('/api/merchant/add', {
    method: 'post',
    data: params,
  });
}

export function edit(params) {
  return request('/api/merchant/edit ', {
    method: 'post',
    data: params,
  });
}
export function reduceOrAdd(params) {
  return request('/api/subsidyStock/reduceOrAdd  ', {
    method: 'post',
    data: params,
  });
}

export function getDetail(params) {
  return request('/api/merchant/detail', {
    method: 'post',
    data: params,
  });
}
