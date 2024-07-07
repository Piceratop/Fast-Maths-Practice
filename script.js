const main = document.querySelector("main");

function changePage(webStatus = "practice") {
   switch (webStatus) {
      case "practice":
         main.innerHTML = `
            <div id="practice">
               <h1>Level Selection</h1>
               <form>
                  <label for="question-type">Type of question:</label>
                  <select id="question-type">
                     <option value="addition">Addition</option>
                     <option value="subtraction">Subtraction</option>
                     <option value="multiplication">Multiplication</option>
                     <option value="division">Division</option>
                  </select>
                  <label for="question-length">Length of a question:</label>
                  <input type="number" id="question-length" min="1"/>
                  <label for="min-value">Minimum value of a number:</label>
                  <input type="text" id="min-value"/>
                  <label for="max-value">Maximum value of a number:</label>
                  <input type="text" id="max-value"/>
                  <label for="decimal-places">Maximum number of decimal places:</label>
                  <input type="number" id="decimal-places" min="0"/>
                  <button id="start-practice">Start</button>
               </form>
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
