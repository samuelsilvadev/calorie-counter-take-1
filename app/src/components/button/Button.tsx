import React from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from "./Button.module.css";

interface Props {
  /**
   * @default "button"
   */
  as?: "button" | "link";
  to?: LinkProps["to"];
  children?: React.ReactNode | undefined;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  "aria-label"?: string;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
}

function Button({
  className = "",
  children,
  as = "button",
  type,
  to,
  disabled,
  "aria-label": ariaLabel,
  onClick,
}: Props) {
  const combinedClassName = `${styles.button} ${className}`;

  if (as === "link") {
    if (!to) {
      return null;
    }

    return (
      <Link
        className={combinedClassName}
        to={to}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
