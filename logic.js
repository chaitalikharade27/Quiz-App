const question = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "Who developed the theory of relativity?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Nikola Tesla", correct: false },
            { text: "Albert Einstein", correct: true },
            { text: "Marie Curie", correct: false },
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers: [
            { text: "Amazon River", correct: false },
            { text: "Nile River", correct: true },
            { text: "Yangtze River", correct: false },
            { text: "Mississippi River", correct: false },
        ]
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: [
            { text: "China", correct: false },
            { text: "Japan", correct: true },
            { text: "South Korea", correct: false },
            { text: "Thailand", correct: false },
        ]
    },
    {
        question: "What is the largest ocean in the world?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ]
    },
    {
        question: "Which bird is known for its ability to mimic human speech?",
        answers: [
            { text: "Parrot", correct: true },
            { text: "Eagle", correct: false },
            { text: "Penguin", correct: false },
            { text: "Owl", correct: false },
        ]
    }
];

const questionelement = document.getElementById("question");
const answerbtn = document.getElementById("answer");
const nextbtn = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;

function startquiz() {
    currentquestionindex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetstate();
    let currentquestion = question[currentquestionindex];
    let questionno = currentquestionindex + 1;
    questionelement.innerHTML = questionno + ". " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerbtn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectanswer);
    });
}

function resetstate() {
    nextbtn.style.display = "none";
    while (answerbtn.firstChild) {
        answerbtn.removeChild(answerbtn.firstChild);
    }
}

function selectanswer(e) {
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct === "true";
    if (isCorrect) {
        selectbtn.classList.add("correct");
        score++;
    } else {
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerbtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbtn.style.display = "block";
}

function handleNextbtn() {
    currentquestionindex++;
    if (currentquestionindex < question.length) {
        showQuestion();
    } else {
        showscore();
    }
}

// Single next button listener
nextbtn.addEventListener('click', () => {
    if (currentquestionindex < question.length) {
        handleNextbtn();
    } else {
        startquiz();
    }
});

function showscore() {
    resetstate();
    questionelement.innerHTML = `You scored ${score} out of ${question.length}!!`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display = "block";
}

startquiz();
