//----------------------------------------------------------------------Set Variables

//Create list of quiz questions
var questionOne = "Which header element would produce the largest font?";
var questionTwo = "Which term is associated with saving data in your browser?";
var questionThree = "Which method should you use to stop events from executing default behavior?";
var questionFour = "What does CSS stand for?"
var questionFive = "Which method should be used to print information to your browser's inspector?";
var questions = [questionOne, questionTwo, questionThree, questionFour, questionFive];

//Create list of correct answers
var answers = ['A','C','D','C','B'];

//Create list of answer choices
var choicesA = ['h1', 'saveData', 'pause()', 'Control Style Services', 'print()'];
var choicesB = ['h2', 'capture', 'clear()', 'Creative Style Sheets', 'console.log()'];
var choicesC = ['h3', 'localStorage', 'stopDefault()', 'Cascading Style Sheets', 'console.print()'];
var choicesD = ['h4', 'stashData', 'preventDefault()', 'Collapsing Style Services', 'log()'];

//Create JavaScript references to HTML elements
var timerEl = document.getElementById('countdown');
var questionHeaderEl = document.getElementById('question-header');
var questionEl = document.getElementById('question');
var choiceAEl = document.getElementById('choiceA');
var choiceBEl = document.getElementById('choiceB');
var choiceCEl = document.getElementById('choiceC');
var choiceDEl = document.getElementById('choiceD');

var initialsEl = document.getElementById('initials');
initialsEl.style.display = "none";

var initialsEl = document.getElementById('initials');
initialsEl.style.display = "none";

var enterTextEl = document.getElementById('enter-text');
enterTextEl.style.display = "none";

var btnEnterEl = document.getElementById('btnSubmit');
btnEnterEl.style.display = "none";

var scoreEl = document.getElementById('final-score');

var timeLeft = 60;
var questionIndex = 0;

//-----------------------------------------------------------------------Run

//Show time left
timerEl.textContent = "Time: " + timeLeft;

displayQuestion();
countdown();

//-------------------------------------------------------------Event Listeners

//Make answers clickable and increments questionIndex
choiceAEl.addEventListener('click', function () {
    compareAnswer("A");
    questionIndex++;
    if (questionIndex === questions.length) {
        endGame();
    }
});
choiceBEl.addEventListener('click', function() {
    compareAnswer("B");
    questionIndex++;

});
choiceCEl.addEventListener('click', function() {
    compareAnswer("C");
    questionIndex++;

});
choiceDEl.addEventListener('click', function() {
    compareAnswer("D");
    questionIndex++;
});

//--------------------------------------------------------------------Functions

//Controlls timer and associated updates
function countdown() {
    var timeInterval = setInterval(function () {

        if (questionIndex === questions.length) {
            clearInterval(timeInterval);
            endGame();
        }

        if (timeLeft > 0) {
            timerEl.textContent = "Time: " + timeLeft;
            timeLeft--;
            displayQuestion();
        }
        else {
            endGame();
        }

    }, 1000);
}

//Takes 0 arguments and displays the question and choices
function displayQuestion() {
    questionHeaderEl.textContent = "Question " + (questionIndex + 1)
    questionEl.textContent = questions[questionIndex];
    choiceAEl.textContent = "A. " + choicesA[questionIndex];
    choiceBEl.textContent = "B. " + choicesB[questionIndex];
    choiceCEl.textContent = "C. " + choicesC[questionIndex];
    choiceDEl.textContent = "D. " + choicesD[questionIndex];
}

//Takes 1 argument and checks if answer is correct
function compareAnswer(guess) {

    if (guess === answers[questionIndex]) {
        console.log("CORRECT!");
    } else {
        console.log("INCORRECT!");
        timeLeft -= 10;
    }

    if (questionIndex === questions.length - 1) {
        endGame();
    }
}

//Takes 0 arguments and starts end of game processes
function endGame() {
    //Hide non end of game elements
    questionEl.style.display = "none";
    choiceAEl.style.display = "none";
    choiceBEl.style.display = "none";
    choiceCEl.style.display = "none";
    choiceDEl.style.display = "none";
    questionHeaderEl.style.display = "none";
    timerEl.style.display = "none";

    //Show end of game elements
    initialsEl.style.display = "";
    enterTextEl.style.display = "";
    btnEnterEl.style.display = "";

    scoreEl.textContent = 'Your Score: ' + timeLeft;
    btnEnterEl.addEventListener('click', submitInitials);
}

//Takes 0 arguments and saves Initials and Score to localStorage
function submitInitials() {
    //Hide non top score elements
    btnEnterEl.style.display = "none";
    scoreEl.style.display = "none";
    enterTextEl.style.display = "none";
    initialsEl.style.display = "none";

    //Retrieve and save scores to localStorage
    var topScores = [localStorage.getItem("userScores")];
    topScores.push(timeLeft + " - " + initialsEl.value);
    localStorage.setItem("userScores", topScores);

    var fromLocal = localStorage.getItem("userScores");
    fromLocal = fromLocal.split(",").sort().reverse();

    var scoresEl = document.createElement('ul');
    for (var i = 0; i < fromLocal.length; i++) {
        if (fromLocal[i]) {
            console.log(fromLocal[i])
            var li = document.createElement('li');
            li.textContent = fromLocal[i];
            scoresEl.append(li);
        }
    }

    //Display top scores
    var topScoresHeader = document.createElement('h1');
    topScoresHeader.textContent = "Top Scores";

    topScoresScreenEl = document.getElementById('score-list');
    topScoresScreenEl.append(topScoresHeader);
    topScoresScreenEl.append(scoresEl);
}