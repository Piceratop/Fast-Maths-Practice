const main = document.querySelector("main");

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
            selection.questionType = ["+", "+", "&#8722;"];
            break;
         case "multiplication":
            selection.questionType = ["&#215;"];
            break;
         case "division":
            selection.questionType = ["&#247;"];
            break;
      }
      localStorage.setItem("selection", JSON.stringify(selection));
      window.location.href = "play.html";
   }
});
