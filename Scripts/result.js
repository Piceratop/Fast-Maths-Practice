const resultTable = document.getElementById("result-table");
const result = JSON.parse(localStorage.getItem("allQuestions"));
const complete = new Audio("../Audio/complete.wav");

complete.play();

result.forEach((element) => {
   const tr = document.createElement("tr");
   const tdQuestion = document.createElement("td");
   const tdAnswer = document.createElement("td");
   tdQuestion.innerHTML = element.question;
   tdAnswer.innerHTML = element.answer;
   tr.appendChild(tdQuestion);
   tr.appendChild(tdAnswer);
   resultTable.appendChild(tr);
});
