"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Songs } from "@/core/types";
import { useAtomValue } from "jotai";
import { activeSongAtom, isPlayingAtom } from "@/atoms/atoms";
import { Error } from "./Error";
import { SongCard } from "./SongCard";
import { Loader } from "./Loader";
import { getCountry, getSongs, serviceUrl } from "@/core/services/services";

interface props {
  country: string;
}

export const AroundYouChart = ({ country }: props) => {
  const isPlaying = useAtomValue(isPlayingAtom);
  const activeSong = useAtomValue(activeSongAtom);

  const { data, error } = useSuspenseQuery<Songs>({
    queryKey: ["songsByCountry", country],
    queryFn: () => getSongs(serviceUrl.country(country)),
  });

  if (error) return <Error />;

  return (
    <>
      <h2 className="font-bold font-3xl text-white text-leftmt-4 mb-10">
        Around You <span>{country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.tracks?.map((song, i) => (
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
    </>
  );
};
