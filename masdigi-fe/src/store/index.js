import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // api: window.location.protocol + "//" + window.location.host,
    api: 'http://localhost:8000',
    config: {
      version: '0',
      data: {
        name: '...',
        address: '...',
        phone: '...',
        announcement: '...',
        prayzone: 'bandung',
        differenceSelectedToSytemTimestamp: 0,
        praytime: {
          Imsak: "04:11",
          Fajr: "04:21",
          Syuruq: "05:33",
          Dhuhr: "12:11",
          Asr: "15:20",
          Maghrib: "18:23",
          Isha: "19:20"
        }
      }
    }
  },
  mutations: {
    SET_CONFIG: (state, payload) => {
      if (payload.version > state.config.version) {
        state.config = payload
      }
    },
    SET_ANNOUNCEMENT: (state, payload) => {
      state.config.data.announcement = payload
    },
    SET_UMUM: (state, payload) => {
      state.config.data.name = payload.name
      state.config.data.address = payload.address
      state.config.data.phone = payload.phone
      state.config.data.prayzone = payload.prayzone
    },
    SET_PRAYTIME: (state, payload) => {
      state.config.data.praytime = payload
    },
    SET_DIFFERENCE: (state, payload) => {
      state.config.data.differenceSelectedToSytemTimestamp = payload
    }
  },
  actions: {
    GET_CONFIG: async (context) => {
      try {
        let { data } = await Axios.get(context.state.api + '/read')
        context.commit('SET_CONFIG', data)
      } catch (error) {
        console.log('Failed get config : Local API DOWN ...')
      }
    },
    SAVE_CONFIG: async (context) => {
      try {
        await Axios.post(`${context.state.api}/write`, { config: context.state.config.data })        
      } catch (error) {
        console.log('Failed save config : Local API DOWN ...')
      }
    }
  },
  modules: {
  }
})
