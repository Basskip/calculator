var expression = [];
const screen = document.querySelector('#screen');
var currentNumber = "";

function buttonSetup() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            pushButton(e.target.textContent);
        });
    });
}

function pushButton(button) {
    console.log(button);
    
    if (button === "Clear") {
        setDisplay('');
        expression = [];
        currentNumber = "";
    } else if (button === "=") {
        expression.push(parseInt(currentNumber));
        setDisplay(evaluate(expression));
        currentNumber = expression[0].toString();
    } else if (/[0-9]/.test(button)) {
        //A number was pressed
        currentNumber += button;
        appendDisplay(button);
    } else {
        expression.push(parseInt(currentNumber));
        currentNumber = "";
        expression.push(button);
        appendDisplay(button);
    }
}

function evaluate(expr) {
    while (expr.length > 1) {
        var index = -1;
        var evaluated = NaN;

        index = expr.indexOf("x");
        if (index === -1) {
            index = expr.indexOf("÷");
        }
        if (index === -1) {
            index = expr.indexOf("+");
        }
        if (index === -1) {
            index = expr.indexOf("-");
        }

        evaluated = operate(expr[index - 1], expr[index + 1], expr[index]);
        expr.splice(index - 1, 3, evaluated);
    }
    return expr[0];
}

function isNumber(text) {
    return /[0-9]/.test(text);
}

function isOperator(text) {
    return /[-+x÷]/.test(text);
}

function appendDisplay(text) {
    screen.textContent += text;
}

function setDisplay(text) {
    screen.textContent = text;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Nice try!";
    }
    return num1 / num2;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return substract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
        default:
            return 0;
    }
}