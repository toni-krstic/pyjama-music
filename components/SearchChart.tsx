"use client";

import React, { useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { PlayerContext } from "@/context/PlayerContext";
import { Error, SongCard } from ".";

interface Props {
  searchTerm: string;
}

const SearchChart: React.FC<Props> = ({ searchTerm }) => {
  const context = useContext(PlayerContext);

  const { data, error } = useSuspenseQuery({
    queryKey: ["songsBySearch", searchTerm],
    queryFn: () => context?.getSongsBySearch(searchTerm),
  });

  const songs = data?.tracks?.hits.map((song) => song.track);

  if (error) return <Error />;

  return (
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      {songs?.map((song, i) => (
        <SongCard
          key={song.key}
          song={song}
          isPlaying={context?.isPlaying}
          activeSong={context?.activeSong}
          data={songs}
          i={i}
        />
      ))}
    </div>
  );
};

export default SearchChart;
