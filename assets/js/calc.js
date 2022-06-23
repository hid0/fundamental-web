const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
  (calculator.displayNumber = "0"),
    (calculator.operator = null),
    (calculator.firstNumber = null),
    (calculator.waitingForSecondNumber = false);
}

function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

function inverseNumber() {
  if (calculator.displayNumber === "0") {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

function handlerOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;
    calculator.displayNumber = "0";
  } else {
    alert("operasi telah ditetapkan");
  }
}

function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("ente belum menetapkan operasi");
    return;
  }

  let res = 0;
  if (calculator.operator === "+") {
    res = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    res = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: res,
  };
  putHistory(history);
  calculator.displayNumber = res;
  renderHistory();
}

const btns = document.querySelectorAll(".button");

for (const btn of btns) {
  btn.addEventListener("click", function (e) {
    // const target = e.target;

    if (e.target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (e.target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (e.target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (e.target.classList.contains("operator")) {
      handlerOperator(e.target.innerText);
      return;
    }

    inputDigit(e.target.innerText);
    updateDisplay();
  });
}
