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
      <router-link
        to="signin"
        class="ui item"
        active-class="active"
        exact
      >
        Sign in
      </router-link>
      <router-link
        to="signup"
        class="ui item"
        active-class="active"
        exact
      >
        Sign up
      </router-link>
        <a class="ui item">
          Logout
        </a>
      </div>
    </div>

  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>
