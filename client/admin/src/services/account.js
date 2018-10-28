import request from '@/utils/request';

const ApiPrefix = '/api/v1';

export async function queryCurrent() {
  return request(`${ApiPrefix}/account/currentuser`, {
    method: 'GET'
  });
}

export async function queryMenu() {
  return request(`${ApiPrefix}/account/menu`, {
    method: 'GET'
  });
}

export async function updatePassword(params) {
  return request(`${ApiPrefix}/account/updatepassword`, {
    method: 'PUT',
    body: params
  });
}

export async function login(params) {
  return request(`${ApiPrefix}/account/login`, {
    method: 'POST',
    body: params
  });
}

export async function logout() {
  return request(`${ApiPrefix}/account/logout`, {
    method: 'post'
  });
}
