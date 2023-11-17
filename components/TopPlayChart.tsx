"use client";

import React, { useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Error, TopPlayChartCard } from ".";
import { PlayerContext } from "@/context/PlayerContext";
import { Song } from "@/types";

const TopPlayChart = () => {
  const context = useContext(PlayerContext);
  const { data, error } = useSuspenseQuery({
    queryKey: ["topCharts-TopPlay"],
    queryFn: context?.getTopCharts,
  });

  if (error) return <Error />;

  const topPlays = data?.tracks?.slice(0, 5);

  const handlePauseClick = () => {
    context?.playPause(false);
  };

  const handlePlayClick = (song: Song, i: number) => {
    topPlays && context?.selectActiveSong(song, topPlays, i);
    context?.playPause(true);
  };

  return (
    <div className="mt-4 flex flex-col gap-1">
      {topPlays?.map((song, i) => (
        <TopPlayChartCard
          key={song.key}
          song={song}
          i={i}
          isPlaying={context?.isPlaying}
          activeSong={context?.activeSong}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      ))}
    </div>
  );
};

export default TopPlayChart;
