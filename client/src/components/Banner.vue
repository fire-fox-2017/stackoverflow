<template>
  <div class="container-blue" v-if="!loginStatus">

    <div class="banner">
      <p class="banner-text-1">
        Join the StickStack Community
      </p>

      <p class="banner-text-2">Stick Stack is a community of 7.1 million programmers, just like you, helping each other.
Join them; it only takes a minute: </p>

      <div class="button-big-center">
        <button class="massive ui orange button" id="btnSignUpBig">Get Started</button>
      </div>

      <p class="banner-text-2">
        Sign up for a free account today :)
      </p>

    </div> <!-- end of banner -->

  </div> <!-- end of container-blue -->

</template>

<script>
  export default {
    props: ['loginStatus']
  }
</script>

<style scoped>

.container-blue {
  background: #FFBC42;
  /*#0099FF;*/
  border-radius: 10px;
  margin-top: 10px;

}

.banner {
  margin: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  /*border-top: 1px solid #0099FF; */
}

.banner-text-1 {
  margin: auto;
  font-size: 3em;
  text-align: center;
  font-weight: bold;
  color: white;
  max-width: 700px;
  padding-top: 0px;
  padding-bottom: 0px; }

.banner-text-2 {
  margin: auto;
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
  color: white;
  max-width: 700px;
  padding-top: 10px;
  padding-bottom: 10px; }

.button-big-center {
  margin: auto;
  padding: 10px;
  width: 600px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}

</style>
