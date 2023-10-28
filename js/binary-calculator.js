/** type {HTMLDivElement} */
export const display = document.querySelector('[data-id="display"]');

/** type {!NodeListOf<HTMLButtonElement>} */
const buttons = document.querySelectorAll(".btn");
const [
  btnZero,
  btnOne,
  btnClear,
  btnEqual,
  btnSum,
  btnSubtract,
  btnMultiply,
  btnDivide,
] = buttons;

/**
 * Types of Operation supported
 * @enum {number}
 */
export const OperatorType = {
  /** @type {number} */
  Unselected: 0b00,
  /** @type {number} */
  Addition: 0b01,
  /** @type {number} */
  Subtraction: 0b10,
  /** @type {number} */
  Division: 0b11,
  /** @type {number} */
  Multiplication: 0b100,
};

/**
 * @constructor - constructor for the custom error
 * @param {string} message - error message
 * @param {?Object} additionalInfo - extra information about the error
 */
export function DivisionByZeroError(message, additialnalInfo) {
  // Call the parent constructor with message
  Error.call(this, message);
  // Set the name property
  this.name = "DivisionByZeroError";
  // Set custom property
  this.additialnalInfo = additialnalInfo;
}
// Inherit the prototype chain from the built-in Error object
Object.setPrototypeOf(DivisionByZeroError, Error.prototype);

/**
 * @constructor - constructor for the custom error
 * @param {string} message - error message
 * @param {?Object} additionalInfo - extra information about the error
 */
export function InvalidOperatorError(message, additialnalInfo) {
  // Call the parent constructor with message
  Error.call(this, message);
  // Set the name property
  this.name = "InvalidOperatorError";
  // Set custom property
  this.additialnalInfo = additialnalInfo;
}
// Inherit the prototype chain from the built-in Error object
Object.setPrototypeOf(InvalidOperatorError, Error.prototype);

/**
 * @constructor - constructor for the custom error
 * @param {string} message - error message
 * @param {?Object} additionalInfo - extra information about the error
 */
export function InvalidOperandError(message, additialnalInfo) {
  // Call the parent constructor with message
  Error.call(this, message);
  // Set the name property
  this.name = "InvalidOperatorError";
  // Set custom property
  this.additialnalInfo = additialnalInfo;
}
// Inherit the prototype chain from the built-in Error object
Object.setPrototypeOf(InvalidOperandError, Error.prototype);

/** add event listener to the buttons */
for (const button of buttons) {
  button.addEventListener("click", () => {
    switch (button) {
      case btnClear:
        cleanUpDisplay(display);
        break;

      case btnEqual: {
        try {
          validateOperandsCalculateAndShowResult();
        } catch (error) {
          console.error(error);
        }
        break;
      }
      /** Enter the numbers to the display */
      case btnZero:
      case btnOne: {
        /** @type {string} */
        let displayText = getDisplayText(display);
        displayText += button.textContent;
        addTextToDisplay(display, displayText);
        break;
      }
      case btnSum:
      case btnSubtract:
      case btnMultiply:
      case btnDivide:
        try {
          addOperatorToDisplay(display, button.textContent);
        } catch (error) {
          console.error(error);
        }
        break;
      default:
    }
  });
}

/**
 * Calculate the result
 * @param {number} operandOne - First Operand
 * @param {number} operandTwo - Second Operand
 * @throws {DivisionByZeroError} Throws an error if the operandTwo is zero
 * @param {OperatorType} operator - the type of operator to perform
 * @returns {number} result of the calculation
 */
export function calculate(operand1, operand2, operator) {
  /** @type {number} */
  let result = 0;

  /** check which operation to perform */
  switch (operator) {
    case OperatorType.Addition:
      result = operand1 + operand2;
      break;
    case OperatorType.Subtraction:
      result = operand1 - operand2;
      break;
    case OperatorType.Multiplication:
      result = operand1 * operand2;
      break;
    case OperatorType.Division:
      if (operand2 === 0) {
        throw new DivisionByZeroError("Division by zero is not allowed.", {
          code: 404,
          dividend: operand1,
          divisor: operand2,
        });
      }
      result = operand1 / operand2;
      break;
    default:
      console.warn(" How did we get here?");
  }

  return result;
}

/**
 * Clean the display
 * @param {HTMLDivElement} display
 */
export function cleanUpDisplay(display) {
  display.textContent = "";
}

/**
 * Add text to the display
 * @param {HTMLDivElement - the HTMLElement to set the text to
 * @param {string} text - text to be added to the display
 */
export function addTextToDisplay(display, text) {
  display.textContent = text;
}

/**
 * Get text from display
 * @param {HTMLDivElement} display - the source element
 * @returns {string} text - the text currently held in the display
 */
export function getDisplayText(display) {
  return display.textContent?.trim() ?? "";
}

/**
 * Add operator to display
 * @param {HTMLDivElement} display
 * @param {string} operatorText - the operator to use with the operands
 * @throws {InvalidOperandError|InvalidOperatorError}
 */
export function addOperatorToDisplay(display, operatorText) {
  /** @type {string} */
  let displayText = getDisplayText(display);
  /** @type {!string} */
  const lastChar = getLastCharFromString(displayText);

  if (lastChar.length === 0) {
    throw new InvalidOperandError(
      "Operand is invalid, so the operator cannot be added to it",
      { operand: "undefined" },
    );
  }

  /** @type <!Array<string> */
  const operators = ["+", "-", "*", "/"];

  if (operators.includes(lastChar)) {
    throw new InvalidOperatorError("Multiple Successive Operators", {
      existingOperator: lastChar,
      newOperator: operatorText,
    });
  }

  if (isOperandValid(displayText)) {
    displayText += operatorText;
    addTextToDisplay(display, displayText);
  }
}

/**
 * Get the last character from a input string
 * @param {string} str - the source string
 * @returns {string} - last character
 */
export function getLastCharFromString(str) {
  return str?.trim()?.split("")?.at(-1) ?? "";
}

/**
 * Check is an operand is valid
 * @param {string} operandText - the operand
 * @returns {boolean} true or false
 */
export function isOperandValid(operandText) {
  return !Number.isNaN(parseInt(operandText, 2));
}

/**
 * Perform the final calculation
 */
export function validateOperandsCalculateAndShowResult() {
  let displayText = getDisplayText(display);
  if (displayText.length === 0) return;

  let operatorInUse = "";
  const operatorsMap = {
    "+": OperatorType.Addition,
    "-": OperatorType.Subtraction,
    "*": OperatorType.Multiplication,
    "/": OperatorType.Division,
  };

  for (const key in operatorsMap) {
    if (displayText.includes(key)) {
      operatorInUse = key;
      break;
    }
  }

  const operands = displayText.split(operatorInUse);

  const operandOne = operands[0];
  const operandTwo = operands[1];

  if (!isOperandValid(operandOne) || !isOperandValid(operandTwo)) {
    throw new InvalidOperandError("Valid Operands Required", {
      operandOne,
      operandTwo,
    });
  }

  /** @type {number} */
  const result = calculate(
    parseInt(operandOne, 2),
    parseInt(operandTwo, 2),
    operatorsMap[operatorInUse],
  );

  const resultText = result.toString(2);
  addTextToDisplay(display, resultText);
}

//|\\/\\
