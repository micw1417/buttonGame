import { useCallback, useEffect, useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [lastCount, setLastCount] = useState(0);
  const [tempHighScore, setTempHighScore] = useState<number>(
    parseInt(window.localStorage.getItem("userHighScore") ?? "0")
  );
  const [showingAlert, setShowingAlert] = useState<boolean>(false);
  const [prob, setProb] = useState<number>(
    parseFloat(window.localStorage.getItem("userProb") ?? "100")
  );
  const [name, setName] = useState(window.localStorage.getItem("username"));

  function probCalc(count: number) {
    let num = 100;

    for (let i = 0; i <= count; i++) {
      num *= (100 - i) / 100;
      // console.log("probCalc " + count + " " + num);
    }
    return Number(num.toFixed(3));
  }

  const setTempHSLS = useCallback((hs: number) => {
    const tempProb = probCalc(hs);
    setProb(tempProb);
    window.localStorage.setItem("userProb", tempProb + "");
    setTempHighScore(hs);
    window.localStorage.setItem("userHighScore", hs + "");
  }, []);

  const handleButtonClick = useCallback(() => {
    const num = Math.floor(Math.random() * 100) + 1;
    if (count > num) {
      setLastCount(count);
      setShowingAlert(true);

      if (count > tempHighScore) {
        setTempHSLS(count);
        console.log(name);
      }
      setCount(0);

      if (!name) {
        const tempName = prompt(
          "Congrats, you got a new highscore! Would you like to enter a name to be inputed for a global leaderboard? If so, enter the name. If not, leave it blank"
        );
        if (tempName) {
          setName(tempName);
          window.localStorage.setItem("username", tempName);
        }
      }
      axios.post("/api/submit", {"name": name, "score": count}).then((response) => {
        console.log(response.data);
      });
      axios.get("/api/leaderboard").then((response) => {
        console.log(response.data);
      });
    } else {
      setCount(count + 1);
    }
  }, [count, tempHighScore, setTempHSLS, name]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === " " || e.key === "Enter") {
        handleButtonClick();
      }
    },
    [handleButtonClick]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);

    return () => {
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleKeyPress]);

  // const highScore = window.localStorage.getItem("userHighScore") ?? 0;

  return (
    <div className="app">
      {showingAlert && (
        <Alert onClose={() => setShowingAlert(false)}>
          You had a <strong>{(100 - probCalc(lastCount)).toFixed(3)}%</strong>{" "}
          chance to died here at {lastCount} clicks {name && <> Mr. {name}</>}
        </Alert>
      )}
       <hr className="divider" />
      <h1>
        You clicked {count} time(s). You have a {count}% chance to reset
      </h1>
      <div className="button-wrapper">
        <Button onClick={handleButtonClick}>THE BUTTON</Button>
      </div>
      <h2 className="bottom">
        Your highscore is <strong>{tempHighScore}</strong>, the chance to get to
        your highscore is <strong>{prob}%</strong>
      </h2>
    </div>
  );
}

export default App;
