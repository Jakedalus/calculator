

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

function animateBtn(btn) {
    var button = document.getElementById(buttonRevCode[btn]);
    if(button != null) {
        console.log("Pushed: ", button);
        button.classList.add("pushed");
        window.setTimeout(function() {
            button.classList.remove("pushed");
        }, 100);
    }
    
}


var noDot = false;
var noOp = true;

function keyPressed(buttonPressed) {
    console.log(buttonPressed);
    animateBtn(buttonPressed);
    
    var opSyms = ["/", "-", "+", "*"];
    var numKeys = ['0','1','2','3','4','5','6','7','8','9'];
    
    
    var isDot = buttonPressed === ".";
    
    
    var isOp = opSyms.indexOf(buttonPressed) > -1;
    
//    if(!(noOp && isOp) && !(noDot && isDot)) {
        if(buttonPressed == "ac") {
            screen.value = "";
            equation = "";
            noDot = false;
            noOp = true;
        } else if(buttonPressed == "ce") {
            var deleted = equation[equation.length-1];
            equation = equation.slice(0, equation.length-1);
            screen.value = equation;
            if(deleted === ".") noDot = false;
            if(opSyms.indexOf(deleted) > -1) noOp = false;
            if(equation === "") noOp = true;
        } else if(buttonPressed == "equals" && !noOp) {
            var answer = eval(equation);
            answer = +answer.toFixed(8);
            equation = answer.toString();
            screen.value = equation;
            noOp = false;
            noDot = true;
        } else if (buttonPressed === "." && !noDot) {
            equation += buttonPressed;
            screen.value = equation;
            noDot = true;
        } else if (opSyms.indexOf(buttonPressed) > -1 && !noOp) {
            equation += buttonPressed;
            screen.value = equation;
            noOp = true;
            noDot = false;
        } else if(numKeys.indexOf(buttonPressed) > -1) {
            equation += buttonPressed;
            screen.value = equation;
            noOp = false;
        }
//    } 
    
}



buttons.addEventListener("click", function(e) {
    keyPressed(buttonCode[e.target.id]);
});


document.addEventListener("keydown", function(e) {
    var key = e.key;
    if(key == "Enter" || key == "=") key = "equals";
    else if (key == "Backspace") key = "ce";
    else if (key == "Escape") key = "ac";
    keyPressed(key);  
});


