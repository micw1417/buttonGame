import React from "react";

interface Props {
  children: String;
  color?: "primary" | "secondary" | "dark";
  onClick: () => void;
}

const Button = ({ children, onClick, color = "primary" }: Props) => {
  return (
    <div className={"btn button btn-" + color} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
