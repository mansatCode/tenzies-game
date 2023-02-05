import React, { useEffect, useState } from 'react';
import './App.css';
import Dice from './components/Dice';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

const App = () => {

  const max = 6;
  const len = 10;

  const [tenzies, setTenzies] = React.useState(false);
  const [die, setDie] = React.useState(allNewDice());

  useEffect(() => {
    const allHeld = die.every(d => d.isHeld);
    const firstValue = die[0].value;
    const allSameValue = die.every(d => d.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
    }

  }, [die])

  function allNewDice() {
    // Returns a random integer from 1 to 10:
    const dieArray = []

    for (let i = 0; i < len; i++) {
      dieArray.push(generatenewDice())
    }

    return dieArray;
  }

  function generatenewDice() {
    return {
        id: nanoid(),
        value: Math.floor(Math.random() * max) + 1, 
        isHeld: false
      }
  }

  function rollDice() {
    if (!tenzies) {
      setDie(oldDice => oldDice.map(
        die => {
          return die.isHeld ? die : generatenewDice()
        }
      ))
    } else {
      setTenzies(false);
      setDie(allNewDice())
    }
  }

  function holdDice(id) {
    setDie(oldDice => oldDice.map(
      die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      }
    ))
  }

  const diceElements = die.map(die => (
        <Dice
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.
        </p>
      <div className="diceContainer">
        {diceElements}
      </div>
      <button onClick={rollDice} 
      className="rollButton">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App