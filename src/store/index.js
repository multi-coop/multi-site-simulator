import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locale: 'fr',

    partValue: 25,
    partMax: 200,
    partValueOptions: { min: 20, max: 75, ticks: 5, unit: '€' },

    benefs: 0,
    benefsOptions: { min: 0, max: 300000, ticks: 10000, unit: '€' },

    reserves: 40,
    participation: 50,
    dividendes: 10,
    reservesOptions: { min: 15, max: 75, ticks: 5, unit: '%', substract: 'participation' },
    participationOptions: { min: 25, max: 84, ticks: 5, unit: '%', substract: 'reserves' },
    dividendesOptions: { min: 0, max: 33, ticks: 5, unit: '%', substract: 'participation' },

    workTimeOptions: { min: 0, max: 100, ticks: 5, unit: '%' },

    teamMembers: [],
    emptyMember: {
      name: 'new member',
      parts: 100,
      workTime: 100
    },

    dict: {
      title: {
        fr: 'Simulateur de répartition des excédents de gestion'
      },
      code: {
        fr: 'Code source'
      },
      benefs: {
        fr: 'Excédents de gestion'
      },
      reserves: {
        fr: 'Réserves impartageables'
      },
      participation: {
        fr: 'Participation des salariés'
      },
      dividendes: {
        fr: 'Dividendes'
      },
      name: {
        fr: 'Nom'
      },
      workTime: {
        fr: 'Temps de travail'
      },
      parts: {
        fr: 'Parts sociales'
      },
      partsShort: {
        fr: 'parts'
      },
      partValue: {
        fr: "Valeur nominale d'une part sociale"
      },
      partsValue: {
        fr: "Valeur des parts de l'associé"
      },
      partsShare: {
        fr: 'Pourcentage des parts sociales (part au capital)'
      },
      addMember: {
        fr: 'Ajouter un membre'
      },
      deleteMember: {
        fr: 'Supprimer ce membre'
      }
    }
  },
  getters: {
    getReserves: (state) => {
      return state.reserves
    },
    getparticipation: (state) => {
      return state.participation
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
        participation: state.participation * state.benefs / 100,
        dividendes: state.dividendes * state.benefs / 100
      }
    },
    totals: (state) => {
      return {
        people: state.teamMembers.length,
        employees: state.teamMembers.filter(p => p.workTime).length,
        associates: state.teamMembers.filter(p => p.parts).length,
        workTimeTotal: state.teamMembers.map(m => m.workTime).reduce((prev, curr) => prev + curr, 0),
        partsTotal: state.teamMembers.map(m => m.parts).reduce((prev, curr) => prev + curr, 0)
      }
    },
    getShares: (state, getters) => (key) => {
      const totals = getters.totals
      const benefs = getters.repartBenefs
      const valRepart = state[key]
      // console.log('S > G > getShares > valRepart : ', valRepart)
      return {
        key: key,
        totals: totals,
        benefs: benefs,
        valRepart: valRepart / 100
      }
    },
    getTranslation: (state) => (key) => {
      return state.dict[key][state.locale] || key
    }
  },
  mutations: {
    setValue (state, { space, value }) {
      state[space] = value
    },
    pushMember (state, member) {
      state.teamMembers.push(member)
    },
    setMember (state, member) {
      const index = state.teamMembers.findIndex(m => m.key === member.key)
      if (index !== -1) state.teamMembers.splice(index, 1, member)
    },
    deleteMember (state, member) {
      const index = state.teamMembers.findIndex(m => m.key === member.key)
      state.teamMembers.splice(index, 1)
    }
  },
  actions: {
    populateRepart ({ state, commit, getters }, obj) {
      const keys = ['reserves', 'participation', 'dividendes']
      // console.log('S > A > populateRepart > obj : ', obj)

      // set value from user
      commit('setValue', obj)
      const options = getters.getValOptions(obj.space)
      // console.log('S > A > populateRepart > options : ', options)
      const keyToSubstract = options.substract

      // set value substract
      if (keyToSubstract) {
        const keysToCompute = [obj.space, keyToSubstract]
        const keyToAdd = keys.find(k => !keysToCompute.includes(k))
        const totalPartial = obj.value + state[keyToAdd]
        // console.log('S > A > populateRepart > totalPartial : ', totalPartial)
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
    },
    populateTeamMembers ({ state, commit }, { action, member }) {
      // console.log('\nS > A > populateTeamMembers > action : ', action)
      const rand = Math.floor(Math.random() * (100000)) + 1
      const rand2 = Math.floor(Math.random() * (100000)) + 1
      const tempKey = `member-${rand}`
      const keyMember = state.teamMembers.find(m => m.key === tempKey) ? `member-${rand2}` : tempKey
      const shadowMember = { key: keyMember, ...state.emptyMember }
      switch (action) {
        case 'add':
          // console.log('S > A > populateTeamMembers > add > shadowMember : ', shadowMember)
          commit('pushMember', shadowMember)
          break
        case 'push':
          commit('pushMember', member)
          break
        case 'update':
          // console.log('S > A > populateTeamMembers > member : ', member)
          commit('setMember', member)
          break
        case 'delete':
          commit('deleteMember', member)
          break
      }
    }
  },

  modules: {
  }
})
