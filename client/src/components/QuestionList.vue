<template>
  <div class="question_container">
    <h2>Top Questions</h2>

    <div class="ui relaxed divided list">
      <div class="item" v-for="question in questions">
        <i class="large puzzle middle aligned icon"></i>
        <div class="content">
          <a class="header" @click="seeQuestionDetail(question._id)">
            {{ question.title }}
          </a>
          <div class="description">
            <p>{{ question.content }}</p>
            <p>asked on {{ question.created_at }}, by {{ question.author.name }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['questions'],
    data () {
      return {

      }
    },
    methods: {
      seeQuestionDetail(question_id) {
        this.$router.push('/question-detail/' + question_id)
      }
    }, // end of methods
    created () {

    }
  }
</script>

<style scoped>
.question_container {
  margin-top: 20px;
}
</style>
