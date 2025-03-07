import { useEffect, useState } from 'react';
import './App.css'
import PadComponent from './PadComponent.jsx'
import padData from './data.json'

function App() {

  const [activePad, setActivePad] = useState(null);

  function playSound(id){
    const audio = document.getElementById(id)
    const display = document.getElementById("display")
    if (audio) {
      audio.currentTime = 0; // Restart audio from the beginning
      audio.play();
      let clip_name = audio.src.split("/")[audio.src.split("/").length - 1].split(".")[0]
      display.textContent = clip_name

      setActivePad(id); // Set active pad for highlighting
      // Remove highlight after a short delay
      setTimeout(() => setActivePad(null), 200);
    }
    
  };
  
   // Listen for key presses
   useEffect(() => {
    function handleKeyPress(event) {
      const key = event.key.toUpperCase(); // Ensure uppercase for matching
      playSound(key);
    }

    window.addEventListener("keydown", handleKeyPress);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <section id="drum-machine">

      <h1>Mad Pad</h1>
      <div id="pad-container">
        {padData.map((pad) => (
          <PadComponent 
            key={pad.id}
            id={pad.id}
            letter={pad.letter}
            playCB={playSound}
            src={pad.src}
            color={pad.color}
            isActive={activePad === pad.letter} // Pass active state
          />
        ))}
      </div>
      <p id="display">Drop That Base!</p>
    </section>
  )
}

export default App
