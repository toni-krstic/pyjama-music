"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Song, Songs } from "@/core/types";
import { useAtom, useSetAtom } from "jotai";
import {
  activeSongAtom,
  currentIndexAtom,
  currentSongsAtom,
  isActiveAtom,
  isPlayingAtom,
} from "@/atoms/atoms";
import { Error } from "./Error";
import { TopPlayChartCard } from "./TopPlayChartCard";
import { getSongs, serviceUrl } from "@/core/services/services";

export const TopPlayChart = () => {
  const setCurrentSongs = useSetAtom(currentSongsAtom);
  const setCurrentIndex = useSetAtom(currentIndexAtom);
  const setIsActive = useSetAtom(isActiveAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [activeSong, setActiveSong] = useAtom(activeSongAtom);
  const { data, error } = useSuspenseQuery<Songs>({
    queryKey: ["topCharts-TopPlay"],
    queryFn: () => getSongs(serviceUrl.topCharts()),
  });

  const topPlays = data.tracks?.slice(0, 5);

  if (error || !topPlays) return <Error />;

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
      {topPlays.map((song, i) => (
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
