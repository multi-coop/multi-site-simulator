<template>
  <section>
    <div class="block">
      <!-- <b-field grouped :label="keyVal">
        <b-numberinput
          v-model="numberInput"
          :max="max"
          :min="min"
          :step="ticks"
          size="is-small"
          type="number"
        />
      </b-field> -->
      <b-field :label="keyVal">
        <b-slider
          v-model="numberInput"
          :max="options.max"
          :min="options.min"
          :step="options.ticks"
          :tooltip="false"
          ticks
          @change="changeVal"
          indicator
          :custom-formatter="(valTxt) => valTxt + options.unit"
        />
      </b-field>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
// import { mixin } from './utils.js'

export default {
  name: 'ValueSliderMulti',
  props: {
    keyVal: String,
    val: Number
    // unit: String,
    // min: Number,
    // max: Number,
    // ticks: Number
  },
  components: {
    // Slider,
    // Field
  },
  data () {
    return {
      numberInput: 0,
      options: undefined
    }
  },
  watch: {
    valFromStore (next, prev) {
      // console.log('C - ValueSliderMulti > watch > valFromStore > prev :', prev)
      // console.log('C - ValueSliderMulti > watch > valFromStore > next :', next)
      this.numberInput = next
    }
  },
  beforeMount () {
    // this.numberInput = JSON.parse(JSON.stringify(this.val))
    this.numberInput = this.val
    this.options = this.getValOptions(this.keyVal)
  },
  computed: {
    ...mapState({
      // benefsEntreprise: (state) => state.benefs
      // valStore: (state) => state[this.keyVal]
    }),
    ...mapGetters({
      // repartBenefs: 'repartBenefs',
      // totals: 'totals',
      getVal: 'getKeyVal',
      getValOptions: 'getValOptions'
    }),
    valFromStore () {
      return this.getVal(this.keyVal)
    }
  },
  methods: {
    ...mapActions({
      populateRepart: 'populateRepart'
    }),
    changeVal (input) {
      // this.numberInput = input
      this.populateRepart({
        space: this.keyVal,
        value: this.numberInput
      })
    }
  }
}
</script>
