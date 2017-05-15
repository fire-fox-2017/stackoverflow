<template>
  <div id="login-form" class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui green image header">
      <div class="content">
        Register new account
      </div>
    </h2>
    <form class="ui large form">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="bold icon"></i>
            <input type="text" v-model="name" name="name" placeholder="Name">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" v-model="username" name="username" placeholder="Username">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" v-model="password" name="password" placeholder="Password">
          </div>
        </div>
        <div @click="onRegister()" class="ui fluid large green submit button">Register</div>
      </div>

      <div class="ui error message"></div>

    </form>
    <div class="ui message">
      Atau kembali ke login? <a href="#/login">Login Dulu</a>
    </div>
  </div>
</div>
</template>

<script>
export default {

  name: 'Register',

  data () {
    return {
      name: '',
      username: '',
      password: '',
    };
  },
  methods: {
    onRegister: function() {
      let self = this;
      axios.post('http://localhost:3000/api/user/signup', {
        name: self.name,
        username: self.username,
        password: self.password
      }).then(res => {
        alert('you have successfully register new user');
        self.$router.push({ path: '/login' });
      })
    }
  }
};
</script>

<style lang="css" scoped>
#login-form {
    width: 50%;
    margin: 0 auto;
  }
</style>