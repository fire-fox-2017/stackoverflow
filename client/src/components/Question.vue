<template>
  <div id="question-detail" class="ui items">
    <div class="ui divided items">
      <div class="item">
        <div class="content">
          <a class="header">{{question.title}}</a>
          <div class="meta">
            <span class="cinema">{{question.content}}</span>
          </div>
          <div class="description">
           <!--  <p>Votes Score: {{ question.votes.filter((val)=> {return val.count == 1}).length - question.votes.filter((val)=> {return val.count == -1}).length }}</p> -->
          </div>
        </div>
      </div>
    </div>
    
    <div class="ui comments">
      <h3 class="ui dividing header">Answers</h3>
      <div v-for="(answer, index) in question.answers" class="comment">
        <div class="content">
          <a class="author">{{answer.userId.name}}</a>
          <div class="metadata">
            <!-- <span class="date">5 days ago</span> -->
          </div>
          <div class="text">
            {{answer.content}}
          </div>
          <div class="actions">
            <a @click="voteAnswer(1, question.answers[index]._id)" class="reply"><i class="thumbs outline green up icon">
              </i>Upvote answer</a>
            <a @click="voteAnswer(-1, question.answers[index]._id)" class="reply"><i class="thumbs outline yellow down icon">
              </i>Downvote answer</a>
            <a @click="deleteAnswer(question.answers[index])" class="reply"><i class="trash outline red icon"></i></a>
               
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
      loggedUser: this.$store.state.loggedUser
    };
  },
  methods: {
    getOneQuestion() {
      let self = this;
      axios.get('http://localhost:3000/api/question/'+this.$route.params.questionId, {headers: {token: localStorage.getItem('token')}})
      .then(res => {
        self.question = res.data.question;
        console.log(res.data.question.answers)
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
    voteAnswer(countData, id) {
      let self = this;
      axios.post(`http://localhost:3000/api/vote/answer/${this.$route.params.questionId}/${id}`, {
        count: countData
      }, {headers: {'token': self.$store.state.userToken}}).then(res => {
        alert('Vote answer done');
      }).catch(err => {
        alert('Vote failed');
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