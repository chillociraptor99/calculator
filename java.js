// Initialize vars
let firstNum = [];
let secNum = [];
let operator = "";
let result = 0;
let firstNumSet = false;
let secNumSet = false;
let firstNumInt = 0;
let secNumInt = 0;
let prevOp = false;
let infinite = false;
const btnsOperator = document.getElementById("btnsOperator");
const btnsNums = document.getElementById("btnsNums");
const btnsEq = document.getElementById("btnsEq");
const inputMain = document.getElementById("inputMain");
const inputLast = document.getElementById("inputLast");

// Define calculations
function runCalc(firstNumInt, secNumInt, operator) {
    if (operator === "+") {
        result = firstNumInt + secNumInt;
    } else if (operator === "-") {
        result = firstNumInt - secNumInt;
    } else if (operator === "x") {
        result = firstNumInt * secNumInt;
    } else if (operator === "/") {
        if (secNumInt === 0 && operator === "/") {
            clearAll();
            inputMain.textContent = "Hahahaha. stop that";
            inputLast.textContent = "∞";
            infinite = true;
        } else {
        result = (Math.round((firstNumInt / secNumInt)*1000)/1000);
        }
    }
    clearLast(result, firstNumInt);
}
// Get firstNum
btnsNums.addEventListener("click", function(e) {
    if (firstNum.length > 10) {
        cleanupInput();
    } else if (prevOp === true && operator === "") {
        clearAll();
        if (e.target.id != "" && e.target.id != "btnsNums") {
            firstNum.push(e.target.id);
            inputMain.textContent += e.target.id;
        }
    } else if (firstNumSet === false && prevOp === false) {
        if (e.target.id != "" && e.target.id != "btnsNums") {
             firstNum.push(e.target.id);
             inputMain.textContent += e.target.id;
         }
    }
});
// Parse first num & set operator or sign
btnsOperator.addEventListener("click", function(e) {
    if (firstNum.length === 0 && secNum.length === 0) {
        inputMain.textContent = "";
        inputLast.textContent = "";
        operator = "";
    } else if (firstNum.length > 0 && secNum.length === 0) { 
        // When no second number has been entered
        if (prevOp === false) {
                if (operator === "") {
                    firstNumInt = +firstNum.join("");
                    firstNumSet = true;
                    inputLast.textContent = "";
                    inputLast.textContent += `${firstNumInt}`;
                    if (e.target.id != "" && e.target.id != "btnsOperator") {
                        operator = e.target.id;
                        firstNumSet = true;
                        inputMain.textContent += e.target.id;
                        inputLast.textContent += ` ${operator}`;
                    }
                } else {    // Account for multiple operator presses before sec num
                    operator = e.target.id;
                    firstNumSet = true;
                    inputMain.textContent = `${firstNumInt}${operator}`;
                    inputLast.textContent = `${firstNumInt} ${operator}`;
                }
            } else if (prevOp === true && infinite === false) {
            if (operator === "") {
                if (e.target.id != "" && e.target.id != "btnsOperator") {
                    operator = e.target.id;
                    firstNumSet = true;
                    inputMain.textContent += e.target.id;
                    inputLast.textContent += ` ${operator}`;
                }
            } else if (prevOp === false && infinite === false){    // Account for multiple operator presses before sec num
                operator = e.target.id;
                firstNumSet = true;
                inputMain.textContent = `${firstNumInt}${operator}`;
                inputLast.textContent = `${firstNumInt} ${operator}`;
            }
        }
    } else if (firstNum.length > 0 && secNum.length > 0) {
        // Second number has been entered
        if (prevOp === false && infinite === false) {
            secOp = e.target.id;
            secNumInt = +secNum.join("");
            secNumSet = true;
            runCalc(firstNumInt, secNumInt, operator);
            firstNumInt = result;
            operator = secOp;
            inputMain.textContent = `${result} ${operator}`;
            console.log(prevOp);
            } else if (prevOp === true && infinite === false) {
                secOp = e.target.id;
                secNumInt = +secNum.join("");
                secNumSet = true;
                runCalc(firstNumInt, secNumInt, operator);
                firstNumInt = result;
                operator = secOp;
                inputMain.textContent = `${result} ${operator}`;
                }
    }
});
// Get secNum
btnsNums.addEventListener("click", function(e) {
    if (firstNumSet === true) {
        if (e.target.id != "" && e.target.id != "btnsNums") {
            secNum.push(e.target.id);
            inputMain.textContent += e.target.id;
        }
    }
});
// Parse secNum & run calculator
btnsEq.addEventListener("click", function(e) {
    if (prevOp === false) {
        if (secNum.length != 0){
            secNumInt = +secNum.join("");
            secNumSet = true;
            inputLast.textContent += ` ${secNumInt}`;
            if (firstNumSet === true && secNumSet === true) {
                if (e.target.id != "" && e.target.id != "btnsEq") {
                    runCalc(firstNumInt, secNumInt, operator);
                }
            }
        }
        } else {
            if (secNum.length != 0){
                secNumInt = +secNum.join("");
                secNumSet = true;
                if (firstNumSet === true && secNumSet === true) {
                    if (e.target.id != "" && e.target.id != "btnsEq") {
                        runCalc(firstNumInt, secNumInt, operator);
                    }
                }
        }
    }
    return secNumInt;
});
// Clear, delete, sign change buttons
btnsClear.addEventListener("click", function(e) {
    if (e.target.id != "" && e.target.id != "btnsClear") {
        if (e.target.id === "clear"){
            clearAll();
        } else if (e.target.id === "delete") {
            deleteNum();
        } else if (e.target.id === "signChange") {
            if (prevOp === false) {
                if (firstNumSet === false) {
                    firstNum[0] = (firstNum[0] * -1);
                    inputMain.textContent = +firstNum.join("");
                } else if (firstNumSet === true && secNumSet === false) {
                    secNum[0] = (secNum[0] * -1);
                    inputMain.textContent = firstNumInt + operator + +secNum.join("");
                }
            } else if (prevOp === true) {
                if (firstNum.length > 0 && secNum.length === 0) {
                    if (firstNumSet === false) {
                        firstNum[0] = (firstNum[0] * -1);
                        inputMain.textContent = +firstNum.join("");
                    } else if (firstNumSet === true && secNumSet === false) {
                        secNum[0] = (secNum[0] * -1);
                        console.log(secNum[0]);
                        inputMain.textContent = firstNumInt + operator + +secNum.join("");
                    }
                }
            }
        }
    }
});
// Clear all values
function clearAll() {
    firstNum = [];
    secNum = [];
    firstNumSet = false;
    secNumSet = false;
    operator = "";
    inputMain.textContent = "";
    inputLast.textContent = "";
    prevOp = false;
    infinite = false;
    result = 0;
}
// Clear last values except result
function clearLast() {
    if (infinite === true) {
        clearAll();
    } else {
        if (prevOp === true) {
            inputLast.textContent += ` ${operator} ${secNumInt} = ${result}`;
            firstNumInt = result;
            secNum = [];
            secNumInt = 0;
            secNumSet = false;
            firstNumSet = true;
            operator = "";
            inputMain.textContent = result;
            prevOp = true;
        } else {
            inputLast.textContent += `${secNumInt} = ${result}`;
            firstNumInt = result;
            secNum = [];
            secNumInt = 0;
            secNumSet = false;
            firstNumSet = true;
            operator = "";
            inputMain.textContent = result;
            prevOp = true;
        }
    }
}
// Cleanup input
function cleanupInput(firstNum) {
    firstNum.pop();
    inputMain.textcontent = firstNum.toString();
}
// Delete button function
function deleteNum() {
        if (firstNum.length === 1 && operator === "" && secNum.length === 0) {
            firstNum = [];
            inputMain.textContent = "";
        }
        else if (firstNum.length > 0 && operator === "" && secNum.length === 0) {
            firstNum.pop();
            firstNumInt = +firstNum.join("");
            firstNumSet = true;
            if (firstNum.length > 1) {
                inputMain.textContent = `${firstNumInt}`;
                } else {
                    inputMain.textContent = `${firstNumInt}`;
                }
        } else if (firstNum.length > 0 && operator != "" && secNum.length === 0) {
            operator = "";
            inputMain.textContent = `${firstNumInt}`;
        } else if (firstNum.length > 0 && operator != "" && secNum.length > 0) {
            if (secNum.length === 1) {
                secNum = [];
                inputMain.textContent = `${firstNumInt}${operator}`;
                return;
            } else if (secNum.length > 1) {
                secNum.pop();
                secNumInt = +secNum.join("");
                secNumSet = true;
                inputMain.textContent = `${firstNumInt}${operator}${secNumInt}`;
                return;
            }
        }
}