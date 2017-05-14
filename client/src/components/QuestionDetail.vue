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

    <div class="ui label">
      <i class="big red like icon"></i> {{ countVotes(question.votes) }}
    </div>

    <a @click="upVote(question._id)"><i class="big pointing up icon"></i></a>
    <a @click="downVote(question._id)"><i class="big pointing down icon"></i></a>


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
            <div class="actions">
              <!-- <a class="reply">Reply</a> -->

              <div class="ui label">
                <i class="red like icon"></i> {{ countVotes(answer.votes) }}
              </div>

              <a @click="answerUpVote(answer._id)"><i class="large pointing up icon"></i></a>
              <a @click="answerDownVote(answer._id)"><i class="large pointing down icon"></i></a>

            </div>
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
        question: { answers: [], votes: []},
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
      }, // end of getQuestionDetail
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
      },
      countVotes(votes_arr) {
        console.log('countVotes')
        return votes_arr.reduce( (a,b) => { return a + b.vote }, 0)
      },
      upVote(question_id) {
        console.log('*** QuestionDetail upVote')
        let self = this

        axios.post(`http://localhost:3000/questions/upvote/${question_id}`,{}, {
          headers: { token: localStorage.token }
        })
        .then (response => {
          let updatedQuestion = response.data;
          console.log("aaaa")
          if(updatedQuestion.hasOwnProperty('message')) {
            alert(updatedQuestion.message);
          } else {
            console.log("updatedQuestion", updatedQuestion);
            // let index = self.questions.findIndex( q => q._id === updatedQuestion._id )
            // self.questions.splice(index, 1, updatedQuestion)
            self.question = updatedQuestion;
          }
        })
        .catch (err => {
          console.log(err)
        })


      }, // end of upVote
      downVote(question_id) {
        console.log('*** QuestionDetail downVote')
        let self = this

        axios.post(`http://localhost:3000/questions/downvote/${question_id}`,{}, {
          headers: { token: localStorage.token }
        })
        .then (response => {
          let updatedQuestion = response.data;
          console.log("aaaa")
          if(updatedQuestion.hasOwnProperty('message')) {
            alert(updatedQuestion.message);
          } else {
            console.log("updatedQuestions", updatedQuestion);
            // let index = self.questions.findIndex( q => q._id === updatedQuestion._id )
            // self.questions.splice(index, 1, updatedQuestion)
            self.question = updatedQuestion;
          }
        })
        .catch (err => {
          console.log(err)
        })


      }, // end of downVote
      answerUpVote(answer_id) {
        console.log(`answerUpVote question._id=${this.question._id}, answer_id=${answer_id}`)

        let self = this

        axios.post(`http://localhost:3000/questions/answerupvote/${this.question._id}`,{
          answer_id: answer_id
        }, {
          headers: { token: localStorage.token }
        })
        .then (response => {
          let updatedQuestion = response.data;
          console.log("aaaa")
          if(updatedQuestion.hasOwnProperty('message')) {
            alert(updatedQuestion.message);
          } else {
            console.log("updatedQuestion", updatedQuestion);
            // let index = self.questions.findIndex( q => q._id === updatedQuestion._id )
            // self.questions.splice(index, 1, updatedQuestion)
            self.question = updatedQuestion;
          }
        })
        .catch (err => {
          console.log(err)
        })


      }, // end of answerUpVote
      answerDownVote(answer_id) {
        console.log(`answerDownVote question._id=${this.question._id}, answer_id=${answer_id}`)

        let self = this

        axios.post(`http://localhost:3000/questions/answerdownvote/${this.question._id}`,{
          answer_id: answer_id
        }, {
          headers: { token: localStorage.token }
        })
        .then (response => {
          let updatedQuestion = response.data;
          console.log("aaaa")
          if(updatedQuestion.hasOwnProperty('message')) {
            alert(updatedQuestion.message);
          } else {
            console.log("updatedQuestion", updatedQuestion);
            // let index = self.questions.findIndex( q => q._id === updatedQuestion._id )
            // self.questions.splice(index, 1, updatedQuestion)
            self.question = updatedQuestion;
          }
        })
        .catch (err => {
          console.log(err)
        })


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
