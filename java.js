// Initialize vars
let num1 = [];
let num2 = [];
let operator = "";
let result;
let num1Set = false;
let num2Set = false;
let num1Int = 0;
let num2Int = 0;
const btnsOperator = document.getElementById("btnsOperator");
const btnsNums = document.getElementById("btnsNums");
const btnsEq = document.getElementById("btnsEq");

// Define calculations
function runCalc(num1, num2, operator) {
    if (operator === "add") {
        result = num1Int + num2Int;
    } else if (operator === "sub") {
        result = num1Int - num2Int;
    } else if (operator === "mult") {
        result = num1Int * num2Int;
    } else if (operator === "div") {
        result = num1Int / num2Int;
    }
    console.log(num1 + operator + num2 + "=" + result);
}
// Set operator & parse first num
btnsOperator.addEventListener("click", function(e) {
    if (num1.length != 0) {
        let stringed = num1.join("");
        console.log(stringed);
        num1Int = parseInt(stringed);
        console.log(num1Int);
        num1Set = true;
        if (e.target.id != "" && e.target.id != "btnsOperator") {
            operator = e.target.id;
        } 
        return num1Int;
    }
});
// Get num1
btnsNums.addEventListener("click", function(e) {
    if (num1Set != true) {
        if (e.target.id != "" && e.target.id != "btnsNums") {
            num1.push(e.target.id);
            console.log("NUM ONE: " + num1);
        }
    }
});
// Get num2
btnsNums.addEventListener("click", function(e) {
    if (num1Set === true) {
        if (e.target.id != "" && e.target.id != "btnsNums") {
            num2.push(e.target.id);
            console.log("NUM TWO: " + num2);
        }
    }
});
// Parse num2 & run calculator
btnsEq.addEventListener("click", function(e) {
    if (num2.length != 0){
        let stringed = num2.join("");
        console.log(stringed);
        num2Int = parseInt(stringed);
        console.log(num2Int);
        num2Set = true;
        if (num2Int === 0 && operator === "div") {
            alert("hahaha. no");
        }
        if (num1Set === true && num2Set === true) {
            if (e.target.id != "" && e.target.id != "btnsEq") {
                let result = runCalc(num1, num2, operator);
                num1 = [];
                num2 = [];
                num1Set = false;
                num2Set = false;
                operator = "";
            }
        }
    }
});

