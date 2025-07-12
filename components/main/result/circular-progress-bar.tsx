"use client";

import { CircularProgressbar } from "react-circular-progressbar";

const CircularBar = ({ value, text }: { value: number; text: string }) => {
  return (
    <CircularProgressbar
      value={value}
      text={`${text}%`}
      className=" mx-auto max-w-[160px] "
    />
  );
};

export default CircularBar;
