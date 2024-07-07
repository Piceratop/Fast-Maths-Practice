const main = document.querySelector("main");
let webStatus = "practice";

function changePage() {
   switch (webStatus) {
      case "practice":
         main.innerHTML = `
            <div id="practice">
               <h1>Level Selection</h1>
               <form>Type of question: <select id="question-type">
                  <option value="addition">Addition</option>
                  <option value="subtraction">Subtraction</option>
                  <option value="multiplication">Multiplication</option>
                  <option value="division">Division</option>
               </select></form>
            </div>
            `;
         break;
   }
}

changePage();

document.addEventListener("click", function (event) {
   if (event.target && event.target.nodeName === "LI") {
      webStatus = event.target.innerText.toLowerCase();
      changePage();
   }
});
