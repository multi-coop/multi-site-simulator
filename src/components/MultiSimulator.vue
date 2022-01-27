<template>
  <div class="container">
    <div
      class="content"
      >
      <!-- DEBUG -->
      <div
        v-if="false"
        class="columns is-multiline"
        >
        <div class="column">
          <p>
            benefsEntreprise :
            <code>{{ benefsEntreprise }}</code>
          </p>
          <p>
            reservesEntreprise :
            <code>{{ reservesEntreprise }}</code>
          </p>
          <p>
            participationEntreprise :
            <code>{{ participationEntreprise }}</code>
          </p>
          <p>
            dividendesEntreprise :
            <code>{{ dividendesEntreprise }}</code>
          </p>
        </div>
        <div class="column">
          <p>
            repartBenefs :<br>
            <code><pre>{{ repartBenefs }}</pre></code>
          </p>
        </div>
        <div class="column">
          <p>
            totals :<br>
            <code><pre>{{ totals }}</pre></code>
          </p>
        </div>
        <div class="column">
          <p>
            teamMembers :<br>
            <code><pre>{{ teamMembers }}</pre></code>
          </p>
        </div>
      </div>
    </div>

    <!-- DEBUG ICON -->
    <div class="columns">
      <div class="column is-2 has-text-centered">
        <b-icon
          icon="calculator"
        />
      </div>
      <div class="column is-8 has-text-centered">
        <p class="title mx-5">
          <span>
            {{ t('title') }}
          </span>
        </p>
      </div>
      <div class="column is-2 has-text-centered">
        <b-button
          icon-left="github"
          tag="a"
          href="https://github.com/multi-coop/multi-site-simulator"
          outlined
          size="is-small"
          >
          {{ t('code') }}
        </b-button>
      </div>
    </div>

    <!-- VALUES -->
    <div class="section">

      <div class="columns is-8 is-multiline mb-6">

        <!-- benefs -->
        <div class="column is-half">
          <ValueSliderMulti
            :keyVal="'benefs'"
            :val="benefsEntreprise"
          />
          <strong class="has-text-primary">
            {{ getVal('benefs').toLocaleString() }} €
          </strong>
        </div>

        <!-- partValue -->
        <div class="column is-half">
          <ValueSliderMulti
            :keyVal="'partValue'"
            :val="partValue"
          />
          <strong class="has-text-primary">
            {{ getVal('partValue').toLocaleString() }} €
          </strong>
        </div>

      </div>

      <div class="columns is-8 is-multiline">
        <!-- reserves -->
        <div class="column">
          <ValueSliderMulti
            :keyVal="'reserves'"
            :val="reservesEntreprise"
          />
          {{ benefsEntreprise.toLocaleString() }} €
          x
          {{ getVal('reserves') }} %
          =
          <strong class="has-text-primary">
            {{ (benefsEntreprise * getVal('reserves') / 100).toLocaleString() }} €
          </strong>
        </div>
        <!-- interessement -->
        <div class="column">
          <ValueSliderMulti
            :keyVal="'participation'"
            :val="participationEntreprise"
          />
          {{ benefsEntreprise.toLocaleString() }} €
          x
          {{ getVal('participation') }} %
          =
          <strong class="has-text-primary">
            {{ (benefsEntreprise * getVal('participation') / 100).toLocaleString() }} €
          </strong>
        </div>
        <!-- dividendes -->
        <div class="column">
          <ValueSliderMulti
            :keyVal="'dividendes'"
            :val="dividendesEntreprise"
          />
          {{ benefsEntreprise.toLocaleString() }} €
          x
          {{ getVal('dividendes') }} %
          =
          <strong class="has-text-primary">
            {{ (benefsEntreprise * getVal('dividendes') / 100).toLocaleString() }} €
          </strong>
        </div>

      </div>
    </div>

    <div class="columns is-centered mt-3">
      <div class="column is-one-third">
        <b-button
          icon-left="autorenew"
          @click="resetRepart()"
          type="is-grey"
          outlined
          expanded
          >
          {{ t('resetRepart') }}
        </b-button>
      </div>
      <div class="column is-one-third">
        <b-button
          icon-left="autorenew"
          @click="resetTeam()"
          type="is-grey"
          outlined
          expanded
          >
          {{ t('reset') }}
        </b-button>
      </div>
    </div>

    <!-- MEMBERS -->
    <div class="columns is-multiline mt-3">
      <div
        v-for="member in teamMembers"
        :key="member.key"
        class="column is-half"
        >
        <Member
          :memberData="member"
          :keyMember="member.key"
        />
      </div>
    </div>
    <b-button
      icon-left="account-plus"
      @click="addMember()"
      type="is-primary"
      >
      {{ t('addMember') }}
    </b-button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

// import { Button } from 'buefy'

import Member from '@/components/Member'
import ValueSliderMulti from '@/components/ValueSliderMulti'

import 'buefy/dist/buefy.css'

export default {
  name: 'MultiSimulator',
  head () {
    return {
      script: [
        // { type: 'text/javascript', src: 'https://unpkg.com/buefy/dist/buefy.min.js' }
      ],
      link: [
        // { rel: 'icon', href: this.iconUrl, sizes: '32x32' },
        // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css' }
        // { rel: 'stylesheet', href: 'https://unpkg.com/buefy/dist/buefy.min.css' }
      ]
    }
  },
  components: {
    // Button,
    Member,
    ValueSliderMulti
  },
  props: {
    locale: String,
    partvalue: Number,
    minbenefs: Number,
    benefs: Number,
    repart: String,
    team: String
  },
  data () {
    return {
      // benefsEntreprise: undefined,
      // repartEntreprise: undefined,
      // teamEntreprise: undefined
    }
  },
  beforeMount () {
    this.populateValue({ space: 'locale', value: this.locale })
    this.populateValue({ space: 'minBenefs', value: this.minbenefs })

    const repart = JSON.parse(this.repart)
    const defaults = {
      partValue: this.partvalue,
      benefs: this.benefs,
      reserves: repart.reserves,
      participation: repart.participation,
      dividendes: repart.dividendes
    }
    this.populateValue({ space: 'partValue', value: defaults.partValue })
    this.populateValue({ space: 'benefs', value: defaults.benefs })
    this.populateValue({ space: 'reserves', value: defaults.reserves })
    this.populateValue({ space: 'participation', value: defaults.participation })
    this.populateValue({ space: 'dividendes', value: defaults.dividendes })

    const rawTeam = JSON.parse(this.team)
    // this.populateValue({ space: 'team', value: rawTeam })
    const originalTeam = []
    rawTeam.forEach((member) => {
      const rand = Math.floor(Math.random() * (100000)) + 1
      const memberKey = `member-${rand}`
      const memberObj = { key: memberKey, ...member }
      this.populateTeamMembers({ action: 'push', member: memberObj })
      originalTeam.push(memberObj)
    })

    this.saveTeamDefault(originalTeam)
    this.saveRepartDefaults(defaults)
  },
  computed: {
    ...mapState({
      benefsEntreprise: (state) => state.benefs,
      partValue: (state) => state.partValue,
      teamMembers: (state) => state.teamMembers
    }),
    ...mapGetters({
      reservesEntreprise: 'getReserves',
      participationEntreprise: 'getparticipation',
      dividendesEntreprise: 'getDividendes',
      repartBenefs: 'repartBenefs',
      totals: 'totals',
      getVal: 'getKeyVal',
      t: 'getTranslation'
    })
  },
  methods: {
    ...mapActions({
      populateValue: 'populateValue',
      populateTeamMembers: 'populateTeamMembers',
      saveTeamDefault: 'saveTeamDefault',
      resetTeam: 'resetTeam',
      saveRepartDefaults: 'saveRepartDefaults',
      resetRepart: 'resetRepart'
    }),
    addMember () {
      this.populateTeamMembers({ action: 'add' })
    }
  },
  beforeDestroy () {
    this.resetTeam()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
