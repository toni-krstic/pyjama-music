"use client";

import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

import { Song } from "@/core/types";

interface Props {
  isPlaying?: boolean;
  activeSong?: Song;
  song: Song;
  handlePause: () => void;
  handlePlay: () => void;
}

export const PlayPause: React.FC<Props> = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) => {
  const isSongPlaying =
    isPlaying &&
    activeSong?.title &&
    activeSong.title === song.title &&
    activeSong.subtitle === song.subtitle;

  const isArtistSongPlaying =
    isPlaying &&
    activeSong?.attributes &&
    activeSong.attributes.name === song.attributes?.name;

  if (isSongPlaying || isArtistSongPlaying)
    return (
      <FaPauseCircle
        data-testid="pause-icon"
        size={35}
        className="text-gray-300"
        onClick={handlePause}
      />
    );

  return (
    <FaPlayCircle
      data-testid="play-icon"
      size={35}
      className="text-gray-300"
      onClick={handlePlay}
    />
  );
};
