import React, { useEffect } from "react";
import "./Confetti.css";

function getRandomColor() {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#864dc0",
    "#db36d3",
    "#366adb",
    "#ead0f2",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function Confetti() {
  useEffect(() => {
    const confettiContainer = document.getElementById("confetti-container");

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDuration = Math.random() * 2 + 1 + "s";
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      confettiContainer.innerHTML = "";
    }, 2500);
  }, []);

  return <div id="confetti-container" />;
}

export default Confetti;
