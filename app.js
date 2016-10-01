//state object
var state = {
	//questions is an object that stores the multiple question values 
	//text, choices, and correctInputIndex. 
	questions = [ 
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

	currentScore = 0, //number right
	currentQuestionIndex = 0, //index of current question
	
	feedbackCorrect = "Good Job!  You didn't disappoint me.",
	feedbackIncorrect = "Oh, well, no.  That's not the answer.  Are you sure you read closely enough?",
	feedbackComplete = "You've finished the quiz.  Good job.  Let's see how you did.",
	lastCorrectAnswer = false,
	route = "start" //keeping track of where you're supposed to be looking
};

//functions that modify the state object
//asks question (game start)
function setRoute(state, route) {
	state.route = route;
};
//reset game
function quizReset(state) {
	state.currentScore = 0,
	state.currentQuestionIndex = 0,
	setRoute(state, "start");
};
//advance quiz to next quesstion. Increases counter.  
//provides final feebadck answer if quiz completed.
function nextQuestion(state) {
	state.currentQuestionIndex++;
	if (state.currentQuestionIndex === state.questions.length) {
		setRoute(state,"feedbackComplete");
	}
	else {
		setRoute(state, "question");
	}
};
//chooses current quiz question with corresponding answer
//also creates boolean for lastAnswerCorrect by comparing with answer @ index
//increments score
function answerQuestion(state, answer) {
	var currentQuestion = state.questions[state.currentQuestionIndex];
	state.lastAnswerCorrect = currentQuestion.correctInputAnswer === answer;
	if (state.lastAnswerCorrect) {
		state.currentScore++;
	}
};
//functions that render the state object
//counter - takes current question index and incremenets
function renderQuestionCounter(state, element) {
	var text = (state.currentQuestion + 1) + "/" + state.questions.length;
	element.text(text);
};
//starts the quiz 
function renderApp(state, element) {
	Object.keys(element).forEach(function(route) {
		elements[route].hide();
	});
	elements[state.route].show();
		if(state.route === "start") {
			renderStartPage(state, elements[start.route]);
		}
		else if (state.route === "question") {
			renderQUestionPage(state, elements[state.route]);
		}
};
//render start page in cource code - doesn't do anything b/c start page
//is preloaded in HTML.  Included in the source code to account for the view
//likely used in other apps and pages so good to include as reference
function renderStartPage(state,element) {
};

//fills in question block - question counter is current question
//question text is the  actual question
//choices is the answers
function renderQuestionsPage(state, element){
	renderQuestionCounter(state, element.find('.question_count'));
  	renderQuestionText(state, element.find('.question_text'));
  	renderChoices(state, element.find('.choices'));
};
//renders currently asked question
function renderQuestionText(state, element) {
	var currentQuestionText = state.questions[state.currentQuestionIndex];
	element.text(currentQuestionText.text);
};
//renders question choices into radio input
//chooses question based on index
//creates copy of choices array and performs function to create radio inputs
function renderChoices(state, element) {
	var currentQuestion = state.questions[state.currentQuestionIndex];
	var choices = currentQuestion.choices.map(function(choice, index) {
		return (
			"<li>" + "<input type='radio' name= 'user-answer' value'" + index + "' required>;" + 
			"<label>" + choice + "</label>" + "</li>"
		);
	});
	element.html(choices);
};


//event listeners
var page_elements = {
	"start":$(".start_page"),
	"question":$(".questions_page")
}
//quiz start button listener
$("form[name='game_start']").submit(function(event) {
	event.preventDefault();
	setRoute(state, "question");
	renderApp(state, page_elements);
});
//quiz reset button listener - set counters to 0
$('.reset_quiz').click(function(event) {
	event.preventDefault();
	quizReset(state);
	renderApp(state, page_elements);
});
//allows user to submit answer and move on to next question
$('.answer_submit').click(function(event) {
	advance(state);
	renderApp(state, page_elements);
});
$(function() {renderApp(state, page_elements);});
