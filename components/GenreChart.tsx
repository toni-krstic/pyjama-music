"use client";

import React, { useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { PlayerContext } from "@/context/PlayerContext";
import { Error, SongCard } from ".";

const GenreChart = () => {
  const context = useContext(PlayerContext);

  const { data, error } = useSuspenseQuery({
    queryKey: ["songsByGenre", context?.genreListId],
    queryFn: () =>
      context?.getSongsByGenre(context?.genreListId || "genre-global-chart-4"),
  });

  if (error) return <Error />;

  return (
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      {data?.tracks?.map((song, i) => (
        <SongCard
          key={song.key}
          song={song}
          isPlaying={context?.isPlaying}
          activeSong={context?.activeSong}
          i={i}
          data={data.tracks}
        />
      ))}
    </div>
  );
};

export default GenreChart;
