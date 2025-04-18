const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

const progress = (value) => {
    const percentage = (value / time) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.innerHTML = `${value}`;
};

let questions = [], time = 30, score = 0, currentQuestion, timer;
let selectedLanguage = "en-GB";
let isSpeaking = false;
let currentUtterance = null;

// Function to fetch and populate categories
async function loadCategories() {
    try {
        const response = await fetch("http://localhost:8080/categories/all");
        const data = await response.json();
        const categorySelect = document.querySelector("#category");
        categorySelect.innerHTML = "<option value=''>Select Category</option>";
        data.forEach(category => {
            const option = document.createElement("option");
            option.value = category.name;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const startQuiz = async () => {
    const num = document.querySelector("#num-questions").value;
    const cat = document.querySelector("#category").value;
    const diff = document.querySelector("#difficulty").value;
    const lang = document.querySelector("#language").value;

    // 🚨 Separate checks for category and language
    if (!cat) {
        alert("Please select a category before starting the quiz.");
        return;
    }
    if (!diff) {
        alert("Please select a difficulty level before starting the quiz.");
        return;
    }

    if (!lang) {
        alert("Please select a language before starting the quiz.");
        return;
    }
    // Convert language code to language name
    const languageName = "English"; // Always send English to the backend
    time = parseInt(document.querySelector("#time").value);

    const url = `http://localhost:8080/questions/filter?category=${encodeURIComponent(cat)}&difficulty=${encodeURIComponent(diff)}&language=${encodeURIComponent(languageName)}`;
    try {
        const response = await fetch(url);
        questions = await response.json();

        questions = shuffleArray(questions).slice(0, num);
        if (questions.length > 0) {
            document.querySelector(".start-screen").classList.add("hide");
            document.querySelector(".quiz").classList.remove("hide");
            currentQuestion = 0;
            showQuestion(questions[currentQuestion]); // ✅ Show first question only once
        } else {
            console.error("No questions available!");
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
};
const startTimer = () => {
    let remainingTime = time;

    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.querySelector(".progress-text");

    clearInterval(timer); // Clear old timer if any

    // ✅ Instantly reset styles
    progressBar.style.transition = "none";
    progressBar.style.width = "100%";
    progressText.textContent = `${remainingTime}`;

    // 🔁 Force reflow to re-apply transition cleanly
    void progressBar.offsetWidth;

    // ✅ Start animation
    progressBar.style.transition = `width ${time}s linear`;
    progressBar.style.width = "0%";

    // ✅ Delay first countdown update by 1s to avoid fast 10 → 9
    timer = setTimeout(() => {
        remainingTime--;

        progressText.textContent = `${remainingTime}`;

        // Then switch to interval for remaining seconds
        timer = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                progressText.textContent = `${remainingTime}`;
            } else {
                clearInterval(timer);
                checkAnswer();
                submitBtn.style.display = "none";
                nextBtn.style.display = "block";
            }
        }, 1000);
    }, 1000); // 1-second initial delay
};



const submitBtn = document.querySelector(".submit");
const nextBtn = document.querySelector(".next");

async function translateText(text, targetLanguage) {
    if (targetLanguage === "en" || targetLanguage === "en-GB" || targetLanguage === "en-US") {
        return text; // ✅ Skip translation if language is English
    }
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

const showQuestion = async (question) => {
    try {
        if (!question) {
            console.error("Error: Question is undefined or null.");
            return;
        }
       
        const questionText = document.querySelector(".question");
        const answersWrapper = document.querySelector(".answer-wrapper");
        const questionNumber = document.querySelector(".number");


        // 🔹 Get selected language
        const targetLanguage = document.querySelector("#language").value;

        // 🔹 Translate question
        const translatedQuestion = await translateText(question.questionText, targetLanguage);
        questionText.innerHTML = translatedQuestion;


        // ✅ Fetch answers for the specific question
        const answerResponse = await fetch(`http://localhost:8080/answers/by-question?questionId=${question.id}`);
        const answerData = await answerResponse.json();

        if (!answerData || answerData.length === 0) {
            console.error("Error: No answers found for question ID", question.id);
            return;
        }
        // 🔹 Translate answers
        const translatedAnswers = await Promise.all(
            answerData.map(async (ans) => ({
                text: await translateText(ans.answerText, targetLanguage), // Translate answer
                isCorrect: ans.isCorrect,
            }))
        );

        // ✅ Shuffle translated answers randomly
        translatedAnswers.sort(() => Math.random() - 0.5);

        // ✅ Display translated answers
        answersWrapper.innerHTML = "";
        translatedAnswers.forEach(answer => {
            answersWrapper.innerHTML += `
                <div class="answer" data-correct="${answer.isCorrect}">
                    <span class="text">${answer.text}</span>
                    <span class="checkbox">
                        <span class="icon">✓</span>
                    </span>
                </div>`;
        });

        questionNumber.innerHTML = `Question ${currentQuestion + 1}/${questions.length}`;

        // ✅ Add event listener to answers
        const answersDiv = document.querySelectorAll(".answer");
        answersDiv.forEach(answer => {
            answer.addEventListener("click", () => {
                if (!answer.classList.contains("checked")) {
                    answersDiv.forEach(a => a.classList.remove("selected"));
                    answer.classList.add("selected");
                    submitBtn.disabled = false;
                }
            });
        });

        startTimer(time); // ✅ Start timer for this question

    } catch (error) {
        console.error("Error in showQuestion():", error);
    }
};



// Function to fetch and display questions
document.querySelector(".start").addEventListener("click", startQuiz);

submitBtn.addEventListener("click", () => {
    checkAnswer();
});
const checkAnswer = () => {
    clearInterval(timer);

    const selectedAnswer = document.querySelector(".answer.selected");
    const answers = document.querySelectorAll(".answer");

    if (!selectedAnswer) {
        // ✅ No answer selected: Show correct answer & change button
        answers.forEach(answer => {
            if (answer.dataset.correct === "true") {
                answer.classList.add("correct");
                const icon = answer.querySelector(".icon");
                if (icon) icon.style.opacity = "1"; // Show tick only if it exists
            }
        });

        // ✅ Change Submit to Next if no answer is selected
        submitBtn.style.display = "none";
        nextBtn.style.display = "block";
        return;
    }

    const isCorrect = selectedAnswer.dataset.correct === "true";

    if (isCorrect) {
        score++;
        selectedAnswer.classList.add("correct");
    } else {
        selectedAnswer.classList.add("wrong");

        // ✅ Highlight Correct Answer
        answers.forEach(answer => {
            if (answer.dataset.correct === "true") {
                answer.classList.add("correct");
                const icon = answer.querySelector(".icon");
                if (icon) icon.style.opacity = "1"; // Show tick only if it exists
            }
        });
    }

    answers.forEach(answer => answer.classList.add("checked"));

    // ✅ Change Submit button to Next
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
};




const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++; // ✅ First, increment currentQuestion
        showQuestion(questions[currentQuestion]); // ✅ Then, show the new question
        submitBtn.style.display = "block";
        nextBtn.style.display = "none";
    } else {
        showScore();
    }
};

nextBtn.addEventListener("click", nextQuestion); // ✅ Just call nextQuestion()

const endScreen = document.querySelector(".end-screen"),
    finalScore = document.querySelector(".final-score"),
    totalScore = document.querySelector(".total-score");
const showScore = () => {
    document.querySelector(".end-screen").classList.remove("hide");
    document.querySelector(".quiz").classList.add("hide");
    document.querySelector(".final-score").innerText = `${score} / ${questions.length}`;
};

document.querySelector(".restart").addEventListener("click", () => {
    window.location.reload();
});

// Function to populate the language dropdown from languageCode.js
function populateLanguageDropdown() {
    const languageSelect = document.querySelector("#language");
    if (!languageSelect) {
        console.error("Language dropdown not found.");
        return;
    }

    languageSelect.innerHTML = ''; // Clear any existing options

    // Add a default "Select Language" option
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Select Language"; // Default text
    languageSelect.appendChild(defaultOption);

    // Check if 'language' object is available (from languageCode.js)
    if (typeof language !== "undefined") {
        for (let code in language) {
            const option = document.createElement('option');
            option.value = code;  // The language code (e.g., "en-GB")
            option.textContent = language[code];  // The human-readable language name
            languageSelect.appendChild(option);
        }
    } else {
        console.error("Language object not found. Make sure languageCode.js is loaded.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populateLanguageDropdown();
    loadCategories();
});

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

    // Cancel any ongoing speech first
    speechSynthesis.cancel();

    // Create a new utterance
    currentUtterance = new SpeechSynthesisUtterance(questionText);
    currentUtterance.lang = selectedLanguage; // Set selected language
    currentUtterance.rate = 1; // Normal speed
    currentUtterance.pitch = 1; // Normal pitch

    currentUtterance.onstart = () => console.log("Speech started.");
    currentUtterance.onend = () => console.log("Speech finished.");
    currentUtterance.onerror = (event) => console.error("Speech error:", event.error);

    // Speak the question
    speechSynthesis.speak(currentUtterance);
}

document.querySelector(".speaker").addEventListener("click", toggleSpeech);


// async function speakWithGoogleTTS(text, languageCode) {
//     const apiKey = 'YOUR_GOOGLE_CLOUD_API_KEY';
//     const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

//     const requestBody = {
//         input: { text },
//         voice: { languageCode, ssmlGender: 'FEMALE' },
//         audioConfig: { audioEncoding: 'MP3' },
//     };

//     const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody),
//     });

//     const data = await response.json();
//     const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
//     audio.play();
// }
