"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Song, Songs } from "@/types";
import { Error, SongCard } from ".";
import { useAtomValue } from "jotai";
import { activeSongAtom, isPlayingAtom } from "@/atoms/atoms";

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

const TopChart = () => {
  const isPlaying = useAtomValue(isPlayingAtom);
  const activeSong = useAtomValue(activeSongAtom);

  const { data, error } = useSuspenseQuery<Songs>({
    queryKey: ["topCharts"],
    queryFn: getTopCharts,
  });

  if (error) return <Error />;

  return (
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      {data?.tracks?.map((song: Song, i) => (
        <SongCard
          key={song.key}
          song={song}
          isPlaying={isPlaying}
          activeSong={activeSong}
          data={data.tracks}
          i={i}
        />
      ))}
    </div>
  );
};

export default TopChart;
