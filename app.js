//state object
var state = {
	//questions is an object that stores the multiple question values 
	//text, choices, and correctInputIndex. 
	questions: [ 
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
	],
	
	feedbackCorrect: [
		"Good Job!  You didn't disappoint me.",
		"I knew all that time with your nose in a book would pay off",
		"Hey, maybe you should be writing this quiz.",
		"Are you in cahoots with the Leanansidhe?  Because you seem to know an awful lot about this stuff. "
	],
	feedbackIncorrect: [
		"Oh, well, no.  That's not the answer.  Are you sure you read closely enough?",
		"Ugh, did you pay attention at all when you were reading?",
		"What did you do?  Just watch the t.v. show?",
		"If Morgan were still alive, you'd have the Doom of Damocles exacted immediately.",
		"Well, this is sort of a disappointment.  Maybe you should check out your local library."
	],
	
	score: 0, //number right
	currentQuestionIndex: 0, //index of current question
	lastCorrectAnswer: false,
	route: "start", //keeping track of where you're supposed to be looking
	feedbackRandom: 0
};

//functions that modify the state object
//asks question (game start)
function setRoute(state, route) {
	state.route = route;
};
//reset game
function quizReset(state) {
	state.score = 0;
	state.currentQuestionIndex = 0;
	setRoute(state, "start");
};

//chooses current quiz question with corresponding answer
//also creates boolean for lastAnswerCorrect by comparing with answer @ index
//increments score
function answerQuestion(state, answer) {
	var currentQuestion = state.questions[state.currentQuestionIndex];
	state.lastAnswerCorrect = currentQuestion.correctInputIndex === answer;
	if (state.lastAnswerCorrect) {
		state.score++;
	}
	selectFeedback(state);
	setRoute(state, "answer_feedback");
};
//selectFeedback function uses math module to select random number for feedback option
function selectFeedback(state) {
	state.feedbackRandom = Math.random();
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

//functions that render the state object

//starts the quiz 
//defaults to hiding all routes- shows only current route
function renderApp(state, elements) {
	Object.keys(elements).forEach(function(route) {
		elements[route].hide();
	});
	elements[state.route].show();

	if(state.route === "start") {
		renderStartPage(state, elements[state.route]);
	}
	else if (state.route === "question") {
		renderQuestionsPage(state, elements[state.route]);
	}
	else if (state.route === "answer_feedback") {
		renderAnswerFeedbackPage(state, elements[state.route]);
	}
	else if (state.route === "feedbackComplete") {
		renderFinalFeedbackPage(state, elements[state.route]);
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
function renderQuestionsPage(state, element) {
	renderQuestionCounter(state, element.find('.question_count'));
  	renderQuestionText(state, element.find('.question_text'));
  	renderChoices(state, element.find('.choices'));
};
//renderAnswerFeedbackPage changes the feedback header, text, and provides a continue button
function renderAnswerFeedbackPage(state, element) {
	renderAnswerFeedbackHeader(state, element.find(".feedback_header"));
	renderAnswerFeedbackText(state, element.find(".feedback_text"));
	renderNextButtonText(state, element.find(".answer_submit"));
};
//renderFinalFeedbackPage provides the end feedback to the user including comment 
function renderFinalFeedbackPage(state,element) {
	renderfinalFeedbackText(state, element.find(".results_text"));
};
//counter adds 1 to the index so counter doesn't start at 0- 
function renderQuestionCounter(state, element) {
	var text = (state.currentQuestionIndex + 1) + "/" + state.questions.length;
	element.text(text);
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
			'<li>' + 
				'<input type="radio" name="user_answer" value="" ' + index +'"" required>' + 
				'<label>' + choice + '</label>' + 
			'</li>'
		);
	});
	element.html(choices);
};
//renders a header for correct or incorrect answers
function renderAnswerFeedbackHeader(state, element) {
  var html = state.lastAnswerCorrect ?
      "<h6 class='user-was-correct'>Yes!</h6>" :
      "<h1 class='user-was-incorrect'>Umm, no...</>";
  element.html(html);
};

function renderAnswerFeedbackText(state, element) {
  var choices = state.lastAnswerCorrect ? state.feedbackCorrect : state.feedbackIncorrect;
  var text = choices[Math.floor(state.feedbackRandom * choices.length)];
  element.text(text);
};
//changes text displayed in next button if quiz has more questions or if it is complete
function renderNextButtonText(state, element) {
    var text = state.currentQuestionIndex < state.questions.length - 1 ?
      "Next" : "How did I do?";
  element.text(text);
};



//provides final score of quiz
function renderFinalFeedbackText(state, element) {
  var text = "You got " + state.score + " out of " +
    state.questions.length + " questions right.";
  element.text(text);
};
//event listeners
var page_elements = {
	"start":$(".start_page"),
	"question":$(".questions_page"),
	"answer_feedback": $(".answer_feedback_page"),
	"final_feedback": $(".final_feedback_page")
};
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

//checks user answer
$("form[name ='current_question']").submit(function(event) {
	event.preventDefault();
	var answer = $("input[name='user_answer']:checked").val();
	answer = parseInt(answer, 10);
	answerQuestion(state, answer);
	renderApp(state, page_elements);
});

//allows user to submit answer and move on to next question
//event.preventDefault acts weird - users can skip answers but are requested to submit
$('.answer_submit').click(function(event) {
	event.preventDefault();
	nextQuestion(state);
	renderApp(state, page_elements);
});

$(function() {renderApp(state, page_elements);});
