import type {DevInfoItemDataType} from './data'
import type { Reducer, Effect } from 'umi';
import {getDevInfo} from './service'

export type StateType = {
    devInfo: Partial<DevInfoItemDataType>;
}

export type ModelType = {
    namespace: string;
    state: StateType;
    effects: {
        fetchDevInfo: Effect
    };
    reducers: {
        queryDevInfo: Reducer
    };
};

const Model: ModelType = {
    namespace: 'deviceInfo',
    state: {
        devInfo: {}
    },
    effects: {
        *fetchDevInfo({payload},{call,put}) {
            const response = yield call(getDevInfo,payload);
            if(response.code === 1) {
                yield put({
                    type: 'queryDevInfo',
                    payload: response.data,
                });
            }
        },
    },
    reducers: {
        queryDevInfo(state, action) {
            return {
                ...(state as StateType),
                devInfo: action.payload,
            };
        }
    }
}

export default Model