"use client";

import { Song } from "@/types";

interface Props {
  isPlaying?: boolean;
  isActive?: boolean;
  activeSong?: Song;
}

const replaceImgUrl = (inputUrl: string) => {
  return inputUrl.replace(/{w}x{h}bb.jpg$/, "400x400.jpg");
};

const Track: React.FC<Props> = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
      } hidden sm:block h-16 w-16 mr-4`}
    >
      {activeSong?.images && (
        <img
          src={activeSong?.images?.coverart}
          alt="cover art"
          className="rounded-full"
        />
      )}
      {activeSong?.attributes?.artwork.url && (
        <img
          src={replaceImgUrl(activeSong.attributes?.artwork.url)}
          alt="song_img"
          className="rounded-full"
        />
      )}
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title
          ? activeSong?.title
          : activeSong?.attributes?.name
          ? activeSong?.attributes?.name
          : "No active Song"}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.subtitle
          ? activeSong?.subtitle
          : activeSong?.attributes?.artistName
          ? activeSong?.attributes?.artistName
          : "No active Song"}
      </p>
    </div>
  </div>
);

export default Track;
