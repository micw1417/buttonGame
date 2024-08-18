import { useCallback, useEffect, useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import React from "react";
import "./App.css";
import Leaderboard from "./components/Leaderboard";
import { getHighscores, getSessionId } from "./service/service";
import { HighscoreObject } from "./service/service";
import { postHighscores } from "./service/service";

function App() {
  const [sessionId, setSessionId] = useState<string>(window.localStorage.getItem("sessionId") ?? "");
  const [globalHighscores, setGlobalHighscore] = useState<HighscoreObject[]>();
  const [name, setName]= useState<string>(
    window.localStorage.getItem("userName") ?? "none"
  );
  //const [visible, setVisility] = useState(true);
  const [count, setCount] = useState(0);
  const [lastCount, setLastCount] = useState(0);
  const [tempHighScore, setTempHighScore] = useState<number>(
    parseInt(window.localStorage.getItem("userHighScore") ?? "0")
  );
  const [showingAlert, setShowingAlert] = useState<boolean>(false);
  const [prob, setProb] = useState<number>(
    parseFloat(window.localStorage.getItem("userProb") ?? "100")
  );

  const setTempHSLS = useCallback((hs: number) => {
    const tempProb = probCalc(hs);
    setProb(tempProb);
    window.localStorage.setItem("userProb", tempProb + "");
    setTempHighScore(hs);
    window.localStorage.setItem("userHighScore", hs + "");
  }, [])

  const handleButtonClick = useCallback(() => {
    const num = Math.floor(Math.random() * 100) + 1;
    if (count > num) {
      setLastCount(count);
      setShowingAlert(true);

      if (count > tempHighScore) {
        setTempHSLS(count);
        if (name === "none") {
          const newName = prompt("You got a highscore! There was no name given. If you wish to have a highscore recorded enter a name to be displayed. If not just leave this empty") ?? "";
          setName(newName);
          postHighscores(sessionId, count, newName);
        } else {
          postHighscores(sessionId, count, name);
        }
      }
      
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }, [count, tempHighScore, setTempHSLS, name]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === " " || e.key === "Enter") {
      handleButtonClick();
    }
  }, [handleButtonClick])

  useEffect(() => {
    if (sessionId === "") {
      const fetchSessionId = async () => {
        try {
          const data = await getSessionId();
          setSessionId(data);
          window.localStorage.setItem("sessionId", data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchSessionId();
    }
  })

  useEffect(() => {
    const fetchHighscores = async () => {
      try {
        const data = await getHighscores();
        setGlobalHighscore(data);
      } catch (error) {
        console.error(error);
      }
  };

  fetchHighscores();
  }, [tempHighScore])

  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);

    return () => {
      document.removeEventListener("keyup", handleKeyPress);
    }
  }, [handleKeyPress])

  function probCalc(count: number) {
    let num = 100;

    for (let i = 0; i <= count; i++) {
      num *= (100 - i) / 100;
      // console.log("probCalc " + count + " " + num);
    }
    return Number(num.toFixed(3));
  }
  // const highScore = window.localStorage.getItem("userHighScore") ?? 0;

  return (
    <div className="default">
      {showingAlert && (
        <Alert onClose={() => setShowingAlert(false)}>
          You had a <strong>{(100 - probCalc(lastCount)).toFixed(3)}%</strong>{" "}
          chance to died here at {lastCount} clicks
        </Alert>
      )}
      <span>_______________________________</span>
      <h1>
        You clicked {count} time(s). You have a {count}% chance to reset
      </h1>
      <div className="buttonStyle">
        <Button color="primary" onClick={handleButtonClick}>
          THE BUTTON
        </Button>
      </div>
      <div>
        <Leaderboard highscores={globalHighscores}>hi</Leaderboard>
      </div>
      <h2 className="bottom">
        Your highscore is <strong>{tempHighScore}</strong>, the chance to get to
        your highscore is <strong>{prob}%</strong>
      </h2>
    </div>
  );
}

export default App;
