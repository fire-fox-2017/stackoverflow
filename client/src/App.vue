<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>
import { mapMutations } from 'vuex';


export default {
  name: 'app',
  methods: {
    ...mapMutations([])
  }
}
</script>

<style>

</style>
