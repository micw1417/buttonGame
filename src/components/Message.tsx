interface Props {
  name?: string;
}

function Message({ name }: Props) {
  // The format for the code is JSX: Javascript XML

  if (name) {
    return <h1>hi {name}</h1>;
  } else {
    return <h1>hi anon</h1>;
  }
}

export default Message;
