"use client";

import { getTime } from "@/core/helpers/helpers";
import React from "react";

interface Props {
  value: number;
  min: number;
  max: number;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSeekTime: React.Dispatch<React.SetStateAction<number>>;
  appTime: number;
}

export const Seekbar: React.FC<Props> = ({
  value,
  min,
  max,
  onInput,
  setSeekTime,
  appTime,
}) => {
  return (
    <div className="hidden sm:flex flex-row items-center">
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        className="hidden lg:mr-4 lg:block text-white"
      >
        -
      </button>
      <p className="text-white">{value === 0 ? "0:00" : getTime(value)}</p>
      <input
        data-testid="seek"
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <p className="text-white">{max === 0 ? "0:00" : getTime(max)}</p>
      <button
        type="button"
        onClick={() => setSeekTime(appTime + 5)}
        className="hidden lg:ml-4 lg:block text-white"
      >
        +
      </button>
    </div>
  );
};
