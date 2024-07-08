function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFromArray(arr) {
   return arr[Math.floor(Math.random() * arr.length)];
}

const body = document.querySelector("body");

body.innerHTML =
   `
   <div id="menu">
      <ul>
         <li onclick="location.href='index.html'">Practice</li>
         <li onclick="location.href='statistic.html'">Statistic</li>
         <li onclick="location.href='setting.html'">Setting</li>
      </ul>
   </div>
` + body.innerHTML;
