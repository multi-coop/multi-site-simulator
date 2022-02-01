<template>
  <section class="my-4">
    <div
      class="block"
      >
      <!-- {{ keyVal }} -
      {{ repartDefaults }} -->
      <!-- <b-field
        :label="t(keyVal)"
        class="mb-5"
        >
        <b-numberinput
          v-model="numberInput"
          :max="options.max"
          :min="options.min"
          :step="options.ticks"
          size="is-small"
          controls-position="compact"
          controls-rounded
          @input="changeVal"
          expanded
          :custom-formatter="(valTxt) => valTxt + options.unit"
        />
      </b-field> -->
      <b-field
        :label="t(keyVal)"
        class=""
        >
        <b-slider
          v-model="numberInput"
          :max="options.max"
          :min="options.min"
          :step="options.ticks"
          :tooltip="false"
          indicator
          ticks
          size="is-small"
          @input="changeVal"
          :custom-formatter="(valTxt) => `${valTxt.toLocaleString()}${options.unit}`"
        />
      </b-field>
    </div>
  </section>
</template>

<style>
.tooltip-trigger {
  /* min-width: 85px !important; */
}
</style>

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
    valFromStore (next) {
      // console.log('C - ValueSliderMulti > watch > valFromStore > prev :', prev)
      // console.log('C - ValueSliderMulti > watch > valFromStore > next :', next)
      this.numberInput = next
    },
    repartNeedsReset (next) {
      // console.log('C - ValueSliderMulti > watch > repartNeedsReset > next :', next)
      // console.log('C - ValueSliderMulti > watch > repartNeedsReset > this.keyVal :', this.keyVal)
      this.numberInput = this.repartDefaults[this.keyVal]
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
      repartNeedsReset: 'repartNeedsReset',
      repartDefaults: 'repartDefaults'
    }),
    ...mapGetters({
      // repartBenefs: 'repartBenefs',
      // totals: 'totals',
      getVal: 'getKeyVal',
      getValOptions: 'getValOptions',
      t: 'getTranslation'
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
