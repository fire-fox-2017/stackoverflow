<template>
  <div id="question-list" class="ui items">
    <div class="ui left fluid icon input">
      <input type="text" placeholder="Filter by title..." class="home-search-input">
    </div>

    <div class="ui divided items">
  
      <div v-if="questions.length > 0" v-for="question in questions" class="item">
        <div class="content">
          <a class="header"><router-link :to="{name: 'Question', params: {id: question._id}}">{{ question.title }}</router-link></a>
          <div class="meta">
            <span class="cinema">{{question.content}}</span>
          </div>
          <div class="description">
            <p>Votes Score: {{ question.votes.filter((val)=> {return val.count == 1}).length - question.votes.filter((val)=> {return val.count == -1}).length }}</p>
          </div>
          <div class="extra">
            
            <div v-if="loggedUser">
                <router-link class="ui right floated primary  button" :to="{name: 'Question', params: {id: question._id}}">Answer this Question <i class="right chevron icon"></i></router-link>
              <span @click="vote(1, question._id)" class="left floated ui green button">
                <i class="thumbs up icon">
              </i>upvote
              </span>
              <span @click="vote(-1, question._id)" class="left floated ui red button">
                <i class="thumbs down icon">
              </i>downvote
              </span>
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
      voteCount: []
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
    }).catch(err => {
      alert('Vote failed!');
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
  }
</style>