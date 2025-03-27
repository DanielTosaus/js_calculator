import { useEffect, useState } from 'react';
import './App.css'
import Keypad from './Keypad.jsx'
import Display from './Display.jsx'
function App() {

  const [input, setInput] = useState("0")
  const [display, setDisplay] = useState("0")

  return (
    <section id="calculator-container">
      <Display
        input={input}
        display={display}
      />
      <Keypad
        input={input}
        display={display}
        setInput={setInput}
        setDisplay={setDisplay}
      />
      <footer className="signature">
        Daniel Tosaus - 2025
      </footer>
    </section>
  )
}

export default App
