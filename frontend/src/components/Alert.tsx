import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

const Alert = ({ children, onClose }: Props) => {
  return (
    <div
      onClick={onClose}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "1rem",
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid #93c5fd",
        backgroundColor: "#eff6ff",
        color: "#1e40af",
        fontSize: "0.875rem",
        cursor: "pointer",  // signals to the user it's clickable
      }}
    >
      <span>{children}</span>
      <span
        aria-label="Close"
        style={{
          fontSize: "1.1rem",
          color: "#3b82f6",
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        ✕
      </span>
    </div>
  );
};

export default Alert;