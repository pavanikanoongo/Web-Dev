const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");
const progress = (value) => {
    const percentage = (value / time) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.innerHTML = `${value}`;
}
let questions = [],
    time = 30,
    score = 0,
    currentQuestion,
    timer;

const startBtn = document.querySelector(".start"),
    numQuestions = document.querySelector("#num-questions"),
    category = document.querySelector("#category"),
    difficulty = document.querySelector("#difficulty"),
    timePerQuestion = document.querySelector("#time"),
    quiz = document.querySelector(".quiz"),
    startScreen = document.querySelector(".start-screen");

const startQuiz = () => {
    const num = numQuestions.value,
        cat = category.value,
        diff = difficulty.value
    //api url
    const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            questions = data.results;
            startScreen.classList.add("hide");
            quiz.classList.remove("hide");
            currentQuestion = 1;
            showQuestion(questions[0]);
        })
}
startBtn.addEventListener("click", startQuiz);
const submitBtn = document.querySelector(".submit");
const nextBtn = document.querySelector(".next");
const showQuestion = (question) => {
    const questionText = document.querySelector(".question"),
        answersWrapper = document.querySelector(".answer-wrapper"),
        questionNumber = document.querySelector(".number");
    questionText.innerHTML = question.question;
    //correct and wrong answers are separate so mixing them
    const answers = [...question.incorrect_answers, question.correct_answer.toString(),];
    //correct answers will be always at last , so shuffling the array will
    answers.sort(() => Math.random() - 0.5);
    answersWrapper.innerHTML = "";
    answers.forEach((answer) => {
        answersWrapper.innerHTML += `
        <div class="answer">
              <span class="text">${answer}</span>
              <span class="checkbox">
                <span class="icon">✓</span>
              </span>
            </div>`
    });

    questionNumber.innerHTML = `
    Question <span class="current">${questions.indexOf(question) + 1
        } </span>/<span class="total">${questions.length}</span>
    `;
    //adding event listener on answers
    const answersDiv = document.querySelectorAll(".answer");
    answersDiv.forEach((answer) => {
        answer.addEventListener("click", () => {
            //if answer not already submitted
            if (!answer.classList.contains("checked")) {
                //remove checked from other answer
                answersDiv.forEach((answer) => {
                    answer.classList.remove("selected");
                });
                //add selected on currently clicked
                answer.classList.add("selected");
                //after any answer is selected enable submit btn
                submitBtn.disabled = false;
            }
        });
    });

    //after updating question start timer
    time = timePerQuestion.value;
    startTimer(time);
};
const startTimer = (time) => {
    timer = setInterval(() => {
        if (time >= 0) {
            //if timer more than 0 means time remaining
            //move progress
            progress(time);
            time--;
        } else {
            //if time finishes means less than 0
            checkAnswer();
        }
    }, 1000)
};
submitBtn.addEventListener("click", () => {
    checkAnswer();
});
const checkAnswer = () => {

    //first clear interval when check answer triggered
    clearInterval(timer);

    const selectedAnswer = document.querySelector(".answer.selected");
    //any answer is selected
    if (selectedAnswer) {
        const answer = selectedAnswer.querySelector(".text").innerHTML;
        if (answer === questions[currentQuestion - 1].correct_answer) {
            //if answer matched with current question correct answer
            //increase score
            score++;
            //add correct class on selected
            selectedAnswer.classList.add("correct");
        }
        else {
            //if wrong selected
            //add wrong class on selected but then also add correct on correct answer
            //aading wrong on selected
            selectedAnswer.classList.add("wrong");
            const correctAnswer = document.querySelectorAll(".answer").forEach((answer) => {
                if (answer.querySelector(".text").innerHTML === questions[currentQuestion - 1].correct_answer) {
                    //only add correct class to correct answer
                    answer.classList.add("correct");
                }
            });
        }

    }
    //answer check will also be triggered when time reaches 0
    //if nothing selected and time finishes,add correct class to correct answer
    else {
        const correctAnswer = document.querySelectorAll(".answer").forEach((answer) => {
            if (answer.querySelector(".text").innerHTML === questions[currentQuestion - 1].correct_answer) {
                //only add correct class to correct answer
                answer.classList.add("correct");
            }
        });
    }
    //blocking users to select further
    const answerDiv = document.querySelectorAll(".answer");
    answerDiv.forEach((answer) => {
        answer.classList.add("checked");
        //adding checked class on all answer we check for it when on click answer if its preswnt do nothing
        //also when checked not adding hover effect on checkbox
    });
    //after submit show next btn to go to next question
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
};
//on next btn click,show next question
nextBtn.addEventListener("click", () => {
    nextQuestion();
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
});
const nextQuestion = () => {
    //if there is remaining question
    if (currentQuestion < questions.length) {
        currentQuestion++;
        //show question
        showQuestion(questions[currentQuestion - 1]);
    } else {
        //if no question remaining
        showScore();
    }
};

const endScreen = document.querySelector(".end-screen"),
    finalScore = document.querySelector(".final-score"),
    totalScore = document.querySelector(".total-score");

const showScore = () => {
    endScreen.classList.remove("hide");
    quiz.classList.add("hide");
    finalScore.innerHTML = score;
    totalScore.innerHTML = `/${questions.length}`;
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
    //reload page on click
    window.location.reload();
});