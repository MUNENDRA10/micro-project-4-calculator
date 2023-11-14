const display = document.getElementById("display");
const resetKey = document.getElementById("reset");
const equalKey = document.getElementById("equalto");
const backspaceKey = document.getElementById("backspace");
const digitKeys = document.querySelectorAll(".digit");
const operatorKeys = document.querySelectorAll(".operator");
const dotKey = document.getElementById("dotbutton");

const digitKeysArray = Array.from(digitKeys);
const operatorKeysArray = Array.from(operatorKeys);

let lastKeyIsOperator = false;
let decimalAdded = false;

const keyClickHandler = (event) => {
  const value = event.target.innerText;

  if (value === "." && decimalAdded) {
    return;
  }

  if (display.value.length >= 12) {
    // Maximum 12 digits allowed
    return;
  }

  if ("+-/X".includes(value)) {
    if (lastKeyIsOperator) {
      const initialValue = display.value;
      const updatedValue = initialValue.substring(0, initialValue.length - 1) + value;
      display.value = updatedValue;
      return;
    }

    lastKeyIsOperator = true;
    decimalAdded = false;
  } else {
    lastKeyIsOperator = false;

    if (value === ".") {
      decimalAdded = true;
    }
  }

  display.value += value;
  display.scrollLeft = display.scrollWidth;
};

const resetHandler = () => {
  display.value = "";
  lastKeyIsOperator = false;
  decimalAdded = false;
};

const backspaceHandler = () => {
  const initialValue = display.value;
  const updatedValue = initialValue.substring(0, initialValue.length - 1);
  display.value = updatedValue;
  lastKeyIsOperator = false;
  if (display.value.includes(".")) {
    decimalAdded = true;
  } else {
    decimalAdded = false;
  }
};

const equalHandler = () => {
  try {
    const result = eval(display.value);
    display.value = result;
    lastKeyIsOperator = false;
    decimalAdded = display.value.includes(".");
  } catch (error) {
    alert("Invalid expression");
  }
};

digitKeysArray.forEach((key) => key.addEventListener("click", keyClickHandler));
operatorKeysArray.forEach((key) => key.addEventListener("click", keyClickHandler));
dotKey.addEventListener("click", keyClickHandler);
resetKey.addEventListener("click", resetHandler);
backspaceKey.addEventListener("click", backspaceHandler);
equalKey.addEventListener("click", equalHandler);