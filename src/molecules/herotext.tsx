import React from "react";
import { Heading } from "../atoms/headertag";
import { Paragraph } from "../atoms/paragraph";
import { Button } from "../atoms/button";

type HeroTextProps = {
  paragraph: string;
  buttonLabel: string;
};

export const HeroText: React.FC<HeroTextProps> = ({  paragraph, buttonLabel }) => {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <Heading label={"Modernize Outdoor Advertising with"} labelTwo={"Predictive AI"} labelThree={"Insights"} />
      <Paragraph label={paragraph} />
      <Button label={buttonLabel} className="mt-5 inline-block max-[556px]:text-[.8rem] max-[556px]:mt-3" />
    </div>
  );
};
