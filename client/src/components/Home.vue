<template>
	<div>
		<banner v-if="!loginStatus"></banner>
		<question-form v-if="loginStatus" :questionForm='questionForm' @createQuestionClicked='createQuestion'></question-form>
		<question-list :questions='questions' @clickedUpVote='upVote' @clickedDownVote='downVote' @clickedEditQuestion='editQuestion'></question-list>
	</div>
</template>



<script>
	import Banner from './Banner'
	import QuestionList from './QuestionList'
	import QuestionDetail from './QuestionDetail'
	import QuestionForm from './QuestionForm'


	export default {
		props: ['loginStatus'],
		data() {
			return {
				questions: [ {author:{name:''}, votes:[]} ],
				questionForm: {
					_id: null,
					title: '',
					content: ''
				}

			}
		}, // end of data
		components: {
			Banner,
			QuestionList,
			QuestionDetail,
			QuestionForm
		},
		methods: {
			listQuestions() {
	      let self = this;

	      axios.get('http://localhost:3000/questions', {
	        headers: { token: localStorage.token }
	      })
	      .then ( response => {
	        console.log(response.data);
	        self.questions = response.data;
	      })
	      .catch( err => {
	        console.log(err);
	      })
	    }, // end of listQuestions
	    createQuestion(questionForm) {
	      console.log('*** Home createQuestion')

      	let index = this.questions.findIndex( (q) => q._id === questionForm._id);
				
				let self = this

      	if( index !== -1) {
      		// update
      		axios.put(`http://localhost:3000/questions/${questionForm._id}`, {
      			title: questionForm.title,
      			content: questionForm.content
      		}, {
      			headers: { token: localStorage.token }
      		})
      		.then ( response => {

      			let updatedQuestion = response.data
      			console.log("updatedQuestion", updatedQuestion)
      			// need to splice the questions array
      			self.questions.splice(index, 1, updatedQuestion)
      			self.resetQuestionForm();
      		})

      	}
      	else {
      		// create new

					axios.post('http://localhost:3000/questions',{
						title: self.questionForm.title,
						content: self.questionForm.content
					}, {
						headers: { token: localStorage.token }
					})
					.then (response => {
						let newQuestion = response.data;
						console.log("newQuestion", newQuestion);

						self.questions.push(newQuestion);
						self.resetQuestionForm();
					})
					.catch (err => {
						console.log(err)
					})
				} // end of else

	    }, // end of createQuestion
	    editQuestion(question) {
	    	this.questionForm = { ...question }
	    	console.log("Home editQuestion")
	    }, // end of editQuestion
			resetQuestionForm() {
				this.questionForm = { _id: null, title: '', content: ''}
				console.log("resetQuestionForm")
			},
			upVote(question_id) {
				console.log('*** Home upVote')
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
						let index = self.questions.findIndex( q => q._id === updatedQuestion._id )
						self.questions.splice(index, 1, updatedQuestion)
					}
				})
				.catch (err => {
					console.log(err)
				})


			}, // end of upVote
			downVote(question_id) {
				console.log('*** Home downVote')
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
						let index = self.questions.findIndex( q => q._id === updatedQuestion._id )
						self.questions.splice(index, 1, updatedQuestion)

					}
				})
				.catch (err => {
					console.log(err)
				})


			} // end of downVote


		}, // end of methods
		created() {
			this.listQuestions();
			console.log(this.questions)
		}
	}
</script>


<style scoped>


</style>
