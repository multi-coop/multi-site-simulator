<template>
  <div class="card mb-2">
    <div class="card-content">
      <div class="level">
        <!-- DEBUG -->
        <div
          class="level-left"
          >

          <div
            v-show="!edit"
            class="level-item has-text-weight-bold is-uppercase has-text-primary is-size-5"
            @click="edit = true"
            >
            <b-icon
              icon="account"
              class="mr-3"
            />
            {{ name }}
            <!-- <span class="is-size-7 is-lowercase">
              - {{ keyMember }}
            </span> -->
            <b-button
              class="ml-3"
              icon-left="edit"
              @click="edit = true"
              type="is-ghost"
              >
              {{ t('editMember')}}
            </b-button>
          </div>

            <!-- :label="t('name')" -->
          <div
            v-show="edit"
            >
            <b-field
              grouped
              custom-class="is-small"
              >
              <!-- size="is-small" -->
              <b-input
                v-model="name"
                @input="updateMember()"
                expanded
              />
              <b-button
                class="ml-3"
                icon-left="close"
                @click="edit = false"
                >
                {{ t('close')}}
              </b-button>
            </b-field>
          </div>

        </div>
      </div>
    </div>

    <div class="card-content pt-0">
      <section>

        <!-- <b-field
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
        </b-field> -->

        <ValueSliderMulti
          :val="workTime"
          :keyVal="'workTime'"
          :sizeText="'small'"
          :localChange="true"
          @changeVal="updateMemberVal"
          :debug="true"
        />
        <ValueSliderMulti
          :val="yearTime"
          :keyVal="'yearTime'"
          :sizeText="'small'"
          :localChange="true"
          @changeVal="updateMemberVal"
          :debug="false"
        />
        <ValueSliderMulti
          :val="parts"
          :keyVal="'parts'"
          :sizeText="'small'"
          :localChange="true"
          @changeVal="updateMemberVal"
          :debug="false"
        />

        <!--
          <b-field
          :label="t('workTime')"
          class="mb-5"
          custom-class="is-small"
          >
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
          :label="t('yearTime')"
          class="mb-5"
          custom-class="is-small"
          >
          <b-slider
            v-model="yearTime"
            :max="12"
            :min="0"
            :step="1"
            :tooltip="false"
            ticks
            size="is-small"
            indicator
            :custom-formatter="(valTxt) => `${valTxt}.${t('months')}`"
            @input="updateMember()"
          />
        </b-field>

        <b-field
          :label="t('parts')"
          class="mb-5"
          custom-class="is-small"
          >
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
        </b-field> -->

      </section>

      <!-- <div class="columns is-mobile mt-3 mb-0 has-text-centered">
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
      </div> -->

      <div class="columns is-mobile is-multiline pt-5 mb-1 is-vcentered">

        <div class="column is-half-mobile is-three-quarters pt-1 pb-0">
          <p class="is-size-7">
            {{ t('partsShare') }}
          </p>
        </div>
        <div class="column is-half-mobile is-one-quarter pt-1 pb-0">
          <p
            :class="`is-6 has-text-right has-text-${ parts * 100 / totals.partsTotal > 50 ? 'danger' : 'grey' }`"
            >
            {{ (parts * 100 / totals.partsTotal).toFixed(1).toLocaleString() }} %
          </p>
        </div>

        <div class="column is-half-mobile is-three-quarters pt-1 pb-0">
          <p class="is-size-7">
            {{ t('partsValue') }}
          </p>
        </div>
        <div class="column is-half-mobile is-one-quarter pt-1 pb-0">
          <p
            :class="`is-6 has-text-right has-text-${ (partValue < partValueOptions.minLimit || partValue > partValueOptions.maxLimit) ? 'danger' : 'grey'}`"
            >
            {{ (parts * partValue).toLocaleString() }} €
          </p>
        </div>

        <div class="column is-half-mobile is-three-quarters pt-4 pb-0">
          <p class="is-size-7 has-text-weight-bold">
            {{ t('participationSingular') }}
          </p>
        </div>
        <div class="column is-half-mobile is-one-quarter pt-4 pb-0">
          <p
            :class="`title is-6 has-text-right has-text-${ (getShareByKey('participation').sum > 30000 || participation < participationOptions.minLimit || participation > participationOptions.maxLimit) ? 'danger' : 'primary'}`"
            >
            {{ getShareByKey('participation').sum.toLocaleString() }} €
          </p>
        </div>

        <div class="column is-half-mobile is-three-quarters pt-1 pb-0">
          <p class="is-size-7 has-text-weight-bold">
            {{ t('dividendes') }}
          </p>
        </div>
        <div class="column is-half-mobile is-one-quarter pt-1 pb-0">
          <p
            :class="`title is-6 has-text-right has-text-${ (dividendes < dividendesOptions.minLimit || dividendes > dividendesOptions.maxLimit) ? 'danger' : 'primary'}`"
            >
            {{ getShareByKey('dividendes').sum.toLocaleString() }} €
          </p>
        </div>

        <div class="column is-half-mobile is-three-quarters pt-1 pb-0">
          <p class="is-size-7">
            {{ t('totalShares') }}
          </p>
        </div>
        <div class="column is-half-mobile is-one-quarter pt-1 pb-0">
          <p
            :class="`is-6 has-text-right has-text-weight-medium has-text-${ (dividendes < dividendesOptions.minLimit || dividendes > dividendesOptions.maxLimit) ? 'danger' : 'grey'}`"
            >
            {{ (getShareByKey('participation').sum + getShareByKey('dividendes').sum).toLocaleString() }} €
          </p>
        </div>
      </div>

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

