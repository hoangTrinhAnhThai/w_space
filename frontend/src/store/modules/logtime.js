import http from '../../service/api.js';
const state = {
    timeStart: '',
    realtime: '',
    timeStop: '',
    logtimeArray: []
};


const getters = {
    timeStart(state) {
        return state.timeStart
    },
    realtime(state) {
        return state.realtime
    },
    timeStop(state) {
        return state.timeStop
    },
    logtimeArray(state) {
        return state.logtimeArray
    }
};
const mutations = {
    logMess() {
        console.log('success');
    },
    setStartTime(state, data) {
        state.timeStart = data
    },
    setRealTime(state, data) {
        state.realtime = data
    },
    setStopTime(state, data) {
        state.timeStop = data
    },
    setLogtimeArray(state, data) {
        state.logtimeArray = data
    }
};

const actions = {
    addStartTime({ dispatch }, params) {
        http.post('logtime', params).then(() => {
            dispatch('getAllLogtime')
        })
    },
    addRealTime({ commit }, params) {
        commit('setRealTime', params)
    },
    addStopTime({ commit }, params) {
        commit('setStopTime', params)
        console.log('stop', params);
    },
    getAllLogtime({commit}) {
        http.get('logtime').then((result) => {
            console.log('logtime',result.data.data);
        commit('setLogtimeArray', result.data.data)

        })
    },
    deteleLogtime({dispatch}, params) {
        http.delete(`logtime/${params}`).then(() => {
            dispatch('getAllLogtime')
        })
    }
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};