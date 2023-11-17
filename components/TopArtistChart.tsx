"use client";

import React, { useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { PlayerContext } from "@/context/PlayerContext";
import { ArtistCard, Error } from ".";

const TopArtistChart = () => {
  const context = useContext(PlayerContext);

  const { data, error } = useSuspenseQuery({
    queryKey: ["topCharts"],
    queryFn: context?.getTopCharts,
  });

  if (error) return <Error />;

  return (
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      {data?.tracks?.map((song) => (
        <ArtistCard song={song} key={song.key} />
      ))}
    </div>
  );
};

export default TopArtistChart;
