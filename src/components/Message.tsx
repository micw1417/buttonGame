import { useEffect, useState, useRef } from "react";

function Message() {
  const [name, setName] = useState("");
  const promptShown = useRef(false);

  useEffect(() => {
    if (!promptShown.current) {
      setName(prompt("What is your name (blank for none)") || "guest");
      promptShown.current = true;
    }
  }, []);

  return <h1>Hi {name}</h1>;
}

export default Message;
