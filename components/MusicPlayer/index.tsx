"use client";

import React, { useState, useEffect, useContext } from "react";

import { PlayerContext } from "@/context/PlayerContext";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";

const MusicPlayer = () => {
  const context = useContext(PlayerContext);
  const [duration, setDuration] = useState<number>(0);
  const [seekTime, setSeekTime] = useState<number>(0);
  const [appTime, setAppTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.3);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);

  useEffect(() => {
    if (context?.currentSongs?.length) context?.playPause(true);
  }, [context?.currentIndex]);

  const handlePlayPause = () => {
    if (!context?.isActive) return;

    if (context?.isPlaying) {
      context?.playPause(false);
    } else {
      context?.playPause(true);
    }
  };

  const handleNextSong = () => {
    context?.playPause(false);

    if (!shuffle) {
      context?.nextSong(
        (context?.currentIndex + 1) % context?.currentSongs?.length
      );
    } else {
      context?.nextSong(
        Math.floor(Math.random() * context?.currentSongs?.length)
      );
    }
  };

  const handlePrevSong = () => {
    if (context?.currentIndex === 0) {
      context?.prevSong(context?.currentSongs?.length - 1);
    } else if (shuffle) {
      context?.prevSong(
        Math.floor(Math.random() * context?.currentSongs?.length)
      );
    } else {
      context?.prevSong(context?.currentIndex - 1);
    }
  };

  return (
    <>
      {(context?.activeSong?.title ||
        context?.activeSong?.attributes?.name) && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
            <Track
              isPlaying={context?.isPlaying}
              isActive={context?.isActive}
              activeSong={context?.activeSong}
            />
            <div className="flex-1 flex flex-col items-center justify-center">
              <Controls
                isPlaying={context?.isPlaying}
                repeat={repeat}
                setRepeat={setRepeat}
                shuffle={shuffle}
                setShuffle={setShuffle}
                currentSongs={context?.currentSongs}
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
                activeSong={context?.activeSong}
                volume={volume}
                isPlaying={context?.isPlaying}
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

export default MusicPlayer;
