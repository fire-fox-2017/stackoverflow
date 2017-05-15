<template>
  <div id="question-detail" class="ui items">
    <div class="ui divided items">
      <div class="item">
        <div class="content">
          <div class="meta">
            <a v-if="question.userId.name == name" class="ui tiny label">Asked by you</a>
            <a v-else class="ui tiny label" >Asked by {{ question.userId.name}}</a>
          </div>
        
          <a class="ui large header">{{question.title}}</a> 
          <div class="meta">
            <span class="cinema">{{question.content}}</span>
          </div>
          <div class="description">
          
            <a data-tooltip="Question score based on user vote" class="ui tiny label grey"><i class="fa fa-question-circle ui" aria-hidden="true"></i>
               {{ question.votes.filter((val)=> {return val.count == 1}).length - question.votes.filter((val)=> {return val.count == -1}).length }} 
           </a>
            
          </div>
          <br>
          <a class="ui label green" href="#/main">Back to main</a>
        </div>
      </div>
    </div>
    
    <div class="ui comments">
      <h4 class="ui dividing header">Answers</h4>
      <div v-for="(answer, index) in question.answers" class="comment">
        <div class="content">
          <a class="author">{{answer.userId.name}}</a>
          <div class="metadata">
            <!-- <span class="date">5 days ago</span> -->
          </div>
          <div class="text">
            {{answer.content}}
          </div>
          <div class="text">
            <a data-tooltip="Answer score based on user vote" class="ui tiny label grey"><i class="fa fa-star" aria-hidden="true"></i> {{ answer.votes.filter((val)=> {return val.count == 1}).length - answer.votes.filter((val)=> {return val.count == -1}).length }}</a>
          </div>
          <div class="actions">
            <a @click="voteAnswer(1, question.answers[index]._id, index)" class="reply"><i class="thumbs outline green up icon">
              </i>Upvote answer</a>
            <a @click="voteAnswer(-1, question.answers[index]._id, index)" class="reply"><i class="thumbs outline yellow down icon">
              </i>Downvote answer</a>
            <a data-tooltip="delete this answer" v-if="loggedUserId == question.answers[index].userId._id || question.userId.username == loggedUser" @click="deleteAnswer(question.answers[index])" class="reply"><i class="trash outline red icon"></i></a>
               
          </div>
        </div>
        <div class="ui dividing header"></div>
      </div>
      <form class="ui reply form">
        <div class="field">
          <textarea placeholder="Tulis jawabanmu" v-model="content" rows="2" style="margin-top: 0px; margin-bottom: 0px; height: 58px;"></textarea>
        </div>
        <div @click="insertAnswer()" class="ui blue labeled submit icon button">
          <i class="icon edit"></i> Add Answer
        </div>
      </form>
    </div>

    <div class="ui divided items">
      <div class="ui form">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'Question',

  data () {
    return {
      question: [],
      title: '',
      content: '',
      loggedUser: this.$store.state.loggedUser,
      loggedUserId: this.$store.state.loggedUserId,
      name: this.$store.state.name
    };
  },
  methods: {
    getOneQuestion() {
      let self = this;
      axios.get('http://localhost:3000/api/question/'+this.$route.params.questionId, {headers: {token: localStorage.getItem('token')}})
      .then(res => {
        self.question = res.data.question;
        console.log('ini adalah res.data.question:')
        console.log(res.data.question)
        console.log(this.loggedUser)
        // console.log(res.data.question.userId._id)
      }).catch(err => {
        console.log(err);
      })
    },
    insertAnswer() {
      let self = this;
      axios.post('http://localhost:3000/api/answer/create/'+ this.$route.params.questionId, {
        content: self.content,
      }, {headers: {'token': self.$store.state.userToken}}).then(res => {
        alert('you succesfully add new answer');
        window.location.reload();
      }).catch(err => {
        alert('answer failed');
      })
    },
    voteAnswer(countData, id, answerIdx) {
      let self = this;
      axios.post(`http://localhost:3000/api/vote/answer/${this.$route.params.questionId}/${id}`, {
        count: countData
      }, {headers: {'token': self.$store.state.userToken}}).then(res => {
        console.log(res)
        // console.log(res.data.result.answers[answerIdx].votes)
        // console.log(self.$store.state.loggedUser)
        alert(`${res.data.msg}`);
        window.location.reload();
      }).catch(err => {
        alert('error happened in giving a vote to the answer');
        console.log(err);
      })
    },
    deleteAnswer(data) {
      let self = this,
          confirmDelete =  confirm('are you sure?');
      if(confirmDelete) {
        axios.delete(`http://localhost:3000/api/answer/delete/${this.$route.params.questionId}/${data._id}`).then(res => {
          alert('Answer deleted');
          window.location.reload();
        }).catch(err => {
          alert('delete answer failed');
          console.log(err);
        })
      }
    }
  },
  mounted() {
    this.getOneQuestion();
  }
};
</script>

<style lang="css" scoped>
  #question-detail {
    width: 50%;
    margin: 0 auto;
    padding-top: 60px;
    padding-bottom: 60px;
  }
</style>