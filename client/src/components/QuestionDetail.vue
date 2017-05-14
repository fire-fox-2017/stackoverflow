<template>
  <div class="question_detail">
    <router-link
      to="/home"
      class="ui item"
      active-class="active"
      exact
    >
      back
    </router-link>


    <h2>{{ question.title }}</h2>
    <div class="ui divider"></div>
    <p>
      {{ question.content }}
    </p>


    <div class="metadata">
      <span class="date">asked on {{ question.created_at }}</span>
    </div>

    <div class="answer-container" v-if="question.answers.length > 0">

      <div class="ui comments">
        <h3 class="ui dividing header">Answers</h3>
        <div class="comment" v-for="answer in question.answers">
          <a class="avatar">
            <i class="user icon"></i>
          </a>
          <div class="content">
            <a class="author">{{answer.author.name}}</a>
            <div class="metadata">
              <span class="date">answered {{answer.created_at}}</span>
            </div>
            <div class="text">
              {{ answer.content }}
            </div>
            <!-- <div class="actions">
              <a class="reply">Reply</a>
            </div> -->
          </div>
        </div>



      </div> <!-- end of ui comments -->



    </div>

    <answer-form v-if="loginStatus" :answerForm='answerForm' @clickedCreateAnswer='createAnswer'></answer-form>

  </div>
</template>

<script>
  import AnswerForm from './AnswerForm'

  export default {
    components: {
      AnswerForm
    },
    props: ['id', 'loginStatus'],
    data () {
      return {
        question: { answers: []},
        answerForm: {
          title: '',
          content: ''
        }
      }
    },
    methods: {
      getQuestionDetail () {
        let self = this;

        axios.get( `http://localhost:3000/questions/${this.id}` )
        .then ( response => {
          console.log("*** getQuestionDetail", response.data)
          self.question = response.data;
        })
        .catch ( err => {
          console.log(err);
        })
      },
      createAnswer() {
        let self = this

        axios.post(`http://localhost:3000/questions/add_answer/${self.id}`, {
          title: `reply to question ${self.id}`,
          content: self.answerForm.content
        }, {
          headers: { token : localStorage.token }
        })
        .then (response => {
          let updatedQuestionDetail = response.data
          console.log("updatedQuestionDetail", updatedQuestionDetail)

          self.question = updatedQuestionDetail
          this.resetAnswerForm()
        })
        .catch (err => {
          console.log(err)
        })

      }, // end of createAnswer
      resetAnswerForm () {
        this.answerForm = { title: '', content: ''};
      }
    }, // end of methods
    created () {
      this.getQuestionDetail()
    }
  }
</script>

<style scoped>
.question_detail {
  margin-top: 20px;
}

.answer-container {
  margin-top: 30px;
}

</style>
