import { requestBackJson } from '@/utils/request';

export async function getDevInfo(params: { ip: string }) {
  return requestBackJson('/getDevInfo', {params});
}
