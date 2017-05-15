<template>
  <div id="app">
  <div class="ui blue fixed inverted menu"> 
    <div class="ui container"> 
      <a href="#" class="header item">
      <i class="fa fa-bullhorn" aria-hidden="true"></i>
  
        Hacktiv Overflow 
      </a>
      <a v-if="loggedUser" class="header item">
      Welcome, {{this.$store.state.name}}
      </a>
      <a v-if="loggedUser" href="#/ask" class="header item"> 
        Post a Question
      </a> 
      <a v-if="loggedUser" @click="logout" class="item">Logout</a> 
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
        this.$router.push({ path: '/' });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        console.log('sukses logout');
        window.location.reload();
      }
    }
  },
  data () {
    return {
      loggedUser: this.$store.state.loggedUser
    };
  },
  mounted() {
    this.ifLogin();
  }
}
</script>

<style>
  i.fa {
    padding-right: 10px;
  }
</style>
