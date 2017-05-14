<template>

  <div class="question-form">

    <form class="ui huge form" v-on:submit="createQuestion" >
      <div class="fields">
        <div class="ten wide field">
          <label>Question Title</label>
          <input type="text" name="username" v-model="questionForm.title">
        </div>
      </div>
      <div class="fields">
        <div class="ten wide field">
          <label>Content</label>
          <textarea rows="2" v-model="questionForm.content"></textarea>
        </div>

      </div>

      <div class="fields">
        <div class="ten wide field">
          <button id="btnSubmitLogin" class="ui button green right floated" type="submit">Ask a question</button>
        </div>
      </div>

    </form>

  </div>

</template>


<script>
  export default {
    props: ['questionForm'],
    data() {
      return {
      }
    },
    methods: {
      createQuestion(e) {
        e.preventDefault();

        console.log('createQuestion');
        this.$emit('createQuestionClicked', this.questionForm)
      }
    }
  }
</script>

<style scoped>

.question-form {
  margin-top: 30px;
}

</style>
