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

// Number functions

function checkValidNumber(s) {
   return /^[+-]?\d*\.?\d+$/.test(s);
}

function compare(a, b) {
   let isNegative = false;
   if (!a.includes(".")) {
      a += ".";
   }
   if (!b.includes(".")) {
      b += ".";
   }
   let decimalA = a.indexOf(".");
   let decimalB = b.indexOf(".");
   for (let i = decimalA; i < decimalB; i++) {
      a = "0" + a;
   }
   for (let i = decimalB; i < decimalA; i++) {
      b = "0" + b;
   }
   for (let i = a.length; i < b.length; i++) {
      a += "0";
   }
   for (let i = b.length; i < a.length; i++) {
      b += "0";
   }
   for (let i = a.length; i < b.length; i++) {
      a += "0";
   }
   for (let i = b.length; i < a.length; i++) {
      b += "0";
   }
   for (let i = 0; i < a.length; i++) {
      if (a[i] > b[i]) {
         if (isNegative) {
            return "smaller";
         }
         return "greater";
      } else if (a[i] < b[i]) {
         if (isNegative) {
            return "greater";
         }
         return "smaller";
      } else if (a[i] === "-") {
         isNegative = true;
      }
   }
   return "equal";
}

function floor(n) {
   if (!n.includes(".")) {
      return n;
   }
   return n.slice(0, n.indexOf("."));
}

function ceiling(n) {
   if (!n.includes(".")) {
      return n;
   }
   decimalN = n.indexOf(".");
   truncated = n.slice(0, decimalN);
   if (n[decimalN + 1] === "0") {
      return truncated;
   } else {
      return add(truncated, "1");
   }
}

function absoluteValue(n) {
   if (n[0] === "-") {
      return n.slice(1);
   }
   return n;
}

function inverse(n) {
   if (n[0] === "-") {
      return n.slice(1);
   }
   return "-" + n;
}

function add(a, b) {
   if (compare(a, b) === "smaller") {
      [a, b] = [b, a];
   }
   if (!a.includes(".")) {
      a += ".";
   }
   if (!b.includes(".")) {
      b += ".";
   }
   let decimalA = a.indexOf(".");
   let decimalB = b.indexOf(".");
   for (let i = decimalA; i < decimalB; i++) {
      a = "0" + a;
   }
   for (let i = decimalB; i < decimalA; i++) {
      b = "0" + b;
   }
   for (let i = a.length; i < b.length; i++) {
      a += "0";
   }
   for (let i = b.length; i < a.length; i++) {
      b += "0";
   }
   let ans = "";
   let carry = 0;
   for (let i = a.length - 1; i >= 0; i--) {
      if (a[i] === ".") {
         ans += ".";
         continue;
      }
      let sum = Number(a[i]) + Number(b[i]) + carry;
      ans += sum % 10;
      carry = Math.floor(sum / 10);
   }
   if (carry > 0) {
      ans += "1";
   }
   return ans.split("").reverse().join("").replace(/\.*$/, "");
}

function getRandomInt(min, max) {
   // return Math.floor(Math.random() * (max - min + 1)) + min;
}
