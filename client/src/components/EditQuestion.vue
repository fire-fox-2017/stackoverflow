<template>
  <div id="edit-form">
    <div class="ui form">
      <h3>Edit a Question Form</h3>

      <div class="field">
        <label for="title">Judul pertanyaan kamu:</label>
        <input name="title" type="text" placeholder="Beri judul pertanyaanmu singkat padat jelas" class="input" v-model="question.title">
        <div class="field">
          <label class="input" for="content">Deskripsi:</label>
          <textarea name="content" placeholder="Deskripsikan lebih jauh pertanyaanmu" v-model="question.content" rows="2" style="margin-top: 0px; margin-bottom: 0px; height: 58px;"></textarea>
        </div>
        <button @click="editQuestion()" class="ui primary button">
        Submit
        </button>
        <a href="#/main"><button class="ui red button">Back to main</button></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'EditQuestion',

  data () {
    return {
      title: '',
      content: '',
      question: []
    };
  },
  methods: {
    getQuestion() {
      let self = this;
      axios.get('http://localhost:3000/api/question/'+this.$route.params.questionId, {headers: {token: localStorage.getItem('token')}})
      .then(res => {
        self.question = res.data.question;
        console.log('ini adalah res.data.question:')
        console.log(res.data.question)
      }).catch(err => {
        console.log(err);
      })
    },
    editQuestion() {
      let self = this;
      axios.put(`http://localhost:3000/api/question/edit/${this.$route.params.questionId}`, {
        title: self.question.title,
        content: self.question.content
      }, {headers: {token: localStorage.getItem('token')}}).then(res => {
        alert('question successfully edited');
        console.log(res)
        self.$router.push({ path: '/main' });
        // window.location.href = '#/main'
        // window.location.reload();
      }).catch(err => {
        console.log(err);
      })
    }
  },
  mounted() {
      this.getQuestion();
    }
};
</script>

<style lang="css" scoped>
#edit-form {
  padding: 50px;
  width: 50%;
  margin: 0 auto;
}

</style>