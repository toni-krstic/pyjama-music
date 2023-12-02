"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { ArtistCard, Error } from ".";
import { Songs } from "@/types";

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

const TopArtistChart = () => {
  const { data, error } = useSuspenseQuery<Songs>({
    queryKey: ["topCharts"],
    queryFn: getTopCharts,
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

export default TopArtistChart;
