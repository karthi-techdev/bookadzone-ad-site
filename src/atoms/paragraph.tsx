import React from "react";

type ParagraphProps = {
  label: string;
};

export const Paragraph: React.FC<ParagraphProps> = ({ label }) => {
  return (
    <p className="text-[var(--light-grey-color)] text-[0.9375rem] font-medium"> {label} </p>
  );
};