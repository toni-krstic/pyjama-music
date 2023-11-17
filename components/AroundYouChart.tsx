"use client";

import React, { useContext, useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { PlayerContext } from "@/context/PlayerContext";
import { Error, SongCard } from ".";

const AroundYouChart = () => {
  const [country, setCountry] = useState("HR");
  const context = useContext(PlayerContext);

  useEffect(() => {
    fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=${process.env.NEXT_PUBLIC_GEO_IPIFY_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setCountry(data?.location?.country))
      .catch((err) => console.log(err));

  }, [country]);
  
  const { data, error } = useSuspenseQuery({
    queryKey: ["songsByCountry", country],
    queryFn: () => context?.getSongsByCountry(country),
  });

  if (error && country) return <Error />;

  return (
    <>
      <h2 className="font-bold font-3xl text-white text-leftmt-4 mb-10">
        Around You <span>{country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={context?.isPlaying}
            activeSong={context?.activeSong}
            data={data.tracks}
            i={i}
          />
        ))}
      </div>
    </>
  );
};

export default AroundYouChart;
