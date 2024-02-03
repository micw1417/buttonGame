import { useEffect, useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Message from "./components/Message";
import ReactDOM from "react-dom";

function App() {
  const [visible, setVisility] = useState(true);
  const [count, setCount] = useState(0);
  const [lastCount, setLastCount] = useState(0);
  const [tempHighScore, setTempHighScore] = useState<number>(
    parseInt(window.localStorage.getItem("userHighScore") ?? "0")
  );
  const [showingAlert, setShowingAlert] = useState<boolean>(false);

  const [prob, setProb] = useState<number>(
    parseFloat(window.localStorage.getItem("userProb") ?? "100")
  );

  function probCalc(count: number) {
    let num = 100;

    for (let i = 0; i <= count; i++) {
      num *= (100 - i) / 100;
      console.log("probCalc " + count + " " + num);
    }
    return Number(num.toFixed(3));
  }

  function setTempHSLS(hs: number) {
    const tempProb = probCalc(hs);
    setProb(tempProb);
    window.localStorage.setItem("userProb", tempProb + "");
    setTempHighScore(hs);
    window.localStorage.setItem("userHighScore", hs + "");
  }
  // const highScore = window.localStorage.getItem("userHighScore") ?? 0;

  const handleButtonClick = () => {
    let num = Math.floor(Math.random() * 100) + 1;
    if (count > num) {
      setLastCount(count);
      setShowingAlert(true);

      if (count > tempHighScore) {
        setTempHSLS(count);
      }
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  return (
    <>
      {showingAlert && (
        <Alert onClose={() => setShowingAlert(false)}>
          The chance you died here at {lastCount} clicks is{" "}
          {probCalc(lastCount)}%
        </Alert>
      )}
      <Message></Message>
      <h1>
        You clicked {count} time(s). You have a {count}% chance to reset
      </h1>
      <div>
        <Button color="primary" onClick={handleButtonClick}>
          Hi i am button
        </Button>
      </div>
      <h2>
        Your highscore is {tempHighScore}, the chance to get to your highscore
        is {prob}%
      </h2>
    </>
  );
}

export default App;
