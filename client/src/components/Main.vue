<template>
  <div id="question-list" class="ui items">
    <div class="ui left fluid icon input">
      <input v-model="filterTitle" type="text" placeholder="Filter by title..." class="home-search-input">
    </div>

    <div class="ui divided items">
  
      <div v-if="questions.length > 0" v-for="question in filteredTitle" class="item">
        <div class="content">
          <div class="meta">
            <a v-if="question.userId.name == name" class="ui tiny label">Asked by you</a>
            <a v-else class="ui tiny label" >Asked by {{ question.userId.name}}</a>
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
            
            <div>
              <router-link class="ui right floated primary tiny label blue" :to="{name: 'Question', params: {questionId: question._id}}">Answer this Question
              <i class="right chevron icon"></i>
              </router-link>
              <router-link v-if="loggedUserId == question.userId._id" class="ui right floated primary tiny label blue" :to="{name: 'EditQuestion', params: {questionId: question._id}}">Edit your Question
              <i class="right chevron icon"></i>
              </router-link>
              <a @click="deleteQuestion(question._id)" v-if="loggedUserId == question.userId._id" data-tooltip="delete your question" class="ui right floated primary tiny" href=""><i class="trash red icon"></i></a>

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
      loggedUserId: this.$store.state.loggedUserId,
      name: this.$store.state.name,
      filterTitle: '',
    };
  },
  methods: {
   getQuestions() {
    let self = this;
    axios.get('http://localhost:3000/api/question/', {headers: {token: localStorage.getItem('token')}})
    .then(res => {
      self.questions = res.data.questions
      console.log(res.data.questions)
      console.log(self.loggedUserId)
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
      alert('You already vote for this question!');
      // window.location.reload()
    })
   },
   deleteQuestion(questionId) {
      let self = this;
      var warning = confirm(`Are you sure you want to delete this question?`);
      if(warning) {
        axios.delete(`http://localhost:3000/api/question/delete/${questionId}`, {headers: {token: localStorage.getItem('token')}}).then(res => {
          console.log(res)
          // window.location.href = '#/main';
          window.location.reload()
      })
      self.todos.splice(index, 1);
    } else {
      console.log('cancel delete question');
      
   }
    }
  },
  mounted() {
    this.getQuestions();
  },
  computed: {
    filteredTitle: function() {
      let self = this;
        return self.questions.filter(function(question) {
          let lowerCaseTitle = question.title.toLowerCase();
          return lowerCaseTitle.indexOf(self.filterTitle) !== -1;
        })
    }
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