"use client";

import React, { useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Error, SongCard } from ".";
import { PlayerContext } from "@/context/PlayerContext";

interface Props {
  id: string;
}

const ArtistChart: React.FC<Props> = ({ id }) => {
  const context = useContext(PlayerContext);

  const { data, error } = useSuspenseQuery({
    queryKey: ["songsByArtist", id],
    queryFn: () => context?.getSongsByArtist(id),
  });

  if (error) return <Error />;

  return (
    <>
      <h2 className="font-bold font-3xl text-white text-leftmt-4 mb-10">
        Top Songs By:{" "}
        <span>{data?.data ? data.data[0].attributes?.artistName : ""}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.data?.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={context?.isPlaying}
            activeSong={context?.activeSong}
            data={data.data}
            adamid={id}
            i={i}
          />
        ))}
      </div>
    </>
  );
};

export default ArtistChart;
