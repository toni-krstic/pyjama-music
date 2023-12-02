"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Error, SongCard } from ".";
import { Search } from "@/types";
import { useAtomValue } from "jotai";
import { activeSongAtom, isPlayingAtom } from "@/atoms/atoms";

interface Props {
  searchTerm: string;
}

const getSongsBySearch = async (searchTerm: string) => {
  try {
    const response = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${searchTerm}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY as string,
          "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        },
      }
    );
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    return err;
  }
};

const SearchChart: React.FC<Props> = ({ searchTerm }) => {
  const isPlaying = useAtomValue(isPlayingAtom);
  const activeSong = useAtomValue(activeSongAtom);

  const { data, error } = useSuspenseQuery<Search>({
    queryKey: ["songsBySearch", searchTerm],
    queryFn: () => getSongsBySearch(searchTerm),
  });

  const songs = data?.tracks?.hits.map((song) => song.track);

  if (error) return <Error />;

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

export default SearchChart;
