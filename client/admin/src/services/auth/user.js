import { stringify } from 'qs';
import request from '@/utils/request';

const ApiPrefix = '/api/v1';

export async function getList(params) {
  let url = `${ApiPrefix}/auth/users`;
  if (params) {
    url = `${url}?${stringify(params)}`;
  }
  return request(url);
}

export async function getById(id) {
  return request(`${ApiPrefix}/auth/users/${id}`);
}

export async function create(params) {
  return request(`${ApiPrefix}/auth/users`, {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request(`${ApiPrefix}/auth/users/${params.id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function resetPwd(params) {
  return request(`${ApiPrefix}/auth/users/resetpwd`, {
    method: 'PUT',
    body: params,
  });
}

export async function remove(id) {
  return request(`${ApiPrefix}/auth/users/${id}`, {
    method: 'DELETE',
  });
}
