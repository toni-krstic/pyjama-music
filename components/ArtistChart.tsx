"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Songs } from "@/core/types";
import { useAtomValue } from "jotai";
import { activeSongAtom, isPlayingAtom } from "@/atoms/atoms";
import { Error } from "./Error";
import { SongCard } from "./SongCard";
import { getSongs, serviceUrl } from "@/core/services/services";

interface Props {
  id: string;
}

export const ArtistChart: React.FC<Props> = ({ id }) => {
  const isPlaying = useAtomValue(isPlayingAtom);
  const activeSong = useAtomValue(activeSongAtom);

  const { data, error } = useSuspenseQuery<Songs>({
    queryKey: ["songsByArtist", id],
    queryFn: () => getSongs(serviceUrl.artist(id)),
  });

  if (error) return <Error />;

  return (
    <>
      <h2 className="font-bold font-3xl text-white text-leftmt-4 mb-10">
        Top Songs By:{" "}
        <span>{data.data ? data.data[0].attributes?.artistName : ""}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.data?.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data.data}
            adamid={id}
            i={i}
          />
        ))}
      </div>
    </>
  );
};
