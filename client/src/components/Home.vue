<template>
	<div>
		<banner v-if="!loginStatus"></banner>
		<question-form v-if="loginStatus" :questionForm='questionForm' @createQuestionClicked='createQuestion'></question-form>
		<question-list :questions='questions'></question-list>
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
				questions: [],
				questionForm: {
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
	    createQuestion() {
	      console.log('*** Home createQuestion')
				let self = this
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

	    }, // end of createQuestion
			resetQuestionForm() {
				this.questionForm = { title: '', content: ''}
				console.log("resetQuestionForm")
			}

		}, // end of methods
		created() {
			this.listQuestions();
			console.log(this.questions)
		}
	}
</script>


<style scoped>


</style>
