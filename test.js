// ==================== Test ====================

function test(testFunction, input, output) {
   if (testFunction(...input) !== output)
      throw new Error(
         `For the function ${testFunction.name}, ${input} -> ${testFunction(
            ...input
         )}, expected ${output}`
      );
}

// Check valid number

test(checkValidNumber, ["10"], true);
test(checkValidNumber, ["-10"], true);
test(checkValidNumber, ["abc"], false);
test(checkValidNumber, ["10.23"], true);
test(checkValidNumber, ["10..23."], false);
test(checkValidNumber, ["-10.23"], true);
test(checkValidNumber, ["-10..23."], false);

// Normalize

test(normalize, ["-10"], "-10");
test(normalize, ["0.0"], "0");

// Floor

test(floor, ["10.23"], "10");
test(floor, ["-10.23"], "-11");
test(floor, ["10"], "10");
test(floor, ["-10"], "-10");

// Add

test(add, ["10", "-7"], "3");
test(add, ["10.23", "7.23"], "17.46");
test(add, ["-10.23", "7.23"], "-3");
test(add, ["-10.23", "-7.23"], "-17.46");
test(
   add,
   ["123456789123456789123456789", "123456789123456789123456789"],
   "246913578246913578246913578"
);

// Subtract

test(subtract, ["10.23", "-7.23"], "17.46");
test(subtract, ["10.23", "7.23"], "3");
test(subtract, ["-10.23", "7.23"], "-17.46");
test(subtract, ["-10.23", "-7.23"], "-3");
test(
   subtract,
   ["123456789123456789123456789", "123456789123456789123456789"],
   "0"
);

// Multiply

test(multiplyInt, ["123", "132"], "16236");
test(multiplyInt, ["223344556677", "223344556677"], "49882790997245665282329");
test(
   multiply,
   ["-2233.44556677", "2233445566.77"],
   "-4988279099724.5665282329"
);
test(multiply, ["0.0000123", "0.000000345"], "0.0000000000042435");
