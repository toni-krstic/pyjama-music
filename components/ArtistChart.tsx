"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Error, SongCard } from ".";
import { Songs } from "@/types";
import { useAtomValue } from "jotai";
import { activeSongAtom, isPlayingAtom } from "@/atoms/atoms";

interface Props {
  id: string;
}

const getSongsByArtist = async (artistId: string) => {
  try {
    const response = await fetch(
      `https://shazam.p.rapidapi.com/artists/get-top-songs?id=${artistId}`,
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

const ArtistChart: React.FC<Props> = ({ id }) => {
  const isPlaying = useAtomValue(isPlayingAtom);
  const activeSong = useAtomValue(activeSongAtom);

  const { data, error } = useSuspenseQuery<Songs>({
    queryKey: ["songsByArtist", id],
    queryFn: () => getSongsByArtist(id),
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

export default ArtistChart;
