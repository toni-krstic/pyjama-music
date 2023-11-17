"use client";

import React, { useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { PlayerContext } from "@/context/PlayerContext";
import { Song } from "@/types";
import { Error, SongCard } from ".";

const TopChart = () => {
  const context = useContext(PlayerContext);

  const { data, error } = useSuspenseQuery({
    queryKey: ["topCharts"],
    queryFn: context?.getTopCharts,
  });

  if (error) return <Error />;

  return (
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      {data?.tracks?.map((song: Song, i) => (
        <SongCard
          key={song.key}
          song={song}
          isPlaying={context?.isPlaying}
          activeSong={context?.activeSong}
          data={data.tracks}
          i={i}
        />
      ))}
    </div>
  );
};

export default TopChart;
