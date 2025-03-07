import { useState, useEffect } from "react";

export default function PadComponent({ id, letter, playCB, src, color, isActive}) {
  const [active, setActive] = useState(false);

  function handlePlay() {
    setActive(true);
    playCB(letter);
    
    // Remove highlight after a short delay
    setTimeout(() => setActive(false), 200);
  }
  // If the active state changes via keystroke update the local state to trigger a render
  useEffect(() => {
    if (isActive) {
      setActive(true);
      setTimeout(() => setActive(false), 200);
    }
  }, [isActive]);

  return (
    <button
      className={`drum-pad ${active ? "active" : ""}`}
      id={id}
      onClick={handlePlay}
      style={{
        backgroundColor: active ? "#148568" : color, // Highlight effect
        border: active ? "2px solid white" : "none",
        transition: "background-color 0.2s, border 0.2s"
      }}
    >
      {letter}
      <audio id={letter} className="clip" src={src}></audio>
    </button>
  );
}
