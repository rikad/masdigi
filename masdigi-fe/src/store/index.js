import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: window.location.protocol + "//" + window.location.host,
    // api: 'http://localhost:3000',
    praytime_api: 'https://api.pray.zone/v2/times/this_month.json?city=',
    config: {
      version: '0',
      data: {
        name: 'loading ...',
        address: '...',
        phone: '...',
        announcement: '...',
        prayzone: 'bandung',
        praytime: [
          {
            "times": {
              "Imsak": "04:11 Dummy",
              "Sunrise": "05:33 Dummy",
              "Fajr": "04:21 Dummy",
              "Dhuhr": "11:53 Dummy",
              "Asr": "15:20 Dummy",
              "Sunset": "18:13 Dummy",
              "Maghrib": "18:23 Dummy",
              "Isha": "19:20 Dummy",
              "Midnight": "23:17 Dummy"
            },
            "date": {
              "timestamp": 1609459200,
              "gregorian": "2021-01-01",
              "hijri": "1442-05-17"
            }
          }
        ]
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
    },
    GET_PRAYTIME: async (context) => {

      let configData = context.state.config.data;
      
      //skip get praytime if praytime Month data & current month invalid
      if(configData.praytime && configData.praytime.length > 0) {
        let d = new Date();
        let currentMonth = d.getMonth();
        let dDate = new Date(configData.praytime[0].date.timestamp);
        let dMonth = dDate.getMonth();

        if(dMonth == currentMonth) {
          console.log('Praytime data still Valid')
          return false;
        }
      }

      if(configData.prayzone) {
        console.log('get Praytime')
        let { data } = await Axios.get(`${context.state.praytime_api}${configData.prayzone}`)
        if (data.code == 200) {
          context.commit('SET_PRAYTIME', data.results.datetime)
        }  
      } else {
        console.log('get Praytime failed : prayzone not set')        
      }
    },
  },
  modules: {
  }
})
