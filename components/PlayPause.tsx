"use client";

import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

import { Song } from "@/types";

interface Props {
  isPlaying?: boolean;
  activeSong?: Song;
  song: Song;
  handlePause: () => void;
  handlePlay: () => void;
}

const PlayPause: React.FC<Props> = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) =>
  isPlaying &&
  activeSong?.title &&
  activeSong.title === song.title &&
  activeSong.subtitle === song.subtitle ? (
    <FaPauseCircle
      data-testid="pause-icon"
      size={35}
      className="text-gray-300"
      onClick={handlePause}
    />
  ) : isPlaying &&
    activeSong?.attributes &&
    activeSong.attributes.name === song.attributes?.name ? (
    <FaPauseCircle
      data-testid="pause-icon"
      size={35}
      className="text-gray-300"
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      data-testid="play-icon"
      size={35}
      className="text-gray-300"
      onClick={handlePlay}
    />
  );

export default PlayPause;
