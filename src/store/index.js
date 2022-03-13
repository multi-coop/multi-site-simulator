import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locale: 'fr',

    partValue: 25,
    partMax: 200,
    partValueOptions: { min: 10, max: 80, minLimit: 20, maxLimit: 75, ticks: 5, unit: '€' },

    benefs: 0,
    benefsOptions: { min: 0, max: 500000, minLimit: 0, maxLimit: false, ticks: 10000, unit: '€' },

    reserves: 40,
    participation: 50,
    dividendes: 10,
    reservesOptions: { min: 10, max: 80, minLimit: 16, maxLimit: 75, ticks: 5, unit: '%', substract: 'participation' },
    participationOptions: { min: 20, max: 90, minLimit: 25, maxLimit: 84, ticks: 5, unit: '%', substract: 'reserves' },
    dividendesOptions: { min: 0, max: 40, minLimit: 0, maxLimit: 33, ticks: 5, unit: '%', substract: 'reserves' },

    workTimeOptions: { min: 0, max: 100, minLimit: 0, maxLimit: 100, ticks: 5, unit: '%' },
    yearTimeOptions: { min: 0, max: 12, minLimit: 0, maxLimit: 12, ticks: 1, unit: 'months' },
    partsOptions: { min: 0, max: 200, minLimit: 0, maxLimit: 200, ticks: 10, unit: 'partsShort' },

    repartDefaults: {},
    repartNeedsReset: [],

    teamNeedsReset: [],
    teamMembers: [],
    teamMembersDefault: [],
    emptyMember: {
      name: 'new member',
      parts: 20,
      workTime: 80,
      yearTime: 6
    },

    dict: {
      title: {
        fr: 'Simulateur de répartition des excédents de gestion de la coopérative'
      },
      reclaim: {
        fr: 'Un widget open source codé par'
      },
      close: {
        fr: 'Fermer'
      },
      editValue: {
        fr: 'Éditer la valeur'
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
        fr: 'Participation brute aux salarié·e·s'
      },
      participationSingular: {
        fr: 'Prime de participation'
      },
      dividendes: {
        fr: 'Intérêts aux parts'
      },
      totalShares: {
        fr: 'Total de part aux bénéfices'
      },
      name: {
        fr: 'Nom'
      },
      months: {
        fr: 'mois'
      },
      yearTime: {
        fr: "Mois travaillés dans l'année"
      },
      workTime: {
        fr: 'Temps de travail (ETP)'
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
        fr: "Valeur des parts de l'associé·e"
      },
      partsShare: {
        fr: 'Pourcentage des parts sociales (part au capital)'
      },
      editMember: {
        fr: 'Éditer'
      },
      addMember: {
        fr: 'Ajouter un·e salarié·e'
      },
      deleteMember: {
        fr: 'Retirer cet·te associé·e'
      },
      reset: {
        fr: "Réinitialiser l'équipe"
      },
      resetRepart: {
        fr: 'Réinitialiser les variables'
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
        workTimeTotal: state.teamMembers.map(m => m.workTime * (m.yearTime / 12)).reduce((prev, curr) => prev + curr, 0),
        partsTotal: state.teamMembers.map(m => m.parts).reduce((prev, curr) => prev + curr, 0),
        repartTotal: state.reserves + state.participation + state.dividendes
      }
    },
    getShares: (state, getters) => (key) => {
      const totals = getters.totals
      const benefs = getters.repartBenefs
      const valRepart = state[key]
      const valOptions = state[`${key}Options`]
      // console.log('S > G > getShares > valRepart : ', valRepart)
      return {
        key: key,
        options: valOptions,
        totals: totals,
        benefs: benefs,
        valRepart: valRepart
      }
    },
    getTranslation: (state) => (key) => {
      return state.dict[key][state.locale] || key
    }
    // getMemberDefault: (state) => (keyMember) => {
    //   return state.teamMembersDefault.find(m => m.key === keyMember)
    // }
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
    },
    deleteMemberFromNeedsReset (state, keyMember) {
      const index = state.teamNeedsReset.findIndex(key => key === keyMember)
      state.teamNeedsReset.splice(index, 1)
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
    },
    saveTeamDefault ({ commit }, originalTeam) {
      commit('setValue', { space: 'teamMembersDefault', value: originalTeam })
    },
    resetTeam ({ state, commit }) {
      // console.log('S > A > resetTeam > state.teamMembersDefault : ', state.teamMembersDefault)
      const teamMembersDefault = state.teamMembersDefault.filter(t => t.isDefault)
      commit('setValue', { space: 'teamMembers', value: teamMembersDefault })
      commit('setValue', { space: 'teamNeedsReset', value: teamMembersDefault.map(m => m.key) })
      // console.log('S > A > resetTeam > state.teamNeedsReset : ', state.teamNeedsReset)
    },
    deleteMemberFromNeedsReset ({ state, commit }, keyMember) {
      // console.log('S > A > deleteMemberFromNeedsReset > keyMember : ', keyMember)
      commit('deleteMemberFromNeedsReset', keyMember)
      // console.log('S > A > deleteMemberFromNeedsReset > state.teamNeedsReset : ', state.teamNeedsReset)
    },

    saveRepartDefaults ({ commit }, defaults) {
      commit('setValue', { space: 'repartDefaults', value: defaults })
    },
    resetRepart ({ state, commit }) {
      const toReset = [
        'partValue',
        'benefs',
        'reserves',
        'participation',
        'dividendes'
      ]
      commit('setValue', { space: 'repartNeedsReset', value: toReset })
    },
    deleteRepartFromNeedsReset ({ state, commit }, keyRepart) {
      commit('deleteRepartFromNeedsReset', keyRepart)
    }
  },

  modules: {
  }
})
