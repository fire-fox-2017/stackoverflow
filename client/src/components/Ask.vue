<template>
  <div id="ask-form">
    <div class="ui form">
      <h3>Ask a Question Form</h3>
      <div class="field">
        <label for="title">Judul pertanyaan kamu:</label>
        <input type="text" placeholder="Beri judul pertanyaanmu singkat padat jelas" class="input" v-model="title">
        <div class="field">
          <label class="input" for="content">Deskripsi:</label>
          <textarea placeholder="Deskripsikan lebih jauh pertanyaanmu" v-model="content" rows="2" style="margin-top: 0px; margin-bottom: 0px; height: 58px;"></textarea>
        </div>
        <button @click="ask()" class="ui primary button">
        Submit
        </button>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {

  name: 'Ask',

  data () {
    return {
      title: '',
      content: ''
    };
  },
  methods: {
    ask() {
      let self = this;
      axios.post('http://localhost:3000/api/question/create/', {
        title: self.title,
        content: self.content
      }, {headers: {'token': self.$store.state.userToken}}).then(res => {
        alert('You created new question');
        // self.$route.router.go('Main');
        window.location.href = 'http://localhost:8080/#/main';
      }).catch(err => {
        alert('Create new question failed');
        window.location.reload()
      })
    }
  }
};
</script>

<style lang="css" scoped>
#ask-form {
  padding: 50px;
  width: 50%;
  margin: 0 auto;
}
</style>