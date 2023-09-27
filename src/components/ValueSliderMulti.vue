<template>
  <section class="my-4">

    <!-- DEBUGGING -->
    <div
      v-if="debug"
      >
      <div class="columns is-multiline">
        <div class="column">
          <p>
            keyVal :
            <code>{{ keyVal }}</code>
          </p>
          <p>
            val :
            <code>{{ val }}</code>
          </p>
          <p>
            options :
            <code>{{ options }}</code>
          </p>
        </div>
      </div>
    </div>

    <!-- SLIDER BLOCK -->
    <div
      class="block"
      >
      <b-field>

        <!-- LABEL -->
        <template
          slot="label"
          >
          <div
            :class="`is-flex is-align-items-center`"
            >
            <span
              :class="`is-${sizeText}`">
              {{ t(keyVal) }}
            </span>
            <b-tooltip
              :label="t('editValue')"
              >
              <b-button
                icon-left="pencil"
                size="is-small"
                type="is-light"
                class="ml-3 mb-0"
                @click="showUserEdit = !showUserEdit"
                >
              </b-button>
            </b-tooltip>
          </div>
        </template>

        <!-- NUMBER INPUT -->
        <b-numberinput
          v-show="showUserEdit"
          v-model="numberInput"
          :max="options.max"
          :min="options.min"
          :size="`is-small`"
          controls-position="compact"
          class="mt-2"
          @change="changeVal"
          expanded
          :custom-formatter="(valTxt) => `${valTxt.toLocaleString()} ${unitText}`"
        />

        <!-- SLIDER INPUT -->
        <b-slider
          v-show="!showUserEdit"
          v-model="numberInput"
          :max="options.max"
          :min="options.min"
          :step="options.ticks"
          :tooltip="false"
          indicator
          ticks
          :size="`is-small`"
          @input="changeVal"
          :custom-formatter="(valTxt) => `${valTxt.toLocaleString()} ${unitText}`"
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
    val: Number,
    sizeText: String,
    localChange: Boolean,
    debug: Boolean
  },
  components: {
    // Slider,
    // Field
  },
  data () {
    return {
      showUserEdit: false,
      numberInput: 0,
      options: undefined
    }
  },
  watch: {
    val (next) {
      // console.log('C - ValueSliderMulti > watch > val > next :', next)
      this.numberInput = next
    },
    valFromStore (next) {
      // console.log('C - ValueSliderMulti > watch > valFromStore > prev :', prev)
      // console.log('C - ValueSliderMulti > watch > valFromStore > next :', next)
      this.numberInput = next
    },
    repartNeedsReset (next) {
      // console.log('C - ValueSliderMulti > watch > repartNeedsReset > next :', next)
      // console.log('C - ValueSliderMulti > watch > repartNeedsReset > this.keyVal :', this.keyVal)
      if (!this.localChange) {
        this.numberInput = this.repartDefaults[this.keyVal]
      }
    }
  },
  beforeMount () {
    this.numberInput = this.val
    this.options = this.getValOptions(this.keyVal)
  },
  computed: {
    ...mapState({
      repartNeedsReset: 'repartNeedsReset',
      repartDefaults: 'repartDefaults'
    }),
    ...mapGetters({
      getVal: 'getKeyVal',
      getValOptions: 'getValOptions',
      t: 'getTranslation'
    }),
    valFromStore () {
      return this.getVal(this.keyVal)
    },
    unitText () {
      return this.options.translateUnit ? this.t(this.options.unit) : this.options.unit
    }
  },
  methods: {
    ...mapActions({
      populateRepart: 'populateRepart'
    }),
    changeVal (input) {
      const updated = {
        space: this.keyVal,
        value: this.numberInput
      }
      if (this.localChange) {
        this.$emit('changeVal', updated)
      } else {
        this.populateRepart(updated)
      }
    }
  }
}
</script>
