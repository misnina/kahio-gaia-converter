import React, { useState, useEffect } from 'react';
import Convert from './logic';
import "./app.scss";

const CURRENCYTYPE = {
  Gold: 0,
  Platinum: 1,
  GCash: 2,
  USD: 3,
}

function App() {
  const [prices, setPrices] = useState([0, 0, 0, 0]);
  const [currency, setCurrency] = useState(3);
  const [valueToConvert, setValueToConvert] = useState(70);
  const [gCashMarketPrice, setGCash] = useState([300, 60000]);

  const radioButtons = [];
  const conversions = [];
  Object.keys(CURRENCYTYPE).forEach((key, i) => {
    radioButtons.push(<span key={`currency-radio-${i}`}>
      <input
        type="radio"
        checked={currency === CURRENCYTYPE[key]}
        onChange={() => setCurrency(CURRENCYTYPE[key])}
      />
       <span className="label">{key}</span>
    </span>);
    if(key === "USD") {
      conversions.push(<span key={`conversion-3`}>
        <span className="label">{key}</span>: {prices[CURRENCYTYPE[key]].toFixed(2)}
      </span>)
    } else {
      conversions.push(<div key={`currency-radio-${i}`}>
        <span className="label">{key}</span>: {prices[CURRENCYTYPE[key]].toFixed(0)}
      </div>)
    }
  });

  useEffect(() => {
    setPrices(Convert(currency, valueToConvert, gCashMarketPrice[0]));
  },[currency, gCashMarketPrice, valueToConvert]);

  return (
    <div className="App">
      <span className="question">Fill out either:</span>
      <div className="container gcash-picker">
        <div>
          <span className="question">GaiaCash 200GC Giftcard Marketplace Price</span>
          <div className="subtext">
            When logged in use this <a 
              href="https://www.gaiaonline.com/marketplace/itemdetail/10345633" 
              target="_blank"
              rel="noopener noreferrer"
              >link</a>.
          </div>
          <div>
            <input type="number" value={gCashMarketPrice[1]} onChange={(e) => setGCash([((e.target.value / 100) / 2), e.target.value])}/>
          </div>
        </div>
        
        <div>
        <span className="question">Assumed 1GC to X Plat Ratio</span>
          <div>
            <input type="number" value={gCashMarketPrice[0]} onChange={(e) => setGCash([e.target.value, ((e.target.value * 100) * 2)])}/>
          </div>
        </div>
      </div>

      <div className="container conversion-info">
        <span className="question">Which currency are you using as a base?</span>
        <div>
          {radioButtons}
        </div>
        <span className="question">How much would you like to convert?</span>
        <div>
          <input type="number" value={valueToConvert} onChange={(e) => setValueToConvert(+e.target.value)}/>
        </div>
      </div>

      <div className="container conversion">
        {conversions}
      </div>

      <div className="subtext credits">
        If you like this messy site, please say thanks to <a 
        href="https://www.gaiaonline.com/profiles/kahio/230575/"
        target="_blank"
        rel="noopener noreferrer"
        >Kahio</a>!
      </div>
    </div>
  );
}

export default App;
