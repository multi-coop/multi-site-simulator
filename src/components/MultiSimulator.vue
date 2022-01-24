<template>
  <div class="container">
    <div
      class="content"
      >
      <!-- DEBUG -->
      <div
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
            interesmentEntreprise :
            <code>{{ interesmentEntreprise }}</code>
          </p>
          <p>
            dividendesEntreprise :
            <code>{{ dividendesEntreprise }}</code>
          </p>
        </div>
        <div class="column">
          <p>
            teamEntreprise :<br>
            <code><pre>{{ teamEntreprise }}</pre></code>
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
      </div>
    </div>

    <!-- VALUES -->
    <div class="section">
      <div class="columns is-multiline">
        <div class="column is-full">
          <ValueSliderMulti
            :label="'benefs'"
            :val="benefsEntreprise"
            :max="300000"
            :min="0"
            :ticks="10000"
            :unit="'€'"
          />
        </div>
        <div class="column">
          <ValueSliderMulti
            :label="'reserves'"
            :val="reservesEntreprise"
            :max="75"
            :min="15"
            :ticks="5"
            :unit="'%'"
          />
        </div>
        <div class="column">
          <ValueSliderMulti
            :label="'interesment'"
            :val="interesmentEntreprise"
            :max="84"
            :min="25"
            :ticks="5"
            :unit="'%'"
          />
        </div>
        <div class="column">
          <ValueSliderMulti
            :label="'dividendes'"
            :val="dividendesEntreprise"
            :max="33"
            :min="0"
            :ticks="5"
            :unit="'%'"
          />
        </div>
      </div>
    </div>

    <!-- MEMBERS -->
    <div class="section">
      <Member
        v-for="(member, idx) in teamEntreprise"
        :key="`member-${idx}-${member}`"
        :memberData="member"
      />
      <b-button>
        add member + {{ testFromStore }}
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

// import { Button } from 'buefy'

import Member from '@/components/Member'
import ValueSliderMulti from '@/components/ValueSliderMulti'

// import 'buefy/dist/buefy.css'

export default {
  name: 'MultiSimulator',
  head () {
    return {
      script: [
        { type: 'text/javascript', src: 'https://unpkg.com/buefy/dist/buefy.min.js' }
      ],
      link: [
        // { rel: 'icon', href: this.iconUrl, sizes: '32x32' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css' },
        { rel: 'stylesheet', href: 'https://unpkg.com/buefy/dist/buefy.min.css' }
      ]
    }
  },
  components: {
    // Button,
    Member,
    ValueSliderMulti
  },
  props: {
    msg: String,
    locale: String,
    partValue: Number,
    minBenefs: Number,
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
    console.log('C - MultiSimulator > beforeMount > this.repart :', this.repart)
    // console.log('C - MultiSimulator > beforeMount > this.team :', this.team)
    // this.benefsEntreprise = this.benefs
    // this.repartEntreprise = JSON.parse(this.repart)
    // this.teamEntreprise = JSON.parse(this.team)
    this.populateValue({ space: 'partValue', value: this.partValue })
    this.populateValue({ space: 'minBenefs', value: this.minBenefs })
    this.populateValue({ space: 'benefs', value: this.benefs })
    const repart = JSON.parse(this.repart)
    console.log('C - MultiSimulator > beforeMount > repart :', repart)
    this.populateValue({ space: 'reserves', value: repart.reserves * 100 })
    this.populateValue({ space: 'interesment', value: repart.interesment * 100 })
    this.populateValue({ space: 'dividendes', value: repart.dividendes * 100 })
    this.populateValue({ space: 'team', value: JSON.parse(this.team) })
  },
  computed: {
    ...mapState({
      testFromStore: (state) => state.test,
      benefsEntreprise: (state) => state.benefs,
      teamEntreprise: (state) => state.team
    }),
    ...mapGetters({
      reservesEntreprise: 'getReserves',
      interesmentEntreprise: 'getInteresment',
      dividendesEntreprise: 'getDividendes',
      repartBenefs: 'repartBenefs',
      totals: 'totals'
    })
  },
  methods: {
    ...mapActions({
      populateValue: 'populateValue'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