import ValueSliderMulti from '@/components/ValueSliderMulti'

export default {
  name: 'Member',
  components: {
    ValueSliderMulti
  },
  props: {
    memberData: Object,
    keyMember: String
  },
  data () {
    return {
      dataMember: {},
      name: undefined,
      parts: undefined,
      workTime: undefined,
      yearTime: undefined,
      edit: false
    }
  },
  beforeMount () {
    this.dataMember = { ...this.memberData }
    this.name = this.memberData.name
    this.parts = this.memberData.parts
    this.workTime = this.memberData.workTime
    this.yearTime = this.memberData.yearTime
  },
  watch: {
    teamNeedsReset (next) {
      // console.log('\nC - Member > watch > teamNeedsReset > next :', next)
      // console.log('C - Member > watch > teamNeedsReset > this.keyMember :', this.keyMember)
      if (next.includes(this.keyMember)) {
        // const memberDefault = this.getMemberDefault(this.keyMember)
        // console.log('C - Member > watch > teamNeedsReset > memberDefault :', memberDefault)
        this.name = this.dataMember.name
        this.parts = this.dataMember.parts
        this.workTime = this.dataMember.workTime
        this.deleteMemberFromNeedsReset(this.keyMember)
      }
    }
  },
  computed: {
    ...mapState({
      benefsEntreprise: (state) => state.benefs,
      partMax: (state) => state.partMax,
      teamNeedsReset: (state) => state.teamNeedsReset,

      partValue: (state) => state.partValue,
      reserves: (state) => state.reserves,
      participation: (state) => state.participation,
      dividendes: (state) => state.dividendes,

      partValueOptions: (state) => state.partValueOptions,
      benefsOptions: (state) => state.benefsOptions,
      reservesOptions: (state) => state.reservesOptions,
      participationOptions: (state) => state.participationOptions,
      dividendesOptions: (state) => state.dividendesOptions,

      workTimeOptions: (state) => state.workTimeOptions,
      monthTimeOptions: (state) => state.monthTimeOptions,
      partsOptions: (state) => state.partsOptions

    }),
    ...mapGetters({
      totals: 'totals',
      getShares: 'getShares',
      // getMemberDefault: 'getMemberDefault',
      t: 'getTranslation'
    }),
    memberObject () {
      return {
        key: this.keyMember,
        name: this.name,
        parts: this.parts,
        workTime: this.workTime,
        yearTime: this.yearTime
      }
    }
  },
  methods: {
    ...mapActions({
      populateTeamMembers: 'populateTeamMembers',
      deleteMemberFromNeedsReset: 'deleteMemberFromNeedsReset'
    }),
    getShareByKey (key) {
      const vars = this.getShares(key)
      const benefsToshare = vars.benefs[key]
      // console.log('\nC - Member > getShareByKey > key :', key)
      // console.log('C - Member > getShareByKey > this.dataMember :', this.dataMember)
      // console.log('C - Member > getShareByKey > benefsToshare :', benefsToshare)
      // console.log('C - Member > getShareByKey > vars :', vars)
      let div = 0
      switch (key) {
        case 'participation':
          div = this.workTime * (this.yearTime / 12) / vars.totals.workTimeTotal
          break
        case 'dividendes':
          div = this.parts / vars.totals.partsTotal
          break
      }
      // console.log('C - Member > getShareByKey > div :', div)
      const sum = benefsToshare * div
      return {
        vars: vars,
        div: div,
        sum: Math.round(sum)
      }
    },
    updateMemberVal (event) {
      // console.log('C - Member > updateMemberVal > event :', event)
      this[event.space] = event.value
      this.updateMember()
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
