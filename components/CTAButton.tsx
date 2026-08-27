"use client";

import React from "react";
import { useModal } from "./ModalContext";

interface CTAButtonProps {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

export default function CTAButton({
  onClick,
  className = "",
  style,
  children,
  onMouseOver,
  onMouseOut,
}: CTAButtonProps) {
  const { openModal } = useModal();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      openModal();
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => {
        // Trigger prefetch on hover for zero perceived delay
        openModal;
      }}
      className={className}
      style={style}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </button>
  );
}

