<template>
  <div class="navbar">

    <div class="ui secondary menu">
      <router-link
        to="/home"
        class="ui item"
        active-class="active"
        exact
      >
        stickstack
      </router-link>

      <a class="item">
        Messages
      </a>

      <div class="right menu">
        <!-- <router-link
          v-if="!loginStatus"
          to="signin"
          class="ui item"
          active-class="active"
          exact
        >
          Sign in
        </router-link>

        <router-link
          v-if="!loginStatus"
          to="signup"
          class="ui item"
          active-class="active"
          exact
        >
          Sign up
        </router-link> -->

        <a class="ui item" v-if="!loginStatus" @click="clickSignIn">
          Sign in
        </a>

        <a class="ui item" v-if="!loginStatus" @click="clickSignUp">
          Sign up
        </a>


        <a class="ui item" v-if="loginStatus" @click="signOut">
          Sign out
        </a>

      </div> <!-- end of right menu-->
    </div>

  </div>
</template>

<script>
  export default {
    props: ['loginStatus'],
    data() {
      return {

      }
    },
    methods: {
      signOut () {
        this.$emit('navbar-signout')
      },
      checkLoginStatus () {

      },
      clickSignIn() {
        this.$router.push('/signin')
      },
      clickSignUp() {
        this.$router.push('/signup')
      }
    },
    created() {
      // this.checkLoginStatus()
    },
    computed() {
      // this.checkLoginStatus();
    }
  }
</script>

<style scoped>

</style>
