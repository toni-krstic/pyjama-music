"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Error, SongCard } from ".";
import { Songs } from "@/types";
import { useAtomValue } from "jotai";
import { activeSongAtom, isPlayingAtom } from "@/atoms/atoms";

const getSongsByCountry = async (countryCode: string) => {
  try {
    const response = await fetch(
      `https://shazam.p.rapidapi.com/charts/track?listId=ip-country-chart-${countryCode}`,
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

const getCountry = async () => {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=${process.env.NEXT_PUBLIC_GEO_IPIFY_API_KEY}`
    );
    if (response.ok) {
      const result = await response.json();
      return result.location.country;
    }
  } catch (err) {
    return err;
  }
};

const AroundYouChart = () => {
  const isPlaying = useAtomValue(isPlayingAtom);
  const activeSong = useAtomValue(activeSongAtom);

  const { data: country, error: countryError } = useSuspenseQuery<string>({
    queryKey: ["getCountry"],
    queryFn: () => getCountry(),
  });

  const { data, error } = useSuspenseQuery<Songs>({
    queryKey: ["songsByCountry", country],
    queryFn: () => getSongsByCountry(country),
  });

  if (error && countryError) return <Error />;

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

export default AroundYouChart;
