function Chunk(type, value) {
    this.type = type;
    this.value = value;
}

var expression = [];
const screen = document.querySelector('#screen');

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
    appendDisplay(button);
    if(button === "Clear") {
        setDisplay('');
    }
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
    if(num2 === 0) {
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
        case "*":
            return multiply(num1, num2);
        case "/": 
            return divide(num1, num2);
        default:
            return 0;
    }
}