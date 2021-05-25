import {getPTZConfig} from './service'
import type {PTZConfigurationItem} from './data'
import type {MediaProfilesItem} from '../media-info/data'
import type { Reducer, Effect } from 'umi';

export type StateType = {
    // url: string;
    // profiles: MediaProfilesItem[]
    info: Partial<PTZConfigurationItem>;
}

export type ModelType = {
    namespace: string;
    state: StateType;
    effects: {
        fetchPTZInfo: Effect;
    };
    reducers: {
        queryPTZInfo: Reducer;
    };
}

const Model: ModelType = {
    namespace: 'ptzInfo',
    state: {
        // url: '',
        // profiles: [],
        info: {},
    },
    effects: {
        *fetchPTZInfo({payload},{call,put}) {
            const res = yield call(getPTZConfig, payload)
            if(res.code === 1) {
                yield put({
                    type: 'queryPTZInfo',
                    payload: res.data.PTZConfiguration,
                })
            }
        }
    },
    reducers: {
        queryPTZInfo(state, action) {
            return {
                ...(state as StateType),
                info: action.payload
            };
        }
    }
}

export default Model