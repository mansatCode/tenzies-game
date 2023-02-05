import React from 'react';
import './App.css';
import Dice from './components/Dice';
import { nanoid } from 'nanoid'

const App = () => {

  const max = 6;
  const len = 10;

  const [die, setDie] = React.useState(allNewDice());

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
    setDie(oldDice => oldDice.map(
      die => {
        return die.isHeld ? die : generatenewDice()
      }
    ))
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
      <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.
        </p>
      <div className="diceContainer">
        {diceElements}
      </div>
      <button onClick={rollDice} className="rollButton">Roll</button>
    </main>
  )
}

export default App