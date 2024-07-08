const selection = JSON.parse(localStorage.getItem("selection"));
const noQuestions = document.getElementById("no-questions");
let questionCount = 1;
const question = document.getElementById("question");
let correctAnswers = 0;

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
   correctAnswers * eval(currentQuestion);
}

fillQuestion();

const answer = document.getElementById("answer");

document.addEventListener("keydown", (event) => {
   if (event.key.match(/^\d|\.$/)) {
      answer.innerHTML += event.key;
   } else if (event.key === "Backspace") {
      answer.innerHTML = answer.innerHTML.slice(0, -1);
   } else if (event.key === "Delete") {
      answer.innerHTML = "";
   }
});
