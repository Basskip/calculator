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

    disableOperators(true);
}

function disableOperators(bool) {
    var operators = document.querySelectorAll('.operator');
    if (bool === true) {
        operators.forEach((btn) => {
            btn.disabled = true;
        });
    } else {
        operators.forEach((btn) => {
            btn.disabled = false;
        });
    }
}

function disableNumbers(bool) {
    var numbers = document.querySelectorAll('.number');
    if (bool === true) {
        numbers.forEach((btn) => {
            btn.disabled = true;
        });
    } else {
        numbers.forEach((btn) => {
            btn.disabled = false;
        });
    }
}

function disableEquals(bool) {
    var equals = document.getElementById("equals");
    if (bool === true) {
        equals.disabled = true;
    
    } else {
        equals.disabled = false;            
    }
}

function pushButton(button) {
    
    if (button === "Clear") {
        setDisplay('');
        expression = [];
        currentNumber = "";
        disableOperators(true);
        disableNumbers(false);
        disableEquals(false);
    } else if (button === "=") {
        expression.push(parseInt(currentNumber));
        setDisplay(evaluate(expression));
        currentNumber = expression[0].toString();
        expression = [];
    } else if (/[0-9]/.test(button)) {
        //A number was pressed
        currentNumber += button;
        appendDisplay(button);
        disableOperators(false);
        disableEquals(false);
    } else {
        expression.push(parseInt(currentNumber));
        currentNumber = "";
        expression.push(button);
        appendDisplay(button);
        disableOperators(true);
        disableEquals(true);
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
        if (evaluated === "ERR DIV 0") {
            disableOperators(true);
            disableNumbers(true);
            disableEquals(true);
            return "ERR DIV 0";
        }
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
        return "ERR DIV 0";
    } else {
        return num1 / num2;
    }
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