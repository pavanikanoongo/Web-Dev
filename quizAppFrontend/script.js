const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");
const progress = (value) => {
    const percentage = (value / time) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.innerHTML = `${value}`;
};

let questions = [],
    time = 30,
    score = 0,
    currentQuestion,
    timer;
let selectedLanguage = "en-GB";  // Default language is English
let isSpeaking = false; // Track if speech is currently active
let currentUtterance = null; // Store the current utterance


// Translate question text to selected language using MyMemory API
async function translateText(text, targetLanguage) {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    try {
        if (data.responseData) {
            return data.responseData.translatedText;
        } else {
            console.error('Translation error:', data);
            return text;  // Return original text if translation fails
        }
    } catch (error) {
        console.error("Error during translation:", error);
        return text;  // Return original text if an error occurs
    }
}

// Function to populate the language dropdown from languageCode.js
function populateLanguageDropdown() {
    const languageSelect = document.querySelector("#language");
    languageSelect.innerHTML = '';  // Clear any existing options

    // Add a default "Select Language" option
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Select Language";  // Default text
    languageSelect.appendChild(defaultOption);

    // Loop through the language object from languageCode.js and add each language as an option
    for (let code in language) {
        const option = document.createElement('option');
        option.value = code;  // The language code (e.g., "en-GB")
        option.textContent = language[code];  // The human-readable language name (e.g., "English")
        languageSelect.appendChild(option);
    }
}

// Function to populate categories dropdown
async function loadCategories() {
    try {
        const response = await fetch("http://localhost:8080/categories/all");
        const data = await response.json();

        const categorySelect = document.querySelector("#category");
        categorySelect.innerHTML = "<option value=''>Select Category</option>"; // Default option

        data.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id; // Ensure backend sends correct ID
            option.textContent = category.name; // Display category name
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    populateLanguageDropdown();
});


