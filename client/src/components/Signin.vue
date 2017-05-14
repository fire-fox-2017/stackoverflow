<template>
  <div class="sixteen wide column">

        <h3> Sign in</h3>
        <form class="ui huge form" v-on:submit="onSubmitSignin" >
          <div class="field">
            <input type="text" name="username" v-model="user_form.username" placeholder="Username">
          </div>
          <div class="field">
            <input type="password" name="last-name" v-model="user_form.password" placeholder="Password">
          </div>

          <button id="btnSubmitLogin" class="ui button green right floated" type="submit">Sign in</button>
        </form>

  </div> <!-- column -->


</template>


<script>
export default {
	data() {
		return {
			user_form: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		 	onSubmitSignin(e) {
	      e.preventDefault();
	      console.log("here")

	      // alert(this.user_form.username)

	      let self = this;
	      axios.post('http://localhost:3000/users/signin', {
	        username: this.user_form.username,
	        password: this.user_form.password
	      })
	      .then(function (response) {
	        // get the token, save in local storage
	        console.log(response);
	        localStorage.setItem('token', response.data);
	        console.log(localStorage.token);

	        self.$router.push('/')

	      })
	      .catch(function (error) {
	        console.log("**** Error signin")
	        console.log(error);

	        
	      });


	    } // end of onSubmitForm

	}
}
</script>

<style scoped>


</style>