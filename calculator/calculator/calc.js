// Making the calculator calculate
// by github.com/sandramchung
// for WebLab Spring 2014

//debugging messages

function output(message) {
  document.getElementById('trouble').innerHTML = message;
}

// clears the current value in the calculator display

function clearEntry() {
  document.getElementById('display').value = '0';
}

// stores all the values and operations entered into the calculator since last clear operation

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

// adds number to the display value

function updateDisplay(number) {
  var disp = document.getElementById('display');
  if (disp.value === "0" || newValue) {
    disp.value = number;
    disp.style.backgroundColor = "#bbb";
    newValue = false;
  } else {
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

  // add current display value to stack
  stack.push(parseFloat(disp.value));

  // change display color to indicate that an operation is being performed
  disp.style.backgroundColor = "#ccccaa";

  // if at least two values and one operation have been entered into the stack, perform the last operation and store the result in the stack

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
      break;
    }
    newValue = true;
    updateDisplay(stack[stack.length-1]);
  } 
  newValue = true;
  nextOp = operation;
}


// perform mathematical operations

function doAdd() {
  stack.push(stack[stack.length-2] + stack[stack.length-1]);
}

function doSubtract() {
  stack.push(stack[stack.length-2] - stack[stack.length-1]);
}

function doDivide() {
  stack.push(stack[stack.length-2] / stack[stack.length-1]);
}

function doMultiply() {
  stack.push(stack[stack.length-2] * stack[stack.length-1]);
}






