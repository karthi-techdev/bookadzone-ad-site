import React from "react";

export const Heading: React.FC<{ label: string; labelTwo: string; labelThree: string }> = ({
  label,
  labelTwo,
  labelThree,
}) => {
  return (
    <h1
      className=" text-3xl sm:text-4xl md:text-3xl lg:text-6xl leading-tight max-w-[22ch] font-semibold"
    >
      {label}{" "}
      <span className="text-[var(--purple-color)]">
        {labelTwo} <span className="text-white">{labelThree}</span>
      </span>
    </h1>
  );
};

