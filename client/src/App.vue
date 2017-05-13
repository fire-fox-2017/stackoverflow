<template>
  <div id="app">
  <div class="ui blue fixed inverted menu"> 
    <div class="ui container"> 
      <a href="#" class="header item"> 
        <img class="logo" src="" draggable="true" data-bukket-ext-bukket-draggable="true"> 
        Hacktiv Overflow 
      </a> 
      <a @click="logout" class="item">Logout</a> 
    </div>

  </div> 
    <router-view></router-view>
  </div>

</template>

<script>

import { mapMutations } from 'vuex';

export default {
  name: 'app',
  methods: {
    ...mapMutations([
      'ifLogin'
    ]),
    logout() {
      if(this.$store.state.isLogin) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // self.$router.push({ path: '/' });
        console.log('sukses logout')
      }
    }
  },
  mounted() {
    this.ifLogin();
  }
}
</script>

<style>

</style>
