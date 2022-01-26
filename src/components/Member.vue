<template>
  <div class="card mb-2">
    <div class="card-content">
      <div class="level">
        <!-- DEBUG -->
        <div
          class="level-left"
          >
          <div
            class="level-item has-text-weight-bold is-uppercase has-text-primary is-size-5"
            >
            <!-- keyMember : {{ keyMember }} -->
            <b-icon
              icon="account"
              class="mr-3"
            />
            {{ name }}
          </div>
        </div>
      </div>
    </div>

    <div class="card-content">
      <section>

        <b-field
          :label="t('name')"
          horizontal
          custom-class="is-small"
          >
          <b-input
            v-model="name"
            size="is-small"
            @input="updateMember()"
            expanded
          />
        </b-field>

        <b-field
          :label="t('workTime')"
          class="mb-5"
          custom-class="is-small"
          horizontal
          >
          <!-- <b-numberinput
            v-model="workTime"
            size="is-small"
            controls-position="compact"
            :step="20"
            @input="updateMember()"
            expanded
          /> -->
          <b-slider
            v-model="workTime"
            :max="100"
            :min="0"
            :step="20"
            :tooltip="false"
            ticks
            size="is-small"
            indicator
            :custom-formatter="(valTxt) => `${valTxt}%`"
            @input="updateMember()"
          />
        </b-field>

        <b-field
          :label="t('parts')"
          class="mb-5"
          custom-class="is-small"
          horizontal
          >
          <!-- <b-numberinput
            v-model="parts"
            size="is-small"
            controls-position="compact"
            @input="updateMember()"
            expanded
          /> -->
          <b-slider
            v-model="parts"
            :max="partMax"
            :min="0"
            :step="10"
            :tooltip="false"
            ticks
            size="is-small"
            indicator
            :custom-formatter="(valTxt) => `${valTxt}.${t('partsShort')}`"
            @input="updateMember()"
          />
        </b-field>

      </section>

      <div class="columns is-mobile mb-0 has-text-centered">
        <div class="column">
          <p class="is-size-7">
            {{ t('partsShare') }}
          </p>
        </div>
        <div class="column">
          <p class="is-size-7">
            {{ t('partsValue') }}
          </p>
        </div>
        <div class="column">
          <p class="is-size-7">
            {{ t('participation') }}
          </p>
        </div>
        <div class="column">
          <p class="is-size-7">
              {{ t('dividendes') }}
          </p>
        </div>
      </div>

      <div class="columns is-mobile has-text-centered">
        <div class="column">
          <p class="title is-6 has-text-primary">
            {{ (parts * 100 / totals.partsTotal).toFixed(1).toLocaleString() }} %
          </p>
        </div>
        <div class="column">
          <p class="title is-6 has-text-primary">
            {{( parts * partValue).toLocaleString() }} €
          </p>
        </div>
        <div class="column">
          <p class="title is-6 has-text-primary">
            {{ getShareByKey('participation').sum.toLocaleString() }} €
          </p>
        </div>
        <div class="column">
          <p class="title is-6 has-text-primary">
            {{ getShareByKey('dividendes').sum.toLocaleString() }} €
          </p>
        </div>
      </div>

      <!-- <nav class="level">
        <div class="level-item has-text-centered is-flex-grow-0 is-flex-shrink-1">
          <div>
            <p class="label is-size-7">
              {{ t('partsShare') }}
            </p>
            <p class="title is-6 has-text-primary">
              {{ (parts * 100 / totals.partsTotal).toFixed(1).toLocaleString() }} %
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered is-flex-grow-0 is-flex-shrink-1">
          <div>
            <p class="label is-size-7">
              {{ t('partsValue') }}
            </p>
            <p class="title is-6 has-text-primary">
              {{( parts * partValue).toLocaleString() }} €
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered is-flex-grow-0 is-flex-shrink-1">
          <div>
            <p class="label is-size-7">
              {{ t('participation') }}
            </p>
            <p class="title is-6 has-text-primary">
              {{ getShareByKey('participation').sum.toLocaleString() }} €
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered is-flex-grow-0 is-flex-shrink-1">
          <div>
            <p class="label is-size-7">
              {{ t('dividendes') }}
            </p>
            <p class="title is-6 has-text-primary">
              {{ getShareByKey('dividendes').sum.toLocaleString() }} €
            </p>
          </div>
        </div>
      </nav> -->

    </div>

    <footer class="card-footer">
      <div
        class="card-footer-item"
        >
        <b-button
          icon-left="account-remove"
          type="is-ghost"
          size="is-small"
          outlined
          @click="deleteMember()"
          >
          {{ t('deleteMember') }}
        </b-button>
      </div>
    </footer>

  </div>
</template>

<style  scoped>
/* .label {
  height: 40px;
} */
/* .b-slider-thumb span {
  font-size: .85em !important;
} */
</style>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Member',
  props: {
    memberData: Object,
    keyMember: String
  },
  data () {
    return {
      dataMember: {},
      name: undefined,
      parts: undefined,
      workTime: undefined
    }
  },
  beforeMount () {
    this.dataMember = { ...this.memberData }
    this.name = this.memberData.name
    this.parts = this.memberData.parts
    this.workTime = this.memberData.workTime
  },
  computed: {
    ...mapState({
      partValue: (state) => state.partValue,
      benefsEntreprise: (state) => state.benefs,
      partMax: (state) => state.partMax
    }),
    ...mapGetters({
      totals: 'totals',
      getShares: 'getShares',
      t: 'getTranslation'
    }),
    memberObject () {
      return {
        key: this.keyMember,
        name: this.name,
        parts: this.parts,
        workTime: this.workTime
      }
    }
  },
  methods: {
    ...mapActions({
      populateTeamMembers: 'populateTeamMembers'
    }),
    getShareByKey (key) {
      const vars = this.getShares('participation')
      const benefsToshare = vars.benefs[key]
      // console.log('C - Member > getShareByKey > benefsToshare :', benefsToshare)
      let div = 0
      switch (key) {
        case 'participation':
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
    },
    updateMember () {
      this.populateTeamMembers({ action: 'update', member: this.memberObject })
    },
    deleteMember () {
      this.populateTeamMembers({ action: 'delete', member: this.memberObject })
    }
  }
}
</script>
