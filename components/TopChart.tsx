"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Song, Songs } from "@/core/types";
import { useAtomValue } from "jotai";
import { activeSongAtom, isPlayingAtom } from "@/atoms/atoms";
import { Error } from "./Error";
import { SongCard } from "./SongCard";
import { getSongs, serviceUrl } from "@/core/services/services";

export const TopChart = () => {
  const isPlaying = useAtomValue(isPlayingAtom);
  const activeSong = useAtomValue(activeSongAtom);

  const { data, error } = useSuspenseQuery<Songs>({
    queryKey: ["topCharts"],
    queryFn: () => getSongs(serviceUrl.topCharts()),
  });

  if (error) return <Error />;

  return (
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      {data.tracks?.map((song: Song, i) => (
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
