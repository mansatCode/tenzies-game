import React from 'react';
import './App.css';
import Dice from './components/Dice';

const App = () => {

  const max = 6;
  const len = 10;

  const [die, setDie] = React.useState(allNewDice());

  function allNewDice() {
    // Returns a random integer from 1 to 10:
    const randArray = Array.from({length: len}, () => Math.floor(Math.random() * max) + 1); 
    return randArray;
  }

  function rollDice() {
    setDie(allNewDice());
  }

  const diceElements = die.map(die => (
        <Dice
            value={die}
        />
    ))

  return (
    <main>
      <div className="diceContainer">
        {diceElements}
      </div>
      <button onClick={rollDice} className="rollButton">Roll</button>
    </main>
  )
}

export default App