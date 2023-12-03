"use client";

import { useRef, useEffect } from "react";

import { Song } from "@/core/types";

interface Props {
  activeSong?: Song;
  isPlaying?: boolean;
  volume: number;
  seekTime: number;
  onEnded: () => void;
  onTimeUpdate: (e: React.ChangeEvent<HTMLAudioElement>) => void;
  onLoadedData: (e: React.ChangeEvent<HTMLAudioElement>) => void;
  repeat: boolean;
}

export const Player: React.FC<Props> = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [isPlaying, activeSong]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  if (!activeSong) return null;

  return (
    <audio
      src={
        activeSong.hub?.actions
          ? activeSong.hub?.actions[1]?.uri
          : activeSong.hub?.options
          ? activeSong.hub?.options[0].actions[1].uri
          : activeSong.attributes?.previews[0].url
      }
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
      data-testid="audio"
    />
  );
};
