import { stringify } from 'qs';
import request from '@/utils/request';

const ApiPrefix = '/api/v1';

export async function getList(params) {
  let url = `${ApiPrefix}/articles`;
  if (params) {
    url = `${url}?${stringify(params)}`;
  }
  return request(url);
}

export async function getById(id) {
  return request(`${ApiPrefix}/articles/${id}`);
}

export async function create(params) {
  return request(`${ApiPrefix}/articles`, {
    method: 'POST',
    body: params
  });
}

export async function update(params) {
  return request(`${ApiPrefix}/articles/${params.id}`, {
    method: 'PUT',
    body: params
  });
}

export async function remove(id) {
  return request(`${ApiPrefix}/articles/${id}`, {
    method: 'DELETE',
  });
}
