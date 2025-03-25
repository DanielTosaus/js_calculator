import { useState, useEffect } from "react";

export default function Keypad() {
  const buttons = [
    { id: "clear", letter: "C", color: "#B29DB6" },
    { id: "divide", letter: "/", color: "#AFDAA3" },
    { id: "multiply", letter: "*", color: "#99B49F" },
    { id: "subtract", letter: "-", color: "#9AACFC" },
    { id: "seven", letter: "7", color: "#4895C5" },
    { id: "eight", letter: "8", color: "#C9B4A7" },
    { id: "nine", letter: "9", color: "#F0C4AA" },
    { id: "add", letter: "+", color: "#E1D8D5", className: "row-span-2" },
    { id: "four", letter: "4", color: "#A6A6A6" },
    { id: "five", letter: "5", color: "#EAE4CC" },
    { id: "six", letter: "6", color: "#6FD5CF" },
    { id: "one", letter: "1", color: "#F5E7B1" },
    { id: "two", letter: "2", color: "#B1D9CB" },
    { id: "three", letter: "3", color: "#83C9CC" },
    { id: "equals", letter: "=", color: "#EFA2AC", className: "row-span-2" },
    { id: "zero", letter: "0", color: "#F0DCC7", className: "col-span-2" },
    { id: "decimal", letter: ".", color: "#A97FB3" },
    
  ];
  function handleClick(){
    const audio = document.getElementById("audio_clip")
    if (audio){
      audio.currentTime = 0; // Restart audio from the beginning
      audio.volume = 0.2;
      audio.play();
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
          onClick={handleClick}
        >
          {letter}
        </button>
      ))}
      <audio id="audio_clip">
        <source src="../public/click.mp3" type="audio/mp3"/>
      </audio>
    </div>
  );
}

