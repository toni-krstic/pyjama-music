"use client";

import React, { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { DropDown, Error, SongCard } from ".";
import { Songs } from "@/types";
import { useAtomValue } from "jotai";
import { activeSongAtom, isPlayingAtom } from "@/atoms/atoms";

const getSongsByGenre = async (genre: string) => {
  try {
    const response = await fetch(
      `https://shazam.p.rapidapi.com/charts/track?listId=${genre}`,
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

const GenreChart = () => {
  const [genreListId, setGenreListId] = useState<string>(
    "genre-global-chart-4"
  );
  const isPlaying = useAtomValue(isPlayingAtom);
  const activeSong = useAtomValue(activeSongAtom);

  const { data, error } = useSuspenseQuery<Songs>({
    queryKey: ["songsByGenre", genreListId],
    queryFn: () => getSongsByGenre(genreListId),
  });

  if (error) return <Error />;

  return (
    <>
      <DropDown genreListId={genreListId} setGenreListId={setGenreListId} />
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
            data={data.tracks}
          />
        ))}
      </div>
    </>
  );
};

export default GenreChart;
