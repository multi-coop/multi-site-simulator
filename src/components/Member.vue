<template>
  <div>
    {{ dataMember }}
  </div>
</template>

<script>

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
  }
}
</script>
