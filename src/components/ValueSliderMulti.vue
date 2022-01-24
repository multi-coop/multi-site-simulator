<template>
  <section>
    <div class="block">
      <!-- <b-field grouped :label="label">
        <b-numberinput
          v-model="numberInput"
          :max="max"
          :min="min"
          :step="ticks"
          size="is-small"
          type="number"
        />
      </b-field> -->
      <b-field :label="label">
        <b-slider
          v-model="numberInput"
          :max="max"
          :min="min"
          :step="ticks"
          :tooltip="false"
          ticks
          @change="changeVal"
        />
          <!-- indicator -->
          <!-- :custom-formatter="(valTxt) => valTxt + unit" -->
      </b-field>
      {{ numberInput }} {{ unit }}
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

// import { Slider, Field } from 'buefy'

export default {
  name: 'ValueSliderMulti',
  props: {
    label: String,
    val: Number,
    unit: String,
    min: Number,
    max: Number,
    ticks: Number
  },
  components: {
    // Slider,
    // Field
  },
  data () {
    return {
      numberInput: 0
    }
  },
  beforeMount () {
    // this.numberInput = JSON.parse(JSON.stringify(this.val))
    this.numberInput = this.val
  },
  computed: {
    ...mapState({
      benefsEntreprise: (state) => state.benefs
    }),
    ...mapGetters({
      repartBenefs: 'repartBenefs',
      totals: 'totals'
    })
  },
  methods: {
    changeVal (input) {
      // this.numberInput = input
    }
  }
}
</script>
