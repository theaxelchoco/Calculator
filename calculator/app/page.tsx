"use client"

import Image from "next/image"
import styles from "./page.module.css"
import { useState } from "react"

export default function Home() {
  const [display, setDisplay] = useState("0")
  const [operator, setOperator] = useState("")
  const [clearDisplay, setClearDisplay] = useState(false)
  const [firstOperand, setFirstOperand] = useState<number | null>(null)

  //Button Mapping
  const Buttons = [
    "AC", "±", "%", "÷", 
    "7", "8", "9", "x",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "=",
  ]

  //Indivudal Buttons Clicked
  const ButtonClick = (Value: string) => {
    switch (Value) {
      case "±":
        if (display !== "0") {   
          setDisplay(display.includes("-") ? display.replace("-", "") : "-" + display)
        }
        break
      case "%":
        setDisplay((parseFloat(display) / 100).toString())
        setClearDisplay(true)
        break
      case "AC":
        setDisplay("0")
        setOperator("")
        setFirstOperand(null)
        setClearDisplay(false)
        break
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        setDisplay(clearDisplay ? Value : (display === "0" ? Value : display + Value))
        setClearDisplay(false)
        break
      case "+":
      case "-":
      case "x":
      case "÷":
        handleOperator(Value)
        break
      case "=":
        if (operator && firstOperand !== null) {
          const result = calculate(firstOperand, parseFloat(display), operator)
          setDisplay(result.toString())
          setFirstOperand(null)
          setOperator("")
        }
        break
      default:
        break
    }
  }

  //Performing operations by handling the present operator
  const handleOperator = (newOperator: string) => {
    const currentNumber = parseFloat(display)
    
    if (firstOperand === null) {
      setFirstOperand(currentNumber)
    } else if (operator) {
      const result = calculate(firstOperand, currentNumber, operator)
      setDisplay(result.toString())
      setFirstOperand(result)
    }
    
    setOperator(newOperator)
    setClearDisplay(true)
  }

  //Calculate the result with the given values and operator
  const calculate = (a: number, b: number, operator: string) => {
    switch (operator) {
      case "+":
        return a + b
      case "-":
        return a - b
      case "x":
        return a * b
      case "÷":
        return b !== 0 ? a / b : 0  
      default:
        return 0
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.display}>{display}</div>

        <div className={styles.buttons}>
          {Buttons.map((Value) => (
            <button
              className={Value === "0" ? styles.zero : styles.button}
              key={Value}
              onClick={() => ButtonClick(Value)}
            >
              {Value}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
