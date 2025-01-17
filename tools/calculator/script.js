let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      resetCalculator();
      break;
    case "=":
      if (previousOperator === null) return;
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = String(runningTotal);
      runningTotal = 0;
      break;
    case "←":
      buffer = buffer.length === 1 ? "0" : buffer.slice(0, -1);
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") return;

  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "−":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "÷":
      runningTotal /= intBuffer;
      break;
  }
}

function handleNumber(numberString) {
  buffer = buffer === "0" ? numberString : buffer + numberString;
}

function resetCalculator() {
  buffer = "0";
  runningTotal = 0;
  previousOperator = null;
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      if (!event.target.matches("button")) return;
      buttonClick(event.target.innerText);
    });
}

init();
