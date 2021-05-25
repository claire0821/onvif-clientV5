import {getMediaProfiles, getMediaInfo, getStreamUri} from './service'
import type {MediaProfilesItem, MediaInfoDataType} from './data'
import type { Reducer, Effect } from 'umi';

export type StateType = {
    url: string;
    profiles: MediaProfilesItem[]
    info: Partial<MediaInfoDataType>
    streamUri: string
}

export type ModelType = {
    namespace: string;
    state: StateType;
    effects:  {
      fetchMediaURL: Effect;
      fetchMediaProfiles: Effect;
      fetchMediaInfo: Effect;
      fetchStreamUri: Effect;
    };
    reducers: {
        changeMediaURL: Reducer;
        queryMediaProfiles: Reducer;
        queryMediaInfo: Reducer;
        queryStreamUri: Reducer;
    };
}

const Model: ModelType = {
    namespace: 'mediaInfo',
    state: {
        url: '',
        profiles: [],
        info: {},
        streamUri: '',
    },

    effects: {
        *fetchMediaURL({payload}, {put}) {
            yield put({
                type: 'changeMediaURL',
                payload,
            });
        },
        *fetchMediaProfiles({payload},{call,put}) {
            const response = yield call(getMediaProfiles, payload);
            // 收到成功数据返回data
            if (response.code === 1) {
              yield put({
                type: 'queryMediaProfiles',
                payload: response.data,
              });
            }
        },
        *fetchMediaInfo({payload}, {call,put}) {
            const response = yield call(getMediaInfo, payload);
            // 收到成功数据返回data
            if (response.code === 1) {
              yield put({
                type: 'queryMediaInfo',
                payload: response.data,
              });
            //   const d: Partial<MediaInfoDataType> = response.data
            //   console.log(d)
            }
        },
        *fetchStreamUri({payload},{call, put}) {
            const response = yield call(getStreamUri, payload)
            console.log(response)
            if(response.code === 1) {
                yield put({
                    type: 'queryStreamUri',
                    payload: response.data
                })
            }
        }
    },
    reducers: {
        changeMediaURL(state, action) {
            return {
                ...(state as StateType),
                url: action.payload,
              };
        },
        queryMediaProfiles(state, action) {
            return {
                ...(state as StateType),
                profiles: action.payload,
              };
        },
        queryMediaInfo(state, action) {
            return {
                ...(state as StateType),
                info: action.payload,
              };
        },
        queryStreamUri(state, action) {
            return {
                ...(state as StateType),
                streamUri: action.payload
            }
        }
    }
}

export default Model