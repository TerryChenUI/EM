import { getList, getById, create, update, remove } from '@/services/auth/role';

export default {
  namespace: 'authRole',

  state: {
    list: [],
    current: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      yield put({
        type: 'save',
        payload: {
          list: response,
        },
      });
    },
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(getById, payload);
      yield put({
        type: 'updateCurrent',
        payload: response,
      });
    },
    *create({ payload, callback }, { call }) {
      const response = yield call(create, payload);
      if (response && callback) {
        callback();
      }
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(update, payload);
      if (response && callback) {
        callback();
      }
    },
    *remove({ payload, callback }, { call, put, select }) {
      const response = yield call(remove, payload);
      if (response && callback) {
        const list = yield select(state => state.authRole.list);
        let newList = [...list];
        newList = newList.filter(t => t.id !== payload);
        yield put({
          type: 'save',
          payload: {
            list: newList,
          },
        });
        callback();
      }
    },
    *resetCurrent({}, { put }) {
      yield put({
        type: 'updateCurrent',
        payload: {},
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateCurrent(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
  },
};
