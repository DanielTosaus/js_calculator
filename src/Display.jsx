import { useState, useEffect } from "react";
export default function Display(props) {
    
    return (
      <div className="display-container">
        <div className="display-screen">
            <p id="input">{props.input}</p>
            <p id="display">{props.display}</p>
        </div>
        
      </div>
    );
  }