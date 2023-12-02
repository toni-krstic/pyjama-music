"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Error, TopPlayChartCard } from ".";
import { Song, Songs } from "@/types";
import { useAtom, useSetAtom } from "jotai";
import {
  activeSongAtom,
  currentIndexAtom,
  currentSongsAtom,
  isActiveAtom,
  isPlayingAtom,
} from "@/atoms/atoms";

const getTopCharts = async () => {
  try {
    const response = await fetch("https://shazam.p.rapidapi.com/charts/track", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY as string,
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    return err;
  }
};

const TopPlayChart = () => {
  const setCurrentSongs = useSetAtom(currentSongsAtom);
  const setCurrentIndex = useSetAtom(currentIndexAtom);
  const setIsActive = useSetAtom(isActiveAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [activeSong, setActiveSong] = useAtom(activeSongAtom);
  const { data, error } = useSuspenseQuery<Songs>({
    queryKey: ["topCharts-TopPlay"],
    queryFn: getTopCharts,
  });

  if (error) return <Error />;

  const topPlays = data.tracks?.slice(0, 5);

  const handlePauseClick = () => {
    setIsPlaying(false);
  };

  const selectActiveSong = (song: Song, data: Song[], i: number) => {
    setActiveSong(song);
    setCurrentSongs(data);
    setCurrentIndex(i);
    setIsActive(true);
  };

  const handlePlayClick = (song: Song, i: number) => {
    topPlays && selectActiveSong(song, topPlays, i);
    setIsPlaying(true);
  };

  return (
    <div className="mt-4 flex flex-col gap-1">
      {topPlays?.map((song, i) => (
        <TopPlayChartCard
          key={song.key}
          song={song}
          i={i}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      ))}
    </div>
  );
};

export default TopPlayChart;
