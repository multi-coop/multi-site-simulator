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
            msg :<br>
            <code>{{ msg }}</code>
          </p>
        </div>
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
    <b-icon
      icon="home"
    />

    <!-- VALUES -->
    <div class="section">

      <div class="columns is-8 is-multiline mb-6">

        <!-- benefs -->
        <div class="column is-half">
          <ValueSliderMulti
            :keyVal="'benefs'"
            :val="benefsEntreprise"
          />
          <strong>
            {{ getVal('benefs') }} €
          </strong>
        </div>

        <!-- partValue -->
        <div class="column is-half">
          <ValueSliderMulti
            :keyVal="'partValue'"
            :val="partValue"
          />
          <strong>
            {{ getVal('partValue') }} €
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
          {{ benefsEntreprise }} €
          x
          {{ getVal('reserves') }} %
          =
          <strong>
            {{ benefsEntreprise * getVal('reserves') / 100 }} €
          </strong>
        </div>
        <!-- interessement -->
        <div class="column">
          <ValueSliderMulti
            :keyVal="'participation'"
            :val="participationEntreprise"
          />
          {{ benefsEntreprise }} €
          x
          {{ getVal('participation') }} %
          =
          <strong>
            {{ benefsEntreprise * getVal('participation') / 100 }} €
          </strong>
        </div>
        <!-- dividendes -->
        <div class="column">
          <ValueSliderMulti
            :keyVal="'dividendes'"
            :val="dividendesEntreprise"
          />
          {{ benefsEntreprise }} €
          x
          {{ getVal('dividendes') }} %
          =
          <strong>
            {{ benefsEntreprise * getVal('dividendes') / 100 }} €
          </strong>
        </div>

      </div>
    </div>

    <!-- MEMBERS -->
    <div class="columns is-multiline mt-6">
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
      @click="addMember()"
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
    // console.log('C - MultiSimulator > beforeMount > this.benefs :', this.benefs)
    // console.log('C - MultiSimulator > beforeMount > this.repart :', this.repart)
    // console.log('C - MultiSimulator > beforeMount > this.partvalue :', this.partvalue)
    // console.log('C - MultiSimulator > beforeMount > this.minbenefs :', this.minbenefs)
    // console.log('C - MultiSimulator > beforeMount > this.benefs :', this.benefs)
    // console.log('C - MultiSimulator > beforeMount > this.team :', this.team)
    // this.benefsEntreprise = this.benefs
    // this.repartEntreprise = JSON.parse(this.repart)
    // this.teamEntreprise = JSON.parse(this.team)
    this.populateValue({ space: 'locale', value: this.locale })
    this.populateValue({ space: 'partValue', value: this.partvalue })
    this.populateValue({ space: 'minBenefs', value: this.minbenefs })
    this.populateValue({ space: 'benefs', value: this.benefs })
    const repart = JSON.parse(this.repart)
    // console.log('C - MultiSimulator > beforeMount > repart :', repart)
    this.populateValue({ space: 'reserves', value: repart.reserves * 100 })
    this.populateValue({ space: 'participation', value: repart.participation * 100 })
    this.populateValue({ space: 'dividendes', value: repart.dividendes * 100 })

    const rawTeam = JSON.parse(this.team)
    // this.populateValue({ space: 'team', value: rawTeam })
    rawTeam.forEach((member) => {
      const rand = Math.floor(Math.random() * (100000)) + 1
      const memberKey = `member-${rand}`
      this.populateTeamMembers({ action: 'push', member: { key: memberKey, ...member } })
    })
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
      populateTeamMembers: 'populateTeamMembers'
    }),
    addMember () {
      this.populateTeamMembers({ action: 'add' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
