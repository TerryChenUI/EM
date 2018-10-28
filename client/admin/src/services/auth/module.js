import { stringify } from 'qs';
import request from '@/utils/request';

const ApiPrefix = '/api/v1';

export async function getList(params) {
  let url = `${ApiPrefix}/auth/modules`;
  if (params) {
    url = `${url}?${stringify(params)}`;
  }
  return request(url);
}

export async function getSystem(params) {
  let url = `${ApiPrefix}/auth/modules/system`;
  if (params) {
    url = `${url}?${stringify(params)}`;
  }
  return request(url);
}

export async function getById(id) {
  return request(`${ApiPrefix}/auth/modules/${id}`);
}

export async function create(params) {
  return request(`${ApiPrefix}/auth/modules`, {
    method: 'POST',
    body: params
  });
}

export async function update(params) {
  return request(`${ApiPrefix}/auth/modules/${params.id}`, {
    method: 'PUT',
    body: params
  });
}

export async function remove(id) {
  return request(`${ApiPrefix}/auth/modules/${id}`, {
    method: 'DELETE',
  });
}
