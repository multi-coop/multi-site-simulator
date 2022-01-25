import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: 'test value from store',
    partValue: 25,

    benefsOptions: { min: 40000, max: 300000, ticks: 10000, unit: '€' },

    reserves: 40,
    interesment: 50,
    dividendes: 10,
    reservesOptions: { min: 15, max: 75, ticks: 5, unit: '%', substract: 'interesment' },
    interesmentOptions: { min: 25, max: 84, ticks: 5, unit: '%', substract: 'reserves' },
    dividendesOptions: { min: 0, max: 33, ticks: 5, unit: '%', substract: 'interesment' },

    benefs: 0,
    members: [],
    emptyMember: {
      name: 'new member',
      parts: 100,
      workTime: 1
    }
  },
  getters: {
    getReserves: (state) => {
      return state.reserves
    },
    getInteresment: (state) => {
      return state.interesment
    },
    getDividendes: (state) => {
      return state.dividendes
    },
    getKeyVal: (state) => (key) => {
      return state[key]
    },
    getValOptions: (state) => (key) => {
      return state[`${key}Options`]
    },
    repartBenefs: (state) => {
      return {
        reserves: state.reserves * state.benefs / 100,
        interesment: state.interesment * state.benefs / 100,
        dividendes: state.dividendes * state.benefs / 100
      }
    },
    totals: (state) => {
      return {
        people: state.team.length,
        employees: state.team.filter(p => p.workTime).length,
        associates: state.team.filter(p => p.parts).length,
        workTimeTotal: state.team.map(m => m.workTime).reduce((prev, curr) => prev + curr, 0),
        partsTotal: state.team.map(m => m.parts).reduce((prev, curr) => prev + curr, 0)
      }
    }
  },
  mutations: {
    setValue (state, { space, value }) {
      state[space] = value
    }
  },
  actions: {
    populateRepart ({ state, commit, getters }, obj) {
      const keys = ['reserves', 'interesment', 'dividendes']
      console.log('S > A > populateRepart > obj : ', obj)

      // set vallue from user
      commit('setValue', obj)
      const options = getters.getValOptions(obj.space)
      console.log('S > A > populateRepart > options : ', options)
      const keyToSubstract = options.substract

      // set value substract
      if (keyToSubstract) {
        const keysToCompute = [obj.space, keyToSubstract]
        const keyToAdd = keys.find(k => !keysToCompute.includes(k))
        const totalPartial = obj.value + state[keyToAdd]
        console.log('S > A > populateRepart > totalPartial : ', totalPartial)
        const subval = 100 - totalPartial
        const objToSet = {
          space: keyToSubstract,
          value: subval
        }
        commit('setValue', objToSet)
      }
    },
    populateValue ({ commit }, obj) {
      commit('setValue', obj)
    }
  },

  modules: {
  }
})
