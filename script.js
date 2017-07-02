
var buttonCode = {
    "ac": "ac",
    "ce": "ce",
    "divide": "/",
    "multiply": "*",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "subtract": "-",
    "four": "4",
    "five": "5",
    "six": "6",
    "add": "+",
    "one": "1",
    "two": "2",
    "three": "3",
    "equals": "equals",
    "zero": "0",
    "dot": "." 
}

var buttonRevCode = {
    "ac": "ac",
    "ce": "ce",
    "/": "divide",
    "*": "multiply",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "-": "subtract",
    "4": "four",
    "5": "five",
    "6": "six",
    "+": "add",
    "1": "one",
    "2": "two",
    "3": "three",
    "equals": "equals",
    "0": "zero",
    ".": "dot"
}

var equation = "";
var lastInput = "";

var dotPressed = false;

var buttons = document.querySelector("#buttons");
var screen = document.querySelector("input[type=text]");
console.log(screen);
var operatorBtns = document.querySelectorAll(".operator");
var numberBtns = document.querySelectorAll(".number");
var dotBtn = document.getElementById("dot");

function enableOpBtns() {
    operatorBtns.forEach(function(op) {
        op.disabled = false;
    });
}

function disableOpBtns() {
    operatorBtns.forEach(function(op) {
        op.disabled = true;  
    });
}

function animateBtn(btn) {
//    console.log(btn);

    var button = document.getElementById(buttonRevCode[btn]);
    if(button) {
        console.log(button);
        button.classList.add("clicked");
        var timeoutID = window.setTimeout(function() {
            button.classList.remove("clicked");
        }, 100);
    }
    
    
    
}

function keyPressed(key) {
    var buttonPressed = key;
    animateBtn(buttonPressed);
    
    var opSyms = ["/", "-", "+", "*"];
    var keys = ['0','1','2','3','4','5','6','7','8','9','*','/','+','-'];
    
    if(buttonPressed == "ac") {
        screen.value = "";
        equation = "";
        dotBtn.disabled = false;
        disableOpBtns();
    } else if(buttonPressed == "ce") {
        var deleted = equation[equation.length-1];
        equation = equation.slice(0, equation.length-1);
        screen.value = equation;
        if(deleted === ".") dotBtn.disabled = false;
        if(opSyms.indexOf(deleted) > -1) enableOpBtns();
        if(equation === "") disableOpBtns();
    } else if(buttonPressed == "equals") {
        var answer = eval(equation);
        answer = +answer.toFixed(8);
        equation = answer.toString();
        screen.value = equation;
        enableOpBtns();
        dotBtn.disabled = true;
    } else if(keys.indexOf(buttonPressed) > -1) {
        equation += buttonPressed;
        screen.value = equation;
        if(opSyms.indexOf(buttonPressed) == -1) enableOpBtns();
    }
}

disableOpBtns();

buttons.addEventListener("click", function(e) {
    console.log(e.target);
    
    keyPressed(buttonCode[e.target.id]);
    
//    var buttonPressed = buttonCode[e.target.id];
//    console.log(buttonPressed);
//    
//    var opSyms = ["/", "-", "+", "*"];
//    
//    if(buttonPressed == "ac") {
//        screen.value = "";
//        equation = "";
//        dotBtn.disabled = false;
//        disableOpBtns();
//    } else if(buttonPressed == "ce") {
//        var deleted = equation[equation.length-1];
//        equation = equation.slice(0, equation.length-1);
//        screen.value = equation;
//        if(deleted === ".") dotBtn.disabled = false;
//        if(opSyms.indexOf(deleted) > -1) enableOpBtns();
//        if(equation === "") disableOpBtns();
//    } else if(buttonPressed == "equals") {
//        var answer = eval(equation);
//        answer = +answer.toFixed(8);
//        equation = answer.toString();
//        screen.value = equation;
//        enableOpBtns();
//        dotBtn.disabled = true;
//    } else if(buttonPressed != undefined) {
//        equation += buttonPressed;
//        screen.value = equation;
//    }
    
});

operatorBtns.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
        disableOpBtns();
        dotBtn.disabled = false;
    });
});

numberBtns.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
        enableOpBtns();
    });
});

dotBtn.addEventListener("click", function(e) {
    dotBtn.disabled = true;
});

document.addEventListener("keydown", function(e) {
    var key = e.key;
    if(key == "Enter" || key == "=") key = "equals";
    else if (key == "Backspace") key = "ce";
    else if (key == "Escape") key = "ac";
    keyPressed(key);  
});


