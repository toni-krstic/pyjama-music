"use client";

import React, { useState, useEffect } from "react";

import { Controls } from "./Controls";
import { Player } from "./Player";
import { Seekbar } from "./Seekbar";
import { Track } from "./Track";
import { VolumeBar } from "./VolumeBar";
import { useAtom } from "jotai";
import {
  activeSongAtom,
  currentIndexAtom,
  currentSongsAtom,
  isActiveAtom,
  isPlayingAtom,
} from "@/atoms/atoms";

export const MusicPlayer = () => {
  const [duration, setDuration] = useState<number>(0);
  const [seekTime, setSeekTime] = useState<number>(0);
  const [appTime, setAppTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.3);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [currentSongs] = useAtom(currentSongsAtom);
  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom);
  const [isActive, setIsActive] = useAtom(isActiveAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [activeSong, setActiveSong] = useAtom(activeSongAtom);

  useEffect(() => {
    if (currentSongs.length) setIsPlaying(true);
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleNextSong = () => {
    setIsPlaying(false);

    if (!shuffle) {
      let index = (currentIndex + 1) % currentSongs.length;
      setActiveSong(currentSongs[index]);
      setCurrentIndex(index);
      setIsActive(true);
    } else {
      let index = Math.floor(Math.random() * currentSongs.length);
      setActiveSong(currentSongs[index]);
      setCurrentIndex(index);
      setIsActive(true);
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      let index = currentSongs.length - 1;
      setActiveSong(currentSongs[index]);
      setCurrentIndex(index);
      setIsActive(true);
    } else if (shuffle) {
      let index = Math.floor(Math.random() * currentSongs.length);
      setActiveSong(currentSongs[index]);
      setCurrentIndex(index);
      setIsActive(true);
    } else {
      let index = currentIndex - 1;
      setActiveSong(currentSongs[index]);
      setCurrentIndex(index);
      setIsActive(true);
    }
  };

  return (
    <>
      {(activeSong?.title || activeSong?.attributes?.name) && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
            <Track
              isPlaying={isPlaying}
              isActive={isActive}
              activeSong={activeSong}
            />
            <div className="flex-1 flex flex-col items-center justify-center">
              <Controls
                isPlaying={isPlaying}
                repeat={repeat}
                setRepeat={setRepeat}
                shuffle={shuffle}
                setShuffle={setShuffle}
                currentSongs={currentSongs}
                handlePlayPause={handlePlayPause}
                handlePrevSong={handlePrevSong}
                handleNextSong={handleNextSong}
              />
              <Seekbar
                value={appTime}
                min={0}
                max={duration}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSeekTime(e.target.valueAsNumber)
                }
                setSeekTime={setSeekTime}
                appTime={appTime}
              />
              <Player
                activeSong={activeSong}
                volume={volume}
                isPlaying={isPlaying}
                seekTime={seekTime}
                repeat={repeat}
                onEnded={handleNextSong}
                onTimeUpdate={(e: React.ChangeEvent<HTMLAudioElement>) =>
                  setAppTime(e.target.currentTime)
                }
                onLoadedData={(e: React.ChangeEvent<HTMLAudioElement>) =>
                  setDuration(e.target.duration)
                }
              />
            </div>
            <VolumeBar
              value={volume}
              min={0}
              max={1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setVolume(e.target.valueAsNumber)
              }
              setVolume={setVolume}
            />
          </div>
        </div>
      )}
    </>
  );
};
