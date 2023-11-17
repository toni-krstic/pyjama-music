import React from "react";
import Link from "next/link";

import { PlayPause } from ".";
import { Song } from "@/types";

interface Props {
  song: Song;
  i: number;
  isPlaying?: boolean;
  activeSong?: Song;
  handlePause: () => void;
  handlePlay: (song: Song, data: Song[], i: number) => void;
}

const TopPlayChartCard: React.FC<Props> = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4C426E] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <p className="text-xl font-bold text-white">{song?.title}</p>

        <Link
          href={
            song.artists ? `/songs/${song?.artists[0].adamid}` : "/top-artists"
          }
        >
          <p className="text-base mt-1 text-gray-300">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePause}
      handlePlay={handlePlay}
    />
  </div>
);

export default TopPlayChartCard;
