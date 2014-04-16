// Making the calculator calculate
// by github.com/sandramchung
// for WebLab Spring 2014

'use strict';

// debugging messages

function output(message) {
  document.getElementById('trouble').innerHTML = message;
}

// clears the current value in the calculator display

function clearEntry() {
  document.getElementById('display').value = '0';
}

// stores the values and results entered into the calculator since last clear operation

var stack = [];

// tells the updateDisplay function to start over with a new value after the operation button is pressed;

var newValue = false;

// stores operation type to be performed

var nextOp = "";

// starts a new calculation and clears the display

function clearStack() {
  clearEntry();
  stack.length = 0;
  nextOp = "";
}

// backs display value up one space 

function backSpace() {
  var disp = document.getElementById('display');
  if (disp.value.length === 1){
    disp.value = '0';
  } else {
    disp.value = disp.value.slice(0, disp.value.length - 1);
  }
}

// appends number to the display value
// if current value and number are both zero, nothing happens
// if current value is zero and number is not, substitute number for current value

function updateDisplay(number) {
  var disp = document.getElementById('display');
  
  if ((disp.value === "0" && number !== '0') || newValue) {
    disp.value = number;
    disp.style.backgroundColor = "#bbb";
    newValue = false;
  } else if (disp.value !== '0') {
    disp.value += number;
  }
}

// changes the sign of value in display 

function swapSign() {
  var disp = document.getElementById('display');
  disp.value = disp.value * -1;
}

// when operator buttons are pushed, adds current display value and operation to the calculation stack and performs 

function updateStack(operation) {
  var disp = document.getElementById('display');

  // when user tries to operate on a naked decimal point
  if (disp.value === '.') {
    return;
  }
  
  // add current display value to stack
  stack.push(parseFloat(disp.value));

  // if at least two values have been entered into the stack, perform the last stored operation
  if (stack.length > 1) {
    switch (nextOp) {
    case "plus": 
      doAdd();
      break;
    case "star":
      doMultiply();
      break;
    case "minus":
      doSubtract();
      break;
    case "slash":
      doDivide();
      break;
    case "":
      break;
    case "equals":
      disp.style.backgroundColor = "#999";
      break;
    }
    newValue = true;
    updateDisplay(stack[stack.length - 1]);
  } 
  newValue = true;
  nextOp = operation;
}


// perform mathematical operations and store result in stack

function doAdd() {
  stack.push(stack[stack.length - 2] + stack[stack.length - 1]);
}

function doSubtract() {
  stack.push(stack[stack.length - 2] - stack[stack.length - 1]);
}

function doDivide() {
  stack.push(stack[stack.length - 2] / stack[stack.length - 1]);
}

function doMultiply() {
  stack.push(stack[stack.length - 2] * stack[stack.length - 1]);
}






