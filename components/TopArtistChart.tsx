"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Songs } from "@/core/types";
import { getSongs, serviceUrl } from "@/core/services/services";
import { Error } from "./Error";
import { ArtistCard } from "./ArtistCard";

export const TopArtistChart = () => {
  const { data, error } = useSuspenseQuery<Songs>({
    queryKey: ["topCharts"],
    queryFn: () => getSongs(serviceUrl.topCharts()),
  });

  if (error) return <Error />;

  return (
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      {data.tracks?.map((song) => (
        <ArtistCard song={song} key={song.key} />
      ))}
    </div>
  );
};
