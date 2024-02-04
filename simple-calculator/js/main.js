let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screenBuffer = document.querySelector("#buffer");
const screenExpression = document.querySelector("#expression");

function buttonClick(value) {
  isNaN(value) ? handleSymbol(value) : handleNumber(value);
  screenBuffer.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = '0';
      screenExpression.innerText = '';
      runningTotal = 0;
      previousOperator = null;
      break;

    case '=':
      // You need two numbers to do math
      if (previousOperator === null || previousOperator === '=') return;

      screenExpression.innerText += buffer;
      flushOperation(+buffer);
      previousOperator = '=';
      buffer = runningTotal;
      runningTotal = 0;
      break

    case '←':
      let len = buffer.length;
      buffer = (len === 1) ? '0' : buffer.substring(0, len - 1);
      break;
    
    case '+':
    case '−':
    case '×':
    case '÷':
      handleMath(symbol);
  }
};

function flushOperation(intBuffer) {
  if (previousOperator === '+') {
    runningTotal += intBuffer;
  } else if (previousOperator === '−') {
    runningTotal -= intBuffer;
  } else if (previousOperator === '×') {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function handleMath(symbol) {
  if (buffer === '0') return;

  const intBuffer = +buffer;
  if (previousOperator === '=') screenExpression.innerText = buffer + symbol;
  else screenExpression.innerText += intBuffer + symbol;

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;

  buffer = '0';
}

function handleNumber(numberString) {
  if (buffer === "0") buffer = numberString;
  else buffer += numberString;
};

function init() {
  document.querySelector(".calc-buttons").addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    })
}

init()
