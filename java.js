// Initialize vars
let num1 = [];
let num2 = [];
let operator = "";
let result = 0;
let num1Set = false;
let num2Set = false;
let num1Int = 0;
let num2Int = 0;
const btnsOperator = document.getElementById("btnsOperator");
const btnsNums = document.getElementById("btnsNums");
const btnsEq = document.getElementById("btnsEq");
const inputMain = document.getElementById("inputMain");
const inputLast = document.getElementById("inputLast");

// Define calculations
function runCalc(num1, num2, operator) {
    if (operator === "+") {
        result = num1Int + num2Int;
        num1 = [];
        num2 = [];
    } else if (operator === "-") {
        result = num1Int - num2Int;
        num1 = [];
        num2 = [];
    } else if (operator === "x") {
        result = num1Int * num2Int;
        num1 = [];
        num2 = [];
    } else if (operator === "/") {
        result = num1Int / num2Int;
        num1 = [];
        num2 = [];
    }
    inputLast.textContent += ` = ${result}`;
    inputMain.textContent = ` ${result}`;
    num1.push(result);
    num1Set = true;
    console.log(num1)
    return num1;
}
// Parse first num & set operator
btnsOperator.addEventListener("click", function(e) {
    if (num1.length > 0) {
        let stringed = num1.join("");
        num1Int = parseInt(stringed);
        num1Set = true;
        inputLast.textContent = "";
        inputLast.textContent += `${num1Int}`;
        console.log(num1);
        if (e.target.id != "" && e.target.id != "btnsOperator") {
            operator = e.target.id;
            inputMain.textContent += e.target.id;
            inputLast.textContent += ` ${operator}`;
        } 
        return num1Int;
    }
});
// Get num1
btnsNums.addEventListener("click", function(e) {
    if (num1Set === false) {
        if (e.target.id != "" && e.target.id != "btnsNums") {
            num1.push(e.target.id);
            inputMain.textContent += e.target.id;
        }
        return num1;
    }
});
// Get num2
btnsNums.addEventListener("click", function(e) {
    if (num1Set === true) {
        if (e.target.id != "" && e.target.id != "btnsNums") {
            num2.push(e.target.id);
            inputMain.textContent += e.target.id;
        }
        return num2;
    }
});
// Parse num2 & run calculator
btnsEq.addEventListener("click", function(e) {
    if (num2.length != 0){
        let stringed = num2.join("");
        num2Int = parseInt(stringed);
        num2Set = true;
        inputLast.textContent += ` ${num2Int}`;
        if (num2Int === 0 && operator === "/") {
            clear();
            inputMain.textContent = "Hahahaha. stop that";
            inputLast.textContent = "∞";
        }
        if (num1Set === true && num2Set === true) {
            if (e.target.id != "" && e.target.id != "btnsEq") {
                result = runCalc(num1, num2, operator);
                num2Set = false;
                operator = "";
                num1Int = 0;
                num2Int = 0;
            }
        }
    }
    return num2Int;
});
// Clear all values
function clear () {
    num1 = [];
    num2 = [];
    num1Set = false;
    num2Set = false;
    operator = "";
    inputMain.textContent = "";
    inputLast.textContent = "";
}
btnsClear.addEventListener("click", function(e) {
    if (e.target.id != "" && e.target.id != "btnsClear") {
        if (e.target.id === "clear"){
            clear();
        } else if (e.target.id === "delete") {
            return;
        }
    }
});

