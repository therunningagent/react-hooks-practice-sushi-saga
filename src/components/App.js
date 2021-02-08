import React, { useEffect, useState } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {

  const [sushis, setSushis] = useState([]);
  const wallet = 100;

  const eatenSushi = sushis.filter(sushi => {
    return sushi.eaten
  })

  const eatenSushiCost = eatenSushi.reduce((total, sushi) => {
    return total + sushi.price
  }, 0)

  const remainingWallet = wallet - eatenSushiCost 

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((sushis) => {
        const addKey = sushis.map(sushi => {
          return {
            ...sushi, 
            eaten: false
          }
        })
        setSushis(addKey);
      });
  }, [])

  function handleEatSushi(eatenSushi){

    if (!eatenSushi.eaten && remainingWallet >= eatenSushi.price){

    const updatedSushis = sushis.map(sushi => {
      if (sushi.id === eatenSushi.id){
        return {
          ...sushi,
          eaten: true
        } 
      } else {
        return sushi 
      }
    })
    setSushis(updatedSushis); 
  } else {
    alert('Already Eaten or you do not have enough money!')
  }
}

  return (
    <div className="app">
      <SushiContainer sushis={sushis} onEatSushi={handleEatSushi}/>
      <Table plates={eatenSushi} wallet={remainingWallet}/>
    </div>
  );
}

export default App;
