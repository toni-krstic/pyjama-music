"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Search } from "@/core/types";
import { useAtomValue } from "jotai";
import { activeSongAtom, isPlayingAtom } from "@/atoms/atoms";
import { Error } from "./Error";
import { SongCard } from "./SongCard";
import { getSongs, serviceUrl } from "@/core/services/services";

interface Props {
  searchTerm: string;
}

export const SearchChart: React.FC<Props> = ({ searchTerm }) => {
  const isPlaying = useAtomValue(isPlayingAtom);
  const activeSong = useAtomValue(activeSongAtom);

  const { data, error } = useSuspenseQuery<Search>({
    queryKey: ["songsBySearch", searchTerm],
    queryFn: () => getSongs(serviceUrl.search(searchTerm)),
  });

  if (error || !data) return <Error />;

  const songs = data.tracks?.hits.map((song) => song.track);

  return (
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      {songs?.map((song, i) => (
        <SongCard
          key={song.key}
          song={song}
          isPlaying={isPlaying}
          activeSong={activeSong}
          data={songs}
          i={i}
        />
      ))}
    </div>
  );
};
