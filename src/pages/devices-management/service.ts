import { requestBackJson } from '@/utils/request';

export async function getDevList() {
  return requestBackJson('/getDevList', {});
}

export async function getLocalIP() {
  return requestBackJson('/getLocalIP', {});
}

export async function getDevByIpSegment(params: { ipSegment: string }) {
  return requestBackJson('/getDevByIpSegment', { params });
}

export async function addDev(params: { address: string; username: string; password: string }) {
  return requestBackJson('/addDev', { params });
}
