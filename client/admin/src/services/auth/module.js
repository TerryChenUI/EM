import { stringify } from 'qs';
import request from '@/utils/request';

const apiModule = '/auth/modules';

export async function getList(params) {
  let url = apiModule;
  if (params) {
    url = `${url}?${stringify(params)}`;
  }
  return request(url);
}

export async function getTreeList(params) {
  let url = `${apiModule}/tree`;
  if (params) {
    url = `${url}?${stringify(params)}`;
  }
  return request(url);
}

export async function getById(id) {
  return request(`${apiModule}/${id}`);
}

export async function create(params) {
  return request(apiModule, {
    method: 'POST',
    body: params
  });
}

export async function update(params) {
  return request(`${apiModule}/${params.id}`, {
    method: 'PUT',
    body: params
  });
}

export async function remove(id) {
  return request(`${apiModule}/${id}`, {
    method: 'DELETE',
  });
}
