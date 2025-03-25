import { useState, useEffect } from "react";
export default function Display() {
    
    return (
      <div className="display-container">
        <div className="display-screen">
            <p id="input">Input</p>
            <p id="display">0</p>
        </div>
        
      </div>
    );
  }