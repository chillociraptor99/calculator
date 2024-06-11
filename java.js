// Initialize vars
let num1;
let num2;
let operator = "";
let result;
let num1Set = false;
let num2Set = false;
const btnsOperator = document.getElementById("btnsOperator");
const btnsNums = document.getElementById("btnsNums");
const btnsEq = document.getElementById("btnsEq");

// Define calculations
function runCalc(num1, num2, operator) {
    if (operator === "add") {
        result = num1 + num2;
    } else if (operator === "sub") {
        result = num1 - num2;
    } else if (operator === "mult") {
        result = num1 * num2;
    } else if (operator === "div") {
        result = num1 / num2;
    }
}
// Set operator
btnsOperator.addEventListener("click", function(e) {
    if (e.target.id != "" && e.target.id != "btnsOperator") {
        operator = e.target.id;
        } 
});
// Set num1
btnsNums.addEventListener("click", function(e) {
    if (num1Set === false) {
        if (e.target.id != "" && e.target.id != "btnsNums") {
            num1 = e.target.id;
            alert("NUM ONE: " + num1);
            num1Set = true;  
        }
    }
});
// Set num2
btnsNums.addEventListener("click", function(e) {
    if (num1Set === true && num2Set === false) {
        if (e.target.id != "" && e.target.id != "btnsNums") {
            num2 = e.target.id;
            alert("NUM TWO: " + num2);
            num2Set = true;
        }
    }
});
// Run calculator
btnsEq.addEventListener("click", function(e) {
    if (e.target.id != "" && e.target.id != "btnsEq") {
        let result = runCalc(num1, num2, operator);
        console.log(num1 + operator + num2 + "=" + result);
        alert(result); //?
        num1 = undefined;
        num2 = undefined;
    }
});

