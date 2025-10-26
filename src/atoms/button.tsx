import React from "react";
import Link from "next/link";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <Link
      onClick={onClick}
      className={`bg-[var(--purple-color)] hover:bg-[var(--light-purple-color)] text-white font-semibold px-5 py-3 rounded-[1.875rem] shadow-lg transition ${className}`} href={"#features"}    >
      {label}
    </Link>
  );
};