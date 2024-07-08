function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

const main = document.querySelector("main");

function changePage(webStatus = "practice") {
   switch (webStatus) {
      case "practice":
         main.innerHTML = `
            <div id="practice">
               <h1>Question Set Selection</h1>
               <form id="question-set-selection">
                  <label for="question-type">Type of questions:</label>
                  <select id="question-type">
                     <option value="addition">Addition</option>
                     <option value="addition-subtraction">Addition / Subtraction</option>
                     <option value="multiplication">Multiplication</option>
                     <option value="division">Division</option>
                  </select>
                  <label for="question-length">Length of a question:</label>
                  <input type="number" id="question-length" min="1" value="1"/>
                  <label for="question-set-length">Length of question set:</label>
                  <input type="number" id="question-set-length" min="1" value="1"/>
                  <label for="min-value">Minimum value of a number:</label>
                  <input type="number" id="min-value"/>
                  <label for="max-value">Maximum value of a number:</label>
                  <input type="number" id="max-value"/>
                  <label for="decimal-places">Number of decimal places:</label>
                  <input type="number" id="decimal-places" min="0" value="0"/>
                  <label for="timer">Time (in seconds) for the set <br>(0 for no time limit): </label>
                  <input type="number" id="timer" min="0" value="0"/>

                  <button id="start-practice" type="submit">Start</button>
                  <p id="error-message"></p>
               </form>
            </div>
            `;
         break;
      case "play":
         main.innerHTML = `
            <div id="play">
               <div id="question"></diw>
            </div>
            `;
         break;
   }
}

changePage();

document.addEventListener("click", function (event) {
   if (event.target && event.target.nodeName === "LI") {
      changePage(event.target.innerText.toLowerCase());
   }
});

const startButton = document.getElementById("start-practice");
startButton.addEventListener("click", function (event) {
   event.preventDefault();

   const questionType = document.getElementById("question-type").value;
   const questionLength = parseInt(
      document.getElementById("question-length").value
   );
   const questionSetLength = parseInt(
      document.getElementById("question-set-length").value
   );
   const minValue = parseInt(document.getElementById("min-value").value);
   const maxValue = parseInt(document.getElementById("max-value").value);
   const decimalPlaces = parseInt(
      document.getElementById("decimal-places").value
   );
   const timer = parseInt(document.getElementById("timer").value);
   const selection = {
      questionType,
      questionLength,
      questionSetLength,
      minValue,
      maxValue,
      decimalPlaces,
      timer,
   };
   const errorMessage = document.getElementById("error-message");

   if (!questionLength || questionLength < 1) {
      errorMessage.innerText =
         "Please enter a valid number for question length.";
   } else if (!questionSetLength || questionSetLength < 1) {
      errorMessage.innerText =
         "Please enter a valid number for question set length.";
   } else if (isNaN(minValue)) {
      errorMessage.innerText = "Please enter a valid minimum value.";
   } else if (isNaN(maxValue)) {
      errorMessage.innerText = "Please enter a valid maximum value.";
   } else if (minValue > maxValue) {
      errorMessage.innerText =
         "Minimum value must be less than or equal to maximum value.";
   } else if (isNaN(decimalPlaces) || decimalPlaces < 0) {
      errorMessage.innerText =
         "Please enter a valid number for number of decimal places.";
   } else if (isNaN(timer) || timer < 0) {
      errorMessage.innerText = "Please enter a valid number for timer.";
   } else {
      errorMessage.innerText = "";
      switch (questionType) {
         case "addition":
            selection.questionType = ["+"];
            break;
         case "addition-subtraction":
            selection.questionType = ["+", "&#8722;"];
            break;
         case "multiplication":
            selection.questionType = ["&#215;"];
            break;
         case "division":
            selection.questionType = ["&#247;"];
            break;
      }
      localStorage.setItem("selection", JSON.stringify(selection));
      changePage("play");
   }
});

const question = document.getElementById("question");
if (question) {
   const selection = JSON.parse(localStorage.getItem("selection"));
   for (
      let quetionCount = 0;
      quetionCount < selection.questionSetLength;
      quetionCount++
   ) {
      for (
         let numberCount = 0;
         numberCount < selection.questionLength;
         numberCount++
      ) {
         question.innerHTML += `${getRandomInt(
            selection.minValue,
            selection.maxValue
         )}`;
      }
   }
   changePage("play");
}