// Event listener for when the language is selected
document.querySelector("#language").addEventListener("change", (event) => {
    selectedLanguage = event.target.value;
    if (selectedLanguage && questions.length > 0) {
        currentQuestion = 1;
        showQuestion(questions[currentQuestion - 1]);
    }
});

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
        diff = difficulty.value;
    //api url
    const url = `http://localhost:8080/questions/filter?category=${cat}&difficulty=${diff}&language=${selectedLanguage}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            questions = data.results;
            startScreen.classList.add("hide");
            quiz.classList.remove("hide");
            currentQuestion = 1;
            showQuestion(questions[0]);
        });
};
startBtn.addEventListener("click", startQuiz);

const submitBtn = document.querySelector(".submit");
const nextBtn = document.querySelector(".next");

const showQuestion = async (question) => {
    const questionText = document.querySelector(".question"),
        answersWrapper = document.querySelector(".answer-wrapper"),
        questionNumber = document.querySelector(".number");

    // Translate the question
    const translatedQuestion = await translateText(question.question, selectedLanguage);
    questionText.innerHTML = translatedQuestion;

    // Translate the answers
    const translatedAnswers = await Promise.all(question.incorrect_answers.map(answer =>
        translateText(answer, selectedLanguage)
    ));
    const translatedCorrectAnswer = await translateText(question.correct_answer, selectedLanguage);

    // Combine and shuffle answers
    const answers = [...translatedAnswers, translatedCorrectAnswer];
    answers.sort(() => Math.random() - 0.5);

    answersWrapper.innerHTML = "";
    answers.forEach((answer) => {
        answersWrapper.innerHTML +=
            `<div class="answer">
            <span class="text">${answer}</span>
            <span class="checkbox">
                <span class="icon">✓</span>
            </span>
        </div>`;
    });

    questionNumber.innerHTML =
        `Question <span class="current">${questions.indexOf(question) + 1}</span>/<span class="total">${questions.length}</span>`;

    // Adding event listener on answers
    const answersDiv = document.querySelectorAll(".answer");
    answersDiv.forEach((answer) => {
        answer.addEventListener("click", () => {
            if (!answer.classList.contains("checked")) {
                answersDiv.forEach((answer) => {
                    answer.classList.remove("selected");
                });
                answer.classList.add("selected");
                submitBtn.disabled = false;
            }
        });
    });

    // Add event listener to the speaker icon
    const speakerIcon = document.querySelector(".speaker");
    speakerIcon.addEventListener("click", toggleSpeech);


    // Start timer
    time = timePerQuestion.value;
    startTimer(time);
};

const startTimer = (time) => {
    timer = setInterval(() => {
        if (time >= 0) {
            progress(time);
            time--;
        } else {
            checkAnswer();
        }
    }, 1000);
};

submitBtn.addEventListener("click", () => {
    checkAnswer();
});

const checkAnswer = () => {
    clearInterval(timer);

    const selectedAnswer = document.querySelector(".answer.selected");
    if (!selectedAnswer) {
        // No answer selected → Highlight correct one
        document.querySelectorAll(".answer").forEach((answer) => {
            if (answer.dataset.correct === "true") {
                answer.classList.add("correct");
                answer.querySelector(".icon").style.display = "inline"; // Show ✔
            }
        });
        return;
    }

    const isCorrect = selectedAnswer.dataset.correct === "true";

    if (isCorrect) {
        // ✅ Correct Answer: Green + ✔
        score++;
        selectedAnswer.classList.add("correct");
        selectedAnswer.querySelector(".icon").style.display = "inline"; // Show ✔
    } else {
        // ❌ Wrong Answer: Red
        selectedAnswer.classList.add("wrong");

        // ✅ Highlight Correct Answer
        document.querySelectorAll(".answer").forEach((answer) => {
            if (answer.dataset.correct === "true") {
                answer.classList.add("correct");
                answer.querySelector(".icon").style.display = "inline"; // Show ✔
            }
        });
    }

    // 🚫 Disable further selection
    document.querySelectorAll(".answer").forEach((answer) => {
        answer.classList.add("checked");
    });

    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
};


nextBtn.addEventListener("click", () => {
    nextQuestion();
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
});

const nextQuestion = () => {
    if (currentQuestion < questions.length) {
        currentQuestion++;
        showQuestion(questions[currentQuestion - 1]);
    } else {
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
    window.location.reload();
});


// function to handle speech synthesis
function speakText(text, language) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language; // Set the language
    speechSynthesis.speak(utterance);
}


// Function to handle speech synthesis
function toggleSpeech() {
    const questionText = document.querySelector(".question").innerText;

    if (!questionText) {
        console.error("No question text found.");
        return;
    }

    if (isSpeaking) {
        // If currently speaking, pause or cancel the speech
        if (speechSynthesis.speaking || speechSynthesis.paused) {
            speechSynthesis.cancel(); // Stop the speech
            isSpeaking = false;
            console.log("Speech stopped.");
        }
    } else {
        // If not speaking, start speaking
        if (currentUtterance && speechSynthesis.paused) {
            // Resume if paused
            speechSynthesis.resume();
            isSpeaking = true;
            console.log("Speech resumed.");
        } else {
            // Create a new utterance if none exists
            currentUtterance = new SpeechSynthesisUtterance(questionText);
            currentUtterance.lang = selectedLanguage; // Set the language
            currentUtterance.onend = () => {
                isSpeaking = false; // Reset state when speech ends
                currentUtterance = null; // Clear the current utterance
                console.log("Speech ended.");
            };
            currentUtterance.onerror = (event) => {
                console.error("Speech synthesis error:", event.error);
                isSpeaking = false;
                currentUtterance = null;
            };
            speechSynthesis.speak(currentUtterance);
            isSpeaking = true;
            console.log("Speech started.");
        }
    }
}

document.querySelector(".speaker").addEventListener("click", toggleSpeech);

async function speakWithGoogleTTS(text, languageCode) {
    const apiKey = 'YOUR_GOOGLE_CLOUD_API_KEY';
    const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

    const requestBody = {
        input: { text },
        voice: { languageCode, ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
    audio.play();
}
