"use client";

import React from "react";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";

interface Props {
  value: number;
  min: number;
  max: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const VolumeBar: React.FC<Props> = ({
  value,
  min,
  max,
  onChange,
  setVolume,
}) => (
  <div className="hidden lg:flex flex-1 items-center justify-end">
    {value <= 1 && value > 0.5 && (
      <BsFillVolumeUpFill
        data-testid="volume-mute-icon"
        size={25}
        color="#FFF"
        onClick={() => setVolume(0)}
      />
    )}
    {value <= 0.5 && value > 0 && (
      <BsVolumeDownFill
        data-testid="volume-mute-icon"
        size={25}
        color="#FFF"
        onClick={() => setVolume(0)}
      />
    )}
    {value === 0 && (
      <BsFillVolumeMuteFill
        data-testid="volume-unmute-icon"
        size={25}
        color="#FFF"
        onClick={() => setVolume(1)}
      />
    )}
    <input
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
      data-testid="volume"
    />
  </div>
);

export default VolumeBar;
