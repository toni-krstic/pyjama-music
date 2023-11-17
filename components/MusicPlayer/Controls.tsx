import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";

import { Song } from "@/types";

interface Props {
  isPlaying?: boolean;
  repeat: boolean;
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>;
  shuffle: boolean;
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
  currentSongs?: Song[];
  handlePlayPause: () => void;
  handlePrevSong: () => void;
  handleNextSong: () => void;
}

const Controls: React.FC<Props> = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
    <BsArrowRepeat
      size={20}
      color={repeat ? "red" : "white"}
      onClick={() => setRepeat((prev) => !prev)}
      className="hidden sm:block cursor-pointer"
    />
    {currentSongs?.length && (
      <MdSkipPrevious
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handlePrevSong}
        data-testid="prev-button"
      />
    )}
    {isPlaying ? (
      <BsFillPauseFill
        size={45}
        color="#FFF"
        onClick={handlePlayPause}
        className="cursor-pointer"
        data-testid="pause-button"
      />
    ) : (
      <BsFillPlayFill
        size={45}
        color="#FFF"
        onClick={handlePlayPause}
        className="cursor-pointer"
        data-testid="play-button"
      />
    )}
    {currentSongs?.length && (
      <MdSkipNext
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handleNextSong}
        data-testid="next-button"
      />
    )}
    <BsShuffle
      size={20}
      color={shuffle ? "red" : "white"}
      onClick={() => setShuffle((prev) => !prev)}
      className="hidden sm:block cursor-pointer"
    />
  </div>
);

export default Controls;
