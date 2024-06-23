const previousOperationText = document.querySelector("#previousOperation");
const currentOperationText = document.querySelector("#currentOperation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculadora {
  constructor(currentOperationText, previousOperationText) {
    this.currentOperationText = currentOperationText
    this.previousOperationText = previousOperationText
    this.currentOperation = ""
  }

  // adiciona dígito à tela da calculadora
  addDigit(digit) {
    // checa se a operação já tem um ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return
    }
    this.currentOperation = digit
    this.updateScreen()
  }

  // processa todos os métodos da calculdaora
  processOperation(operation) {
    // checa se o valor atual está vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // mudança de operador
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation)
      }
      return
    }
    // obtem valor atual e anterior
    let operationValue
    const previous = +this.previousOperationText.innerText.split(" ")[0]
    const current = +this.currentOperationText.innerText

    switch (operation) {
      case "+":
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case "-":
        operationValue = previous - current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case "÷":
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case "×":
        operationValue = previous * current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case "Del":
        this.processDelOperator()
        break
      case "CE":
        this.processClearCurrentOperation()
        break
      case "C":
        this.processClearAllOperation()
        break
      case "=":
        this.processEqualsOperator()
        break
      default:
        return
    }
  }

  // alterar os valores da tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation
    } else {
      // checa se o valor é zero, se for adicione o valor atual
      if (previous === 0) {
        operationValue = current
      }

      // adiciona o valor atual ao anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = ""
    }
  }

  // muda o operador matemático
  changeOperation(operation) {
    const mathOperations = ["×", "÷", "+", "-"]
    if (!mathOperations.includes(operation)) {
      return
    }
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation
  }

  // deleta o último digito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1)
  }

  // limpa a operação atual
  processClearCurrentOperation() {
    this.currentOperationText.innerText = ""
  }

  // limpa toda a operação
  processClearAllOperation() {
    this.currentOperationText.innerText = ""
    this.previousOperationText.innerText = ""
  }

  // processa a operação
  processEqualsOperator(){
    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
}

const calc = new Calculadora(currentOperationText, previousOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) =>{
    const value = e.target.innerText;
    
    if(+value >= 0 || value === '.'){
      calc.addDigit(value);
    }else{
      calc.processOperation(value);
    }
  })
})