import { useEffect, useState } from "react";

interface Props {}

function Message() {
  const [name, setName] = useState("");
  // The format for the code is JSX: Javascript XML

  useEffect(() => {
    setName(prompt("what is your name") ?? "guest");
  }, []);

  if (name) {
    return <h1>hi {name}</h1>;
  } else {
    return <h1>hi _____</h1>;
  }
}

export default Message;
