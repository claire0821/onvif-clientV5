import { requestBackJson } from '@/utils/request';

export async function getMediaProfiles(params: {ip: string}) {
  return requestBackJson('/getMediaProfiles', {params});
}

export async function getMediaInfo(params: {ip: string, profile: string}) {
  return requestBackJson('/getMediaInfo', {params});
}

export async function getStreamUri(params: {ip: string, profileToken: string}) {
  return requestBackJson('/getStreamUri', {params});
}