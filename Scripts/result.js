const resultTable = document.getElementById("result-table");
const result = JSON.parse(localStorage.getItem("allQuestions"));
const complete = new Audio("../Audio/complete.wav");

complete.play();

result.forEach((element) => {
   const tdQuestion = document.createElement("div");
   const tdAnswer = document.createElement("div");
   const tdValidation = document.createElement("div");
   tdQuestion.innerHTML = element.question;
   tdAnswer.innerHTML = element.answer;
   tdValidation.innerHTML =
      element.status === "correct" ? "&#10004;" : "&#10006;";
   resultTable.appendChild(tdQuestion);
   resultTable.appendChild(tdAnswer);
   resultTable.appendChild(tdValidation);
});
