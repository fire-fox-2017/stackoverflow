<template>
  <div class="question_container">
    <h2>Top Questions</h2>

    <div class="ui relaxed divided list">
      <div class="ui segment" v-if="questions.length == 0">
        <div class="ui active dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>

      <div class="item" v-for="question in questions">
        <i class="huge cube middle aligned icon"></i>

        <div class="content">
          <a class="ui large header" @click="seeQuestionDetail(question._id)">
            {{ question.title }} <a class="ui orange circular label"> {{ question.answers.length }} </a>
          </a>
          <div class="description">
            <p>{{ question.content }}</p>
            <p>
              asked on {{ question.created_at }}, by {{ question.author.name }}
            </p>
            <p>
              <!-- <a class="ui orange circular label"> {{ question.answers.length }} </a> -->
            </p>
            <p>
              <span v-if="loginStatus && user.username === question.author.username">
                <a @click="editQuestion(question)"><i class="big edit icon"></i></a>
                <a @click="deleteQuestion(question._id)"><i class="big trash outline icon"></i></a>

              </span>
            </p>



  <!--           <div class="meta">
              <a class="like">
                <i class="big like icon"></i> {{ countVotes(question.votes) }} Likes
              </a>
            </div> -->

            <div class="ui label">
              <i class="big red like icon"></i> {{ countVotes(question.votes) }}
            </div>

            <a @click="upVote(question._id)"><i class="big pointing up icon"></i></a>
            <a @click="downVote(question._id)"><i class="big pointing down icon"></i></a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['questions', 'loginStatus', 'user'],
    data () {
      return {

      }
    },
    methods: {
      seeQuestionDetail(question_id) {
        this.$router.push('/question-detail/' + question_id)
      },
      editQuestion(question) {
        this.$emit('clickedEditQuestion', question)
        console.log('QuestionList editQuestion')
      },
      deleteQuestion(question_id) {

        var r = confirm("Are you sure?")
        if(r){
          this.$emit('clickedDeleteQuestion', question_id)
          console.log(`QuestionList deleteQuestion ${question_id}`)

        }

      },
      upVote(question_id) {
        this.$emit('clickedUpVote', question_id);
        console.log(`QuestionList upVote ${question_id}`)
      },
      downVote(question_id) {
        this.$emit('clickedDownVote', question_id);
        console.log(`QuestionList downVote ${question_id}`)
      },
      countVotes(votes_arr) {
        console.log('countVotes')
        return votes_arr.reduce( (a,b) => { return a + b.vote }, 0)
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
