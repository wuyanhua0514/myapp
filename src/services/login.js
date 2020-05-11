import request from '@/utils/request';

export async function fakeAccountLogin() {
  return request('/permission/me', {
    method: 'GET',
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
