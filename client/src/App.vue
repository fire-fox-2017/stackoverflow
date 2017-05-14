<template>
  <div id="app">

    <div class="ui container">
      <navbar :loginStatus='is_login' @navbar-signout='signOut'></navbar>
      <router-view @signInSuccess='signIn' :loginStatus='is_login'></router-view>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Navbar from './components/Navbar'

export default {
  name: 'app',
  components: {
    Hello,
    Navbar
  },
  data() {
    return {
      is_login: false
    }
  },
  methods: {
    signOut() {
      localStorage.removeItem('token');
      this.is_login = false;
      this.$router.push('/');
    },
    signIn() {
      this.checkLoginStatus();
      this.$router.push('/');
      console.log('App vue signIn')
    },
    checkLoginStatus() {
      if(localStorage.token!= null) {
        this.is_login = true;
        console.log(`checkLoginStatus - User has signed in`)
      }
    }
  } // end of methods

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
</style>
