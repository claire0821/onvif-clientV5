import { getDevByIpSegment, getDevList, getLocalIP, addDev } from './service';
import type { Reducer, Effect } from 'umi';
import type { DevListItem, SearchListItem } from './data.d';
// import Event from '@/utils/pushlish-subscribe';

export type StateType = {
  devList: DevListItem[]; // Partial<DevListItem>;// 类型转换
  localIP: []; // 本机ip段
  searchList: SearchListItem[]; // 搜索设备存放列表
  controlDev: Partial<DevListItem>;// 控制设备
};

export type ModelType = {
  namespace: string;
  state: StateType;
  // 异步
  effects: {
    fetch: Effect;
    fetchLocalIP: Effect;
    SearchDev: Effect;
    fetchAddDev: Effect;
    fetchControlDev: Effect;
  };
  // 同步
  reducers: {
    queryList: Reducer<StateType>;
    queryLocalIP: Reducer;
    querySearchDevList: Reducer<StateType>;
    addDev: Reducer;
    changeControlDev: Reducer;
  };
};

const Model: ModelType = {
  namespace: 'devManagement',
  state: {
    devList: [],
    localIP: [],
    searchList: [],
    controlDev: {},
  },

  effects: {
    // 向后台请求数据
    *fetch({ payload }, { call, put }) {
      const response = yield call(getDevList, payload);
      // 收到成功数据返回data
      if (response.code === 1) {
        yield put({
          type: 'queryList',
          payload: response.data,
        });
      }
    },
    // 本地ip段
    *fetchLocalIP({ payload }, { call, put }) {
      const response = yield call(getLocalIP, payload);
      // 收到成功数据返回data
      if (response.code === 1) {
        yield put({
          type: 'queryLocalIP',
          payload: response.data,
        });
      }
    },
    // 根据ip段搜索设备
    *SearchDev({ payload }, { call, put }) {
      const response = yield call(getDevByIpSegment, payload);
      // 收到成功数据返回data
      if (response.code === 1) {
        yield put({
          type: 'querySearchDevList',
          payload: response.data,
        });
      }
    },
    // 添加设备
    *fetchAddDev({ payload }, { call, put, take }) {
      const response = yield call(addDev, payload);
      // 添加设备成功重新加载列表
      if (response.code === 1) {
        yield put({ type: 'fetch', payload: {} }); // 触发b
        yield take('fetch/@@end'); // 直到监听到b结束才继续执行
      }
    },
    // 控制设备更改
    *fetchControlDev({ payload }, {put}) {
      console.log(payload);
      yield put({ type: 'changeControlDev', payload }); // 触发b
    }
  },

  reducers: {
    queryList(state, action) {
      return {
        ...(state as StateType),
        devList: action.payload,
      };
    },
    queryLocalIP(state, action) {
      return {
        ...(state as StateType),
        localIP: action.payload,
      };
    },
    querySearchDevList(state, action) {
      return {
        ...(state as StateType),
        searchList: action.payload,
      };
    },
    addDev(state, action) {
      return {
        ...(state as StateType),
        searchList: action.payload,
      };
    },
    changeControlDev(state,action) {
      let dev: DevListItem = {
        ip: '',
        port: -1,
        username: '',
        password: '',
        onvifAddress: '',
        mediaUrl: '',
        imagingUrl: '',
        eventsUrl: '',
        deviceUrl: '',
        ptzUrl: '',
        analyticsUrl: '',
      }
      state.devList.forEach((element: DevListItem) => {
        if(element.ip === action.payload) {
          dev = element
        }
      });
      // console.log('发布消息')
      // console.log(dev)
      // Event.trigger('changeDev', dev)// 发布
      return {
        ...(state as StateType),
        controlDev: dev,
      };
    }
  },
};

export default Model;
