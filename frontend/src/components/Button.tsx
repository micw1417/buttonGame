import React from "react";

interface Props {
  children: string;
  color?: "primary" | "secondary" | "dark";
  onClick: () => void;
}

const colorMap: Record<NonNullable<Props["color"]>, React.CSSProperties> = {
  primary:   { backgroundColor: "#2563eb", color: "#fff" },
  secondary: { backgroundColor: "#6b7280", color: "#fff" },
  dark:      { backgroundColor: "#1f2937", color: "#fff" },
};

const Button = ({ children, onClick, color = "primary" }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...colorMap[color],
        width: "400px",
        height: "100px",
        fontSize: "2.5rem",
        fontWeight: 600,
        borderRadius: "0.375rem",
        border: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

export default Button;