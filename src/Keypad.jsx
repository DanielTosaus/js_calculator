import {useEffect } from "react";

export default function Keypad(props) {
  const buttons = [
    { id: "clear", letter: "C", color: "#EC8305" },
    { id: "divide", letter: "/", color: "#27445D" },
    { id: "multiply", letter: "*", color: "#27445D" },
    { id: "subtract", letter: "-", color: "#091057" },
    { id: "seven", letter: "7", color: "#4895C5" },
    { id: "eight", letter: "8", color: "#4895C5" },
    { id: "nine", letter: "9", color: "#4895C5" },
    { id: "add", letter: "+", color: "#091057", className: "row-span-2" },
    { id: "four", letter: "4", color: "#4895C5" },
    { id: "five", letter: "5", color: "#4895C5" },
    { id: "six", letter: "6", color: "#4895C5" },
    { id: "one", letter: "1", color: "#4895C5" },
    { id: "two", letter: "2", color: "#4895C5" },
    { id: "three", letter: "3", color: "#4895C5" },
    { id: "equals", letter: "=", color: "#EC8305", className: "row-span-2" },
    { id: "zero", letter: "0", color: "#4895C5", className: "col-span-2" },
    { id: "decimal", letter: ".", color: "#4895C5" },
    
  ];
  function tokenize(input) {
    const clear_minuses = preprocessInput(input).replace(/--/g, "+");
    return fixNegativeTokens(clear_minuses.match(/(\d+(\.\d+)?|[+\-*/])/g));
  }
  function isNumeric(token) {
    return !isNaN(token);
  }
  function fixNegativeTokens(tokens) {
    const newTokens = [];
    let i = 0;
    while (i < tokens.length) {
      // Check if the current token is '-' and it should be treated as a sign:
      // Conditions:
      // 1. It's the very first token or the previous token is an operator.
      // 2. The next token exists and is numeric.
      if (
        tokens[i] === '-' &&
        (i === 0 || "+-*/".includes(tokens[i - 1])) &&
        i + 1 < tokens.length &&
        isNumeric(tokens[i + 1])
      ) {
        newTokens.push('-' + tokens[i + 1]); // Merge '-' with the next token.
        i += 2; // Skip the next token as it's been merged.
      } else {
        newTokens.push(tokens[i]);
        i++;
      }
    }
    return newTokens;
  }

  function parseExpression(tokens) {
    let value = parseTerm(tokens);

    while (tokens.length > 0 && (tokens[0] === '+' || tokens[0] === '-')) {
        let operator = tokens.shift();
        let nextValue = parseTerm(tokens);
        value = operator === '+' ? value + nextValue : value - nextValue;
    }

    return value;
  }

  function parseTerm(tokens) {
    let value = parseFactor(tokens);

    while (tokens.length > 0 && (tokens[0] === '*' || tokens[0] === '/')) {
        let operator = tokens.shift();
        let nextValue = parseFactor(tokens);
        value = operator === '*' ? value * nextValue : value / nextValue;
    }

    return value;
  }

  function parseFactor(tokens) {
    return parseFloat(tokens.shift());
  }

  function evaluate(expression) {
    let tokens = tokenize(expression);
    return parseExpression(tokens);
  }

  function parseInput(i){
    return evaluate(i)
  }
  function processOpBuffer(buf) {
    // Rule 1: if the group is all '-', keep it as is.
    if (/^-+$/.test(buf)) {
      return buf;
    }
    // Rule 2: if length is exactly 2 and the second char is '-', then keep both.
    if (buf.length === 2 && buf[1] === '-' && "+*/".includes(buf[0])) {
      return buf;
    }
    // Rule 3: In all other cases, keep only the last operator.
    return buf[buf.length - 1];
  }
  function preprocessInput(input) {
    let result = "";
    let opBuffer = "";
    const isOperator = ch => "+-*/".includes(ch);
  
    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      if (isOperator(ch)) {
        // If we see an operator, accumulate it.
        opBuffer += ch;
      } else {
        // When we reach a non-operator, process any buffered operators.
        if (opBuffer !== "") {
          result += processOpBuffer(opBuffer);
          opBuffer = "";
        }
        // Then add the current (non-operator) character.
        result += ch;
      }
    }
    // Process any trailing operators in the buffer.
    if (opBuffer !== "") {
      result += processOpBuffer(opBuffer);
    }
    return result;
  }
  function lastNumberHasDot(input) {
    // Use a regular expression to find all numbers in the input.
    // This regex matches one or more digits optionally followed by a dot and more digits.
    const matches = input.match(/(\d+(\.\d+)?)/g);
    
    // If there are no numbers, return false.
    if (!matches || matches.length === 0) {
      return false;
    }
    
    // Get the last matched number.
    const lastNumber = matches[matches.length - 1];
    // Return true if the last number contains a dot, false otherwise.
    return lastNumber.indexOf('.') !== -1;
  }
  useEffect(() => {
    const handleKeyPress = (event) => {
      const allowedKeys = "0123456789-+*/.=C";
      let key = event.key;
      if (key === "Enter") key = "="; // Treat Enter as "="
      if (key === "c") key = "C";

      if (allowedKeys.includes(key)) {
        const button = document.querySelector(`.button[data-key="${key}"]`);
        if (button) {
          button.click();
        }
      }
    };

    // Attach event listener when component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Empty dependency array ensures it runs only once
  const MAX_LEN = 25
  function handleClick(event){
    const audio = document.getElementById("audio_clip")
    if (audio){
      audio.currentTime = 0; // Restart audio from the beginning
      audio.volume = 0.2;
      audio.play();
    }
    if (props.input.length > MAX_LEN){
      const audio_error = document.getElementById("audio_error_clip")
      if (audio_error){
        audio_error.currentTime = 0; // Restart audio from the beginning
        audio_error.volume = 0.2;
        audio_error.play();
      }
      props.setDisplay("DIGIT LIMIT MET")
      props.setInput("0")
      return
    }
    const sel = event.target.textContent
    const lastChar = props.input[props.input.length-1]
    const lastlastChar = (props.input.length > 1) ? props.input[props.input.length-2] : ""
    switch(sel){
      case "C":
        props.setInput("0")
        props.setDisplay("0")
        break
      case "*":
      case "/":
      case "+":
      case ".":
      case "-":
        if (sel == "." && lastNumberHasDot(props.input)){
          break
        }
        if (props.input == "0" && props.display == "0"){    // Empty calc
          props.setInput(event.target.textContent)
          break
        }
        if(props.input =="0" && props.display != "0"){   //ANS functionality
          props.setInput(props.display + event.target.textContent)
          break
        }
        if((sel == lastChar && sel != "-") || (lastChar == "-" && lastlastChar == "-")){  // Avoid repeated chars or more than 2 minuses
          break
        }
        if (sel == "-" && !(lastChar == "-" && lastlastChar == "-")){   // We can have 2 repeated minuses
          props.setInput(props.input + event.target.textContent)
        }
        else if("*/-+".includes(lastChar)){
          props.setInput(props.input.substr(0,props.input.length-1) + event.target.textContent)

        }
        else{   // Any other operator substitutes the previous
          props.setInput(props.input + event.target.textContent)
        }
        break
      case "=":
        const sol = parseInput(props.input)
        props.setDisplay(sol)
        props.setInput("0")
        break
      default:      // Number keys
        if (props.input == "0"){
          props.setInput(event.target.textContent)
          break
        }
        props.setInput(props.input + event.target.textContent)
        props.setDisplay(props.input + event.target.textContent)
        break
    }
  }
  return (
    <div className="keypad">
      {buttons.map(({ id, letter, color, className }) => (
        <button
          key={id}
          id={id}
          className={`button ${className}`}
          style={{ backgroundColor: color }}
          data-key={letter}
          onClick={handleClick}
        >
          {letter}
        </button>
      ))}
      <audio id="audio_clip">
        <source src="../public/click.mp3" type="audio/mp3"/>
      </audio>
      <audio id="audio_error_clip">
        <source src="../public/click_error.mp3" type="audio/mp3"/>
      </audio>
    </div>
  );
}

