<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <MultiSimulator msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MultiSimulator from '@/components/MultiSimulator.vue'

export default {
  name: 'Home',
  components: {
    MultiSimulator
  }
}
</script>
