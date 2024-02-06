import { useEffect, useState, useRef } from "react";

function Message() {
  const [name, setName] = useState(window.localStorage.getItem("username"));
  const promptShown = useRef(false);

  useEffect(() => {
    if (name || !promptShown.current) {
      const tempName = prompt("What is your name (blank for none)" || "Guest");
      setName(tempName);
      window.localStorage.setItem("username", tempName ?? "");
      promptShown.current = true;
    }
  }, []);

  return <h1>Hi {name}</h1>;
}

export default Message;
