<template>
  <div id="question-list" class="ui items">
    <div class="ui left fluid icon input">
      <input type="text" placeholder="Filter by title..." class="home-search-input">
    </div>

    <div class="ui divided items">
  
      <div v-if="questions.length > 0" v-for="question in questions" class="item">
        <div class="content">
          <div class="meta">
            <a class="ui tiny label">Asked by {{question.userId.name}}</a>
          </div>
          <a class="ui large header"><router-link :to="{name: 'Question', params: {questionId: question._id}}">{{ question.title }}</router-link></a> 

          <div class="meta">
            <p class="cinema">{{question.content}}</p>
          </div>

          <div class="description">
            <a data-tooltip="Question score based on user vote" class="ui tiny label grey"><i class="fa fa-question-circle ui" aria-hidden="true"></i>
               {{ question.votes.filter((val)=> {return val.count == 1}).length - question.votes.filter((val)=> {return val.count == -1}).length }} 
           </a>
           <a data-tooltip="Total answer that user provided on this question" class="ui tiny label grey" >
           <i class="fa fa-comments-o" aria-hidden="true"></i>
               {{question.answers.length}}
           </a>
          </div>
          <div class="extra">
            
            <div v-if="loggedUser">
              <router-link class="ui right floated primary tiny label blue" :to="{name: 'Question', params: {questionId: question._id}}">Answer this Question
              <i class="right chevron icon"></i>
              </router-link>
              <router-link class="ui right floated primary tiny label blue" :to="{name: 'EditQuestion', params: {questionId: question._id}}">Edit this Question
              <i class="right chevron icon"></i>
              </router-link>

              <a data-tooltip="upvote question" @click="vote(1, question._id)" class="ui tiny green label">
                <i class="thumbs up icon"></i>
              </a>

              <a data-tooltip="downvote question" @click="vote(-1, question._id)" class="ui tiny label red">
                <i class="thumbs down icon"></i>
              </a>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  
  

</template>

<script>
import { mapMutations } from 'vuex';
export default {

  name: 'Main',
  
  data () {
    return {
      msg: 'Welcome to Hacktiv Overflow',
      questions: [],
      loggedUser: this.$store.state.loggedUser,
      voteCount: [],
    };
  },
  methods: {
   getQuestions() {
    let self = this;
    axios.get('http://localhost:3000/api/question/', {headers: {token: localStorage.getItem('token')}})
    .then(res => {
      self.questions = res.data.questions
      console.log(res.data.questions)
    })
   },
   vote(count, id) {
    let self = this;
    axios.post('http://localhost:3000/api/vote/question/'+id, 
      {count: count}, 
      {headers: {token: self.$store.state.userToken}}).then(res => {
        alert('Vote done!');
        window.location.reload()
    }).catch(err => {
      alert('You already vote!');
      // window.location.reload()
    })
   },
  },
  mounted() {
    this.getQuestions();
  }
};
</script>

<style lang="css" scoped>
  #question-list {
    width: 50%;
    margin: 0 auto;
    padding-top: 60px;
    padding-bottom: 60px;
  }
</style>