<template>
  <div class="answer-form">

    <form class="ui form" v-on:submit.prevent="createAnswer" >
      <!-- <div class="fields">
        <div class="ten wide field">
          <label>Answer Title</label>
          <input type="text" name="title" v-model="answerForm.title">
        </div>
      </div> -->
      <div class="fields">
        <div class="ten wide field">
          <label>Your reply:</label>
          <textarea rows="2" v-model="answerForm.content"></textarea>
        </div>

      </div>

      <div class="fields">
        <div class="ten wide field">
          <button id="btnSubmitLogin" class="ui button green right floated" type="submit">Add Reply</button>
        </div>
      </div>

    </form>

  </div>
</template>


<script>
  export default {
    props: ['answerForm'],
    methods: {
      createAnswer() {
        console.log("createAnswer")
        this.$emit('clickedCreateAnswer')
      }
    } // end of methods
  }
</script>

<style scoped>
.answer-form {
  margin-top: 20px;
}
</style>
