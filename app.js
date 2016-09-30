//state object
var state = {
	//questions is an object that stores the multiple question values 
	//text, choices, and correctInputIndex.
	var questions = [ 
	{ 
		text: "What is the name of the dinosaur that Harry Dresden reanimates in the novel, 'Dead Beat'?",
		choices: ["Lucy", "Sue", "Nessie", "Rexy"],
		correctInputIndex: 1
	},
	{
		text: "Who shoulder-checks Harry Dresden almost every time he returns to his apartment?",
		choices: ["Thomas", "Karrin", "Mister", "Mouse"],
		correctInputIndex: 2
	},
	{
		text: "According to Harry Dresden in the novel 'Dead Beat'; what will never die?",
		choices: ["Polka", "Butters", "Evil", "Magic"],
		correctInputIndex: 0
	},
	{
		text: "In 'Summer Knight', what injury does Karrin Murphy sustain during the fight at the 24 hour Walmart?",
		choices: ["Gunshot wound by sniper", "Burned by faerie fire", "Knee injury due to slipping on marbles", "Concussion"],
		correctInputIndex: 2
	},
	{
		text: "What stuffed animal does Harry Dresden use to subdue the loup garou when it goes on a rampage in the police station?",
		choices: ["Snoopy", "Garfield", "Teddy Ruxpin", "Hobbs"],
		correctInputIndex: 0
	},
	{
		text: "In the Dresden Files, whose headquarters are located underneath Edinborough, Scotland?",
		choices: ["The Winter Court", "The Council of Seven", "The White Council", "The Red Court"],
		correctInputIndex: 2
	},
	{
		text: "After the events of 'Summer Knight', to which court does Fix belong?",
		choices:  ["The Winter Court", "The Black Court", "The White Court", "The Summer Court"],
		correctInputIndex: 3
	},
	{
		text: "Who is Thomas Wraith?",
		choices: ["The White King", "Karrin Murphy's second husband", "Harry's half-brother", "Harry's favorite bartender"],
		correctInputIndex: 2
	},
	{
		text: "Where do the signatories of the Unseelie Accords risk the wrath of Mab, Queen of Air and Darkness, if they start fighting with one another?",
		choices: ["The Archive", "Accorded Neutral Ground", "Within sight of the sea", "Demonreach"],
		correctInputIndex: 1
	},
	{
		text: "Who is the Chicago mobster with the money colored eyes?",
		choices: ["John Marcone", "Harley McFinn", "Jared Kincaid", "Lex Hamilton"],
		correctInputIndex: 0
	}
	]
	var totalQuestions = questions.length,
	var currentScore = 0, //number right
	var	currentQuestion = 0, //index of current question
	
	var feedback_correct = "Good Job!  You didn't disappoint me.",
	var feedback_incorrect = "Oh, well, no.  That's not the answer.  Are you sure you read closely enough?",
	var feedback_complete = "You've finished the quiz.  Good job.  Let's see how you did.",
	
	var route = "start" //??
}

//functions that modify the state object
//asks question (game start)
function askQuestion(state, question) {

}
//question counter update
//	//each time askQuestion call questionCounter +=1
//	state.totalAskedQuestions++
//}

//questions right wrong counter
//if question answer correctly +=1
//if answered incorrectly counter remains the same
//answer question

//reset
function quizReset(state) {
	state.currentScore = 0,
	state.currentQuestion = 0,
	//setRoute(state, "start")??
} 

function nextQuestion(state) {
if (state.currentQuestion === state.questions.length) {
	state.feedback_complete;
}
}


//functions that render the state object
//counter - takes current question index and incremenets
function renderQuestionCounter(state, element) {
	var text = (state.currentQuestion + 1) + "/" + state.questions.length;
	element.text(text);
}

//event listeners
//quiz start button listener
$('.start_quiz').click(askQuestion(event) {
	event.preventDefault()
});
//quiz reset button listener - set counters to 0
$('.reset_quiz').click(quizReset(event) {
	event.preventDefault()
});
//allows user to submit answer and move on to next question
$('.answer_submit').click(nextQuestion(event) {
	event.preventDefault()
});
