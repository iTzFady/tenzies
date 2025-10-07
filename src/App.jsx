import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./components/Die";
import useWindowSize from "../hooks/useWindowsSize";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }
  function rollDice() {
    if (!gameWon) {
      setDice((prevDice) =>
        prevDice.map((die) =>
          !die.isHeld ? { ...die, value: Math.ceil(Math.random() * 6) } : die
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }
  function holdDice(id) {
    if (!gameWon) {
      setDice((prevState) => {
        return prevState.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        });
      });
    }
  }
  const diceElements = dice.map((num) => (
    <Die
      key={num.id}
      id={num.id}
      isHeld={num.isHeld}
      value={num.value}
      hold={holdDice}
    />
  ));

  return (
    <main>
      {gameWon ? (
        <Confetti width={useWindowSize.width} height={useWindowSize.height} />
      ) : null}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
