import { useEffect, useState } from 'react';
import './App.css'
import Keypad from './Keypad.jsx'
import Display from './Display.jsx'
function App() {

  return (
    <section id="calculator-container">

      <h1>JS Calc</h1>
      <Display/>
      <Keypad/>
      <p id="signature">Daniel Tosaus - 2025</p>
    </section>
  )
}

export default App
