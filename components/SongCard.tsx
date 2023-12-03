"use client";

import Link from "next/link";

import { PlayPause } from "./PlayPause";
import { Song } from "@/core/types";
import {
  activeSongAtom,
  currentIndexAtom,
  currentSongsAtom,
  isActiveAtom,
  isPlayingAtom,
} from "@/atoms/atoms";
import { useSetAtom } from "jotai";
import { replaceImgUrl } from "@/core/helpers/helpers";
import classNames from "classnames";

interface Props {
  song: Song;
  isPlaying?: boolean;
  activeSong?: Song;
  i: number;
  data?: Song[];
  adamid?: string;
}

export const SongCard: React.FC<Props> = ({
  song,
  isPlaying,
  activeSong,
  i,
  data,
  adamid,
}) => {
  const setCurrentSongs = useSetAtom(currentSongsAtom);
  const setCurrentIndex = useSetAtom(currentIndexAtom);
  const setIsActive = useSetAtom(isActiveAtom);
  const setIsPlaying = useSetAtom(isPlayingAtom);
  const setActiveSong = useSetAtom(activeSongAtom);

  const handlePauseClick = () => {
    setIsPlaying(false);
  };

  const selectActiveSong = (song: Song, data: Song[], i: number) => {
    setActiveSong(song);
    setCurrentSongs(data);
    setCurrentIndex(i);
    setIsActive(true);
  };

  const handlePlayClick = () => {
    data && selectActiveSong(song, data, i);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={classNames(
            "absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex hidden",
            {
              "flex bg-black bg-opacity-70":
                (activeSong?.title === song.title &&
                  activeSong?.subtitle === song.subtitle) ||
                (activeSong?.attributes?.name === song.attributes?.name &&
                  activeSong?.attributes?.artistName ===
                    song.attributes?.artistName),
            }
          )}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        {song.images && <img src={song.images.coverart} alt="song_img" />}
        {song.attributes?.artwork.url && (
          <img
            src={replaceImgUrl(song.attributes?.artwork.url)}
            alt="song_img"
          />
        )}
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          {song.title ? song.title : song.attributes?.name}
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            href={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : adamid
                ? adamid
                : "/top-artists"
            }
          >
            {song.subtitle ? song.subtitle : song.attributes?.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};
