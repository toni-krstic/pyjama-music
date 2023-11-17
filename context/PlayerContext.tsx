import { createContext, useState } from "react";

import { Song, PlayerContextType } from "@/types";

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSongs, setCurrentSongs] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSong, setActiveSong] = useState<Song>();
  const [genreListId, setGenreListId] = useState<string>(
   ""
  );

  const selectActiveSong = (song: Song, data: Song[], i: number) => {
    setActiveSong(song);
    setCurrentSongs(data);
    setCurrentIndex(i);
    setIsActive(true);
  };

  const nextSong = (i: number) => {
    setActiveSong(currentSongs[i]);
    setCurrentIndex(i);
    setIsActive(true);
  };

  const prevSong = (i: number) => {
    setActiveSong(currentSongs[i]);
    setCurrentIndex(i);
    setIsActive(true);
  };

  const playPause = (play: boolean) => {
    setIsPlaying(play);
  };

  const selectGenreListId = (id: string) => {
    setGenreListId(id);
  };

  const options: RequestInit = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY as string,
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    },
  };

  const getTopCharts = async () => {
    try {
      const response = await fetch(
        "https://shazam.p.rapidapi.com/charts/track",
        options
      );
      if (response.ok) {
        const result = await response.json();
        return result;
      }
    } catch (err) {
      return err;
    }
  };

  const getSongsBySearch = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `https://shazam.p.rapidapi.com/search?term=${searchTerm}`,
        options
      );
      if (response.ok) {
        const result = await response.json();
        return result;
      }
    } catch (err) {
      return err;
    }
  };

  const getSongsByGenre = async (genre: string) => {
    try {
      const response = await fetch(
        `https://shazam.p.rapidapi.com/charts/track?listId=${genre}`,
        options
      );
      if (response.ok) {
        const result = await response.json();
        return result;
      }
    } catch (err) {
      return err;
    }
  };

  const getSongsByCountry = async (countryCode: string) => {
    try {
      const response = await fetch(
        `https://shazam.p.rapidapi.com/charts/track?listId=ip-country-chart-${countryCode}`,
        options
      );
      if (response.ok) {
        const result = await response.json();
        return result;
      }
    } catch (err) {
      return err;
    }
  };

  const getSongsByArtist = async (artistId: string) => {
    try {
      const response = await fetch(
        `https://shazam.p.rapidapi.com/artists/get-top-songs?id=${artistId}`,
        options
      );
      if (response.ok) {
        const result = await response.json();
        return result;
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSongs,
        currentIndex,
        isActive,
        isPlaying,
        activeSong,
        genreListId,
        selectActiveSong,
        nextSong,
        prevSong,
        playPause,
        selectGenreListId,
        getTopCharts,
        getSongsBySearch,
        getSongsByGenre,
        getSongsByCountry,
        getSongsByArtist,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
