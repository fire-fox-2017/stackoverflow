<template>
  <div id="app">

    <div class="ui container">
      <navbar :loginStatus='is_login' @navbar-signout='signOut' :user='user'></navbar>
      <router-view @signInSuccess='signIn' :loginStatus='is_login' :user='user'></router-view>
      <footer-custom></footer-custom>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Navbar from './components/Navbar'
import FooterCustom from './components/FooterCustom'

export default {
  name: 'app',
  components: {
    Hello,
    Navbar,
    FooterCustom
  },
  data() {
    return {
      is_login: false,
      user: { username: ''}
    }
  },
  methods: {
    signOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.is_login = false;
      this.user = { username: ''};
      this.$router.push('/');
    },
    signIn(username) {
      this.checkLoginStatus();
      this.$router.push('/');
      // this.user.username = username;
      console.log(`App vue signIn ${username}`)
    },
    checkLoginStatus() {
      if(localStorage.token != null && localStorage.username != null) {
        this.is_login = true;
        this.user.username = localStorage.username;
        console.log(`checkLoginStatus - ${this.user.username} has signed in`)
      }
    }
  }, // end of methods
  created() {
    this.checkLoginStatus()
  }
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
