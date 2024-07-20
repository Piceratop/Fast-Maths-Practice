const selection = JSON.parse(localStorage.getItem("selection"));
const beep = new Audio("../Audio/beep.wav");
const keyHit = new Audio("../Audio/keyHit.mp3");

const noQuestions = document.getElementById("no-questions");
let questionCount = 1;
const question = document.getElementById("question");
let correctAnswers = 0;
const allQuestions = [];
const timerBar = document.getElementById("timer-bar");
let timer = selection.timer;

function fillQuestion() {
   noQuestions.innerText = `${questionCount++}/${selection.questionSetLength}`;

   let currentQuestion = "";
   for (let i = 1; i <= selection.questionLength; i++) {
      currentTerms = getRandomInt(selection.minValue, selection.maxValue);
      currentQuestion += `${
         compare(currentTerms, "0") === "smaller"
            ? `(${currentTerms})`
            : currentTerms
      }`;
      if (i < selection.questionLength) {
         currentQuestion += ` ${getRandomFromArray(selection.questionType)} `;
      }
   }

   question.innerHTML = currentQuestion;

   // allQuestions.push({
   //    question: currentQuestion,
   //    answer: correctAnswers,
   //    status: "pending",
   // });
}

fillQuestion();

const answer = document.getElementById("answer");

function displayNextQuestion(answerStatus) {
   allQuestions[questionCount - 2].status = answerStatus;
   if (questionCount - 1 === parseInt(selection.questionSetLength)) {
      localStorage.setItem("allQuestions", JSON.stringify(allQuestions));
      window.location.href = "result.html";
   } else {
      beep.play();
      timer = selection.timer;
      answer.innerHTML = "";
      fillQuestion();
   }
}

// document.addEventListener("keydown", (event) => {
//    if (event.key.match(/\d|\.|-/)) {
//       keyHit.play();
//       answer.innerHTML += event.key === "-" ? "&#8722;" : event.key;
//       if (answer.innerHTML === correctAnswers) {
//          displayNextQuestion("correct");
//       } else {
//          console.log(answer.innerHTML, correctAnswers);
//       }
//    } else if (event.key === "Backspace") {
//       answer.innerHTML = answer.innerHTML.slice(0, -1);
//       keyHit.play();
//    } else if (event.key === "Delete") {
//       answer.innerHTML = "";
//       keyHit.play();
//    }
// });

// if (timer > 0) {
//    timerBar.style.display = "block";
//    setInterval(() => {
//       timer -= 0.01;
//       timerBar.style.width = `${(timer / selection.timer) * 100}%`;
//       if (timer <= 0) {
//          displayNextQuestion("incorrect");
//       }
//    }, 10);
// }
