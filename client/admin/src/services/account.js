import request from '@/utils/request';

const apiModule = '/account';

export async function queryCurrent() {
  return request(`${apiModule}/currentuser`, {
    method: 'GET'
  });
}

export async function queryMenu() {
  return request(`${apiModule}/menu`, {
    method: 'GET'
  });
}

export async function updatePassword(params) {
  return request(`${apiModule}/updatepassword`, {
    method: 'PUT',
    body: params
  });
}

export async function login(params) {
  return request(`${apiModule}/login`, {
    method: 'POST',
    body: params
  });
}

export async function logout() {
  return request(`${apiModule}/logout`, {
    method: 'post'
  });
}
