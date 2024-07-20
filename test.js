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

test(normalize, ["−10"], "−10");
test(normalize, ["-10"], "−10");
test(normalize, ["0.0"], "0");
test(normalize, ["00000.000000"], "0");
test(normalize, ["-0"], "0");

// Absolute Value

test(absoluteValue, ["10"], "10");
test(absoluteValue, ["−10"], "10");
test(absoluteValue, ["10.23"], "10.23");
test(absoluteValue, ["-10.23"], "10.23");

// Ceiling

test(ceiling, ["10.23"], "11");
test(ceiling, ["-10.23"], "−10");
test(ceiling, ["10"], "10");
test(ceiling, ["-10"], "−10");

// Floor

test(floor, ["10.23"], "10");
test(floor, ["-10.23"], "−11");
test(floor, ["10"], "10");
test(floor, ["-10"], "−10");

// Compare

test(compare, ["10", "10"], "equal");
test(compare, ["10", "10.23"], "smaller");
test(compare, ["10.23", "10.23"], "equal");
test(compare, ["10.23", "10"], "greater");
test(compare, ["−10.23", "10.23"], "smaller");
test(compare, ["10.23", "−10.23"], "greater");
test(compare, ["-9", "-8"], "smaller");
test(compare, ["-8", "-9"], "greater");

// Add

test(add, ["10", "−7"], "3");
test(add, ["10.23", "7.23"], "17.46");
test(add, ["−10.23", "7.23"], "−3");
test(add, ["−10.23", "−7.236"], "−17.466");
test(add, ["0.1", "0.2"], "0.3");
test(
   add,
   ["123456789123456789123456789", "123456789123456789123456789"],
   "246913578246913578246913578"
);

// Subtract

test(subtract, ["10.23", "−7.23"], "17.46");
test(subtract, ["10.23", "7.23"], "3");
test(subtract, ["-10.23", "7.23"], "−17.46");
test(subtract, ["-10.23", "−7.23"], "−3");
test(subtract, ["-10.23", "−7.236"], "−2.994");
test(
   subtract,
   ["123456789123456789123456789", "123456789123456789123456789"],
   "0"
);
test(
   subtract,
   ["5465456456132987.123654651654651", "5646546.3132145649465465321654"],
   "5465456450486440.8104400867081044678346"
);

// Multiply

test(multiplyInt, ["123", "132"], "16236");
test(multiplyInt, ["223344556677", "223344556677"], "49882790997245665282329");
test(
   multiply,
   ["-2233.44556677", "2233445566.77"],
   "−4988279099724.5665282329"
);
test(multiply, ["0.0000123", "0.000000345"], "0.0000000000042435");
