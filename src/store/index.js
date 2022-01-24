import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: 'test value from store',
    partValue: 25,
    minBenefs: 40000,
    reserves: 40,
    interesment: 50,
    dividendes: 10,
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
    populateValue ({ commit }, obj) {
      commit('setValue', obj)
    }
  },

  modules: {
  }
})
