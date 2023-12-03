"use client";

import React, { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Songs } from "@/core/types";
import { useAtomValue } from "jotai";
import { activeSongAtom, isPlayingAtom } from "@/atoms/atoms";
import { Error } from "./Error";
import { DropDown } from "./DropDown";
import { SongCard } from "./SongCard";
import { getSongs, serviceUrl } from "@/core/services/services";

interface props {
  initialData: Songs;
}

export const GenreChart = ({ initialData }: props) => {
  const [genreListId, setGenreListId] = useState<string>(
    "genre-global-chart-4"
  );
  const isPlaying = useAtomValue(isPlayingAtom);
  const activeSong = useAtomValue(activeSongAtom);

  const { data, error } = useSuspenseQuery<Songs>({
    queryKey: ["songsByGenre", genreListId],
    queryFn: () => getSongs(serviceUrl.genre(genreListId)),
    initialData: initialData,
  });

  if (error) return <Error />;

  return (
    <>
      <DropDown genreListId={genreListId} setGenreListId={setGenreListId} />
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.tracks?.map((song, i) => (
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
