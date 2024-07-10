const selection = JSON.parse(localStorage.getItem("selection"));
const beep = new Audio("../Audio/beep.wav");
const keyHit = new Audio("../Audio/keyHit.mp3");

const noQuestions = document.getElementById("no-questions");
let questionCount = 1;
const question = document.getElementById("question");
let correctAnswers = 0;
const allQuestions = [];

function fillQuestion() {
   noQuestions.innerText = `${questionCount++}/${selection.questionSetLength}`;

   let currentQuestion = "";
   for (let i = 1; i <= selection.questionLength; i++) {
      currentQuestion += `${getRandomInt(
         selection.minValue,
         selection.maxValue
      )}`;
      if (i < selection.questionLength) {
         currentQuestion += ` ${getRandomFromArray(selection.questionType)} `;
      }
   }
   question.innerHTML = currentQuestion;
   correctAnswers = eval(currentQuestion);

   allQuestions.push({
      question: currentQuestion,
      answer: correctAnswers,
   });
}

fillQuestion();

const answer = document.getElementById("answer");

document.addEventListener("keydown", (event) => {
   if (event.key.match(/^\d+(\.\d)?$/)) {
      keyHit.play();
      answer.innerHTML += event.key;
      if (answer.innerHTML === correctAnswers.toString()) {
         if (questionCount - 1 === parseInt(selection.questionSetLength)) {
            localStorage.setItem("allQuestions", JSON.stringify(allQuestions));
            window.location.href = "result.html";
         } else {
            console.log(questionCount, selection.questionSetLength);
            beep.play();
            fillQuestion();
            answer.innerHTML = "";
         }
      }
   } else if (event.key === "Backspace") {
      answer.innerHTML = answer.innerHTML.slice(0, -1);
      keyHit.play();
   } else if (event.key === "Delete") {
      answer.innerHTML = "";
      keyHit.play();
   }
});
