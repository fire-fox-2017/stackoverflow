<template>
  <div class="signup-container">

    <div class="ui one column stackable center aligned page grid">
       <div class="column twelve wide">

        <h1>Sign up</h1>
        <form class="ui huge form" v-on:submit="onSubmitSignUpForm" >
          <div class="field">
            <input type="text" name="name" v-model="user_form.name" placeholder="Full Name">
          </div>
          <div class="field">
            <input type="text" name="username" v-model="user_form.username" placeholder="Username">
          </div>
          <div class="field">
            <input type="text" name="email" v-model="user_form.email" placeholder="Email">
          </div>
          <div class="field">
            <input type="text" name="phone" v-model="user_form.phone" placeholder="Mobile Phone">
          </div>

          <div class="field">
            <input type="password" name="last-name" v-model="user_form.password" placeholder="Password">
          </div>

          <button id="btnSubmitSignUp" class="ui huge button green center floated" type="submit">Sign up</button>
        </form>

      </div>
    </div>

  </div> <!-- column -->
</template>

<script>

	export default {
		data() {
			return {
				user_form: {
					name: '',
					username: '',
					email: '',
					phone: '',
					password: ''
				}
			}

		},
		methods: {
			onSubmitSignUpForm(e) {
	      e.preventDefault();
	      // alert(this.user_form.name)
	      let self = this;
	      axios.post('http://localhost:3000/users/signup', {
	        name: this.user_form.name,
	        username: this.user_form.username,
	        email: this.user_form.email,
	        phone: this.user_form.phone,
	        password: this.user_form.password
	      })
	      .then(function (response) {
	        if (response.data.hasOwnProperty('errors')) {
	            console.log(response.data);
	            // console.log(err);
	            console.log("**** sign up error")

	        } else {
	            console.log("**** sign up successful")
	            console.log(response);

	            console.log(self);
	            console.log(self.$router);
	            self.$router.push('/');
	        }
	      })
	      .catch(function (error) {
	        console.log(error);
	      });


    	} // end of onSubmitSignUpForm

		}
	}
</script>


<style scoped>
.signup-container {
  margin: auto;
  width: 100%;
  margin-top: 20px;
  background: #FDD692;
  border-radius: 10px;

  padding: 10px;

}
</style>
