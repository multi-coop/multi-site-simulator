<template>
  <div class="card mb-2">
    <div class="card-content">
      <div class="columns">

        <div class="column">
          <p>
            name :
            <strong>{{ dataMember.name }}</strong>
          </p>
          <br>
          <p>
            parts : {{ dataMember.parts }} parts
          </p>
          <p>
            workTime : {{ dataMember.workTime * 100 }} %
          </p>
        </div>

        <div class="column">
          <p>
            parts share : {{ (dataMember.parts * 100 / totals.partsTotal).toFixed(1) }} %
          </p>
          <p>
            partsValue : {{ dataMember.parts * partValue }} €
          </p>
          <p>
            interesment : {{ getShareByKey('interesment').sum }} €
            <!-- <br>
            <code><pre>
              {{ getShareByKey('interesment') }} €
            </pre></code> -->
          </p>
          <p>
            dividendes : {{ getShareByKey('dividendes').sum }} €
            <!-- <br>
            <code><pre>
              {{ getShareByKey('dividendes') }} €
            </pre></code> -->
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Member',
  props: {
    memberData: Object
  },
  data () {
    return {
      dataMember: {}
    }
  },
  beforeMount () {
    this.dataMember = { ...this.memberData }
  },
  computed: {
    ...mapState({
      partValue: (state) => state.partValue,
      benefsEntreprise: (state) => state.benefs
    }),
    ...mapGetters({
      totals: 'totals',
      getShares: 'getShares'
    })
  },
  methods: {
    getShareByKey (key) {
      const vars = this.getShares('interesment')
      const benefsToshare = vars.benefs[key]
      // console.log('C - Member > getShareByKey > benefsToshare :', benefsToshare)
      let div = 0
      switch (key) {
        case 'interesment':
          div = this.dataMember.workTime / vars.totals.workTimeTotal
          break
        case 'dividendes':
          div = this.dataMember.parts / vars.totals.partsTotal
          break
      }
      const sum = benefsToshare * div
      return {
        vars: vars,
        div: div,
        sum: Math.round(sum)
      }
    }
  }
}
</script>
