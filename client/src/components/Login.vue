<template>
 <div id="login-form" class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui green image header">
      <div class="content">
        Log-in to your account
      </div>
    </h2>
    <form class="ui large form">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="username" placeholder="Username">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" placeholder="Password">
          </div>
        </div>
        <div class="ui fluid large green submit button">Login</div>
      </div>

      <div class="ui error message"></div>

    </form>

    <div class="ui message">
      New to us? <a href="#">Sign Up</a>
    </div>
  </div>
</div>
</template>

<script>
export default {

  name: 'Login',

  data () {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      let self = this;
      axios.post('http://localhost:3000/api/user/signin', {
        username: self.username,
        password: self.password
      }).then((res) => {
        localStorage.setItem('token', res.data);
        localStorage.setItem('user', self.username);
        alert('login sukses');
        self.$router.push({ path: '/' });
        window.location.reload();
      }).catch((err) => {
        console.log(err);
        alert('login failed');
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