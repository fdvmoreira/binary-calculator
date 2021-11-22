// [] @fixup - performe operationwith the result from previous operation
// [] @fixup - allow additon with zero values
// [] @cleanup - refactor the source for better readability and performance
// [] @cleanup - remove redundant code

const display = document.getElementById("res");

const buttons = document.getElementById("btns").children;
console.log(buttons);
const [btnZero, btnOne, btnClear, btnEqual, btnSum, btnSubtract, btnMultiply, btnDivide] = buttons;

let displayText = "";
let operator = "";
let operand1 = 0;
let operand2 = 0;
let hasOperator = false;



/** add text(numbers) to the display */
for (const it of buttons) {
    it.addEventListener("click", event => {
        switch (it) {
            case btnClear:
                cleanUp();
                cleanUpDisplay();
                break;

            case btnEqual:
                /** Check if we have operator and both operands before performing the operation */
                if (hasOperator && displayText.split(operator).length === 2) {
                    const operands = displayText.split(operator);
                    //console.log(operands.length);
                    operand1 = parseInt(operands[0], 2);
                    operand2 = parseInt(operands[1], 2);

                    /** Make sure that the operands are non-negative or zero */
                    if (operand1 >= 1 && operand2 >= 1) {

                        const result = calculate(operand1, operand2, operator);

                        displayText = result;
                        addTextToDisplay();

                        /** TODO Remove line below */
                        console.log("Function called.");
                        //addTextToDisplay();

                    } else {
                        addTextToDisplay('Invalid Operands.');
                        console.log('Invalid Operands.');
                    }
                    cleanUp();
                }

                break;
                /** Enter the numbers to the display */
            case btnZero:
            case btnOne:
                displayText += it.childNodes[0].textContent;

                /** TODO remove line below */
                console.log(displayText);
                addTextToDisplay();
                break;

            default:
                /** Ensure that only one operator is added to the operations
                by check the text already added **/
                operator = it.childNodes[0].textContent;
                if (displayText.length >= 1 && !hasOperator) {
                    displayText += operator;
                    hasOperator = true;

                    /** TODO remove line below */
                    console.log(operator);
                    addTextToDisplay();
                }
                break;
        }
    });

}

const calculate = (operand1, operand2, operator) => {

    let result = 0;

    /** check which operation to perform */
    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
        default:
            console.warn(" How did we get here ?");
    }

    /** TODO remove line below */
    console.log("result " + result.toString(2) + " = " + result);
    return result.toString(2);
}


/** Reset everything to default */
const cleanUp = () => {
    displayText = "";
    operator = "";
    hasOperator = false;
}

const cleanUpDisplay = () => {
    display.textContent = "";
}

/** Add text to the display */
const addTextToDisplay = (text) => {
    display.innerText = text || displayText;
}