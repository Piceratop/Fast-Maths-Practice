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

// ==================== Number functions ====================

function checkValidNumber(s) {
   return /^[+-]?\d*\.?\d+$/.test(s);
}

function normalize(n) {
   if (n.includes("."))
      for (let i = n.length - 1; n[i] !== "."; i--)
         if (n[i] === "0") n = n.slice(0, -1);
         else break;
   else n += ".";
   while (n[1] !== ".")
      if (n[0] === "0") n = n.substring(1);
      else break;
   if (n[0] === "-")
      while (n[1] !== ".")
         if (n[2] === "0") n = n.substring(1);
         else break;
   if (n[n.length - 1] === ".") n = n.slice(0, -1);
   return n;
}

function absoluteValue(n) {
   if (n[0] === "-") n = n.slice(1);
   return normalize(n);
}

function ceiling(n) {
   if (n.includes(".")) {
      decimalN = n.indexOf(".");
      truncated = n.slice(0, decimalN);
      if (n[decimalN + 1] === "0") n = truncated;
      else n = add(truncated, "1");
   }
   return normalize(n);
}

function floor(n) {
   if (n.includes(".")) n = n.slice(0, n.indexOf("."));
   return normalize(n);
}

function inverse(n) {
   if (n[0] === "-") return normalize(n.slice(1));
   return normalize("-" + n);
}

function convertSimilar(a, b) {
   [a, b] = [normalize(a), normalize(b)];
   if (!a.includes(".")) a += ".";
   if (!b.includes(".")) b += ".";
   let decimalA = a.indexOf(".");
   let decimalB = b.indexOf(".");
   for (let i = decimalA; i < decimalB; i++) a = "0" + a;
   for (let i = decimalB; i < decimalA; i++) b = "0" + b;
   for (let i = a.length; i < b.length; i++) a += "0";
   for (let i = b.length; i < a.length; i++) b += "0";
   for (let i = a.length; i < b.length; i++) a += "0";
   for (let i = b.length; i < a.length; i++) b += "0";
   return [a, b];
}

function compare(a, b) {
   let isNegative = false;
   [a, b] = convertSimilar(a, b);
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

function add(a, b) {
   if (compare(a, b) === "smaller") {
      [a, b] = [b, a];
   }
   if (compare(b, "0") === "smaller") {
      return subtract(a, inverse(b));
   }
   [a, b] = convertSimilar(a, b);
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
   return normalize(ans.split("").reverse().join(""));
}

function subtract(a, b) {
   if (compare(b, "0") === "smaller") return add(a, inverse(b));
   if (compare(a, "0") === "smaller") return inverse(add(inverse(a), b));
   if (compare(a, b) === "smaller") return inverse(subtract(b, a));
   [a, b] = convertSimilar(a, b);
   let ans = "";
   let borrow = 0;
   for (let i = a.length - 1; i >= 0; i--) {
      if (a[i] === ".") {
         ans += ".";
         continue;
      }
      let difference = Number(a[i]) - Number(b[i]) - borrow;
      if (difference < 0) {
         difference += 10;
         borrow = 1;
      } else {
         borrow = 0;
      }
      ans += difference;
   }
   return normalize(ans.split("").reverse().join(""));
}

function multiplyInt(a, b) {
   if (compare(a, b) === "smaller") [a, b] = [b, a];
   if (compare(b, "0") === "smaller") return inverse(multiply(a, inverse(b)));
   if (a.length > 7) {
      let a_high = a.slice(0, Math.floor(a.length / 2));
      let a_low = a.slice(Math.floor(a.length / 2));
      let b_high = b.slice(0, Math.floor(b.length / 2));
      let b_low = b.slice(Math.floor(b.length / 2));
      let c1 = multiplyInt(a_high, b_high);
      let c3 = multiplyInt(a_low, b_low);
      let c2 = subtract(
         subtract(multiplyInt(add(a_high, a_low), add(b_high, b_low)), c1),
         c3
      );
      for (let i = 0; i < a_low.length + b_low.length; i++) c1 += "0";
      for (let i = 0; i < a_low.length; i++) c2 += "0";
      return add(add(c1, c2), c3);
   } else return String(Number(a) * Number(b));
}

function getRandomInt(min, max) {
   // return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==================== Test ====================

// Check valid number

console.log(checkValidNumber("10..23"));

// Add

console.log(add("10", "-7"));
console.log(add("10.23", "7.23"));
console.log(add("-10.23", "7.23"));
console.log(add("-10.23", "-7.23"));
console.log(add("123456789123456789123456789", "123456789123456789123456789"));

// Subtract

console.log(subtract("10.23", "-7.23"));
console.log(subtract("10.23", "7.23"));
console.log(subtract("-10.23", "7.23"));
console.log(subtract("-10.23", "-7.23"));
console.log(
   subtract("123456789123456789123456789", "123456789123456789123456789")
);

// Multiply Int

console.log(multiplyInt("123", "132"));
console.log(multiplyInt("223344556677", "223344556677"));
