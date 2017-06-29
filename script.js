
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

var equation = "";

var buttons = document.querySelector("#buttons");
var screen = document.querySelector("input[type=text]");
console.log(screen);

function parseEquation() {
    var nums = equation.split(/[\+\-\/*=]/g);
    var symbols = equation.split(/\d/g);
    var opps = symbols.reduce(function(acc, cur) {
        if(cur != "" && cur != ".") acc.push(cur);
        return acc;
    }, []);
    console.log(nums);
    console.log(opps);
    
    var answer = 0;
    var numIndex = 0;
    opps.forEach(function(operator, index) {
        if(operator == "+") {
            answer += nums[numIndex] + nums[numIndex+1];
        } else if(operator == "-") {
            answer += nums[numIndex] - nums[numIndex+1];
        } else if(operator == "*") {
            answer += nums[numIndex] * nums[numIndex+1];
        } else if(operator == "/") {
            answer += nums[numIndex] / nums[numIndex+1];
        }
        numIndex += 2;
    });
    equation = answer;
    screen.value = equation;
}


buttons.addEventListener("click", function(e) {
    console.log(e.target);
    var buttonPressed = buttonCode[e.target.id];
    console.log(buttonPressed);
    
    if(buttonPressed == "ac") {
        screen.value = "";
        equation = "";
    } else if(buttonPressed == "ce") {
        equation = equation.slice(0, equation.length-1);
        screen.value = equation;
    } else if(buttonPressed == "equals") {
        parseEquation();
        
    } else if(buttonPressed != undefined) {
        equation += buttonPressed;
        screen.value = equation;
    }
    
});


