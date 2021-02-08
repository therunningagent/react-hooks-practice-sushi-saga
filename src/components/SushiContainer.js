import React, {useState} from "react";
import MoreButton from "./MoreButton";
import Sushi from "./Sushi";

function SushiContainer({ sushis, onEatSushi }) {

  const [index, setIndex] = useState(0);

  const firstFour = sushis.slice(index, index + 4)

  const sushiItems = firstFour.map(sushi => {
    return <Sushi key={sushi.id} sushi={sushi} onEatSushi={onEatSushi}/>
  }
  )

  function moreSushis(){
    setIndex(index + 4);
  }

  return (
    <div className="belt">
      {sushiItems}
      <MoreButton onButtonClick={moreSushis}/>
    </div>
  );
}

export default SushiContainer;
