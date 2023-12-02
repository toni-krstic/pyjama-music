import { atom } from "jotai";
import { Song } from "@/types";

export const currentSongsAtom = atom<Song[]>([]);
export const currentIndexAtom = atom<number>(0);
export const isActiveAtom = atom<boolean>(false);
export const isPlayingAtom = atom<boolean>(false);
export const activeSongAtom = atom<Song | undefined>(undefined);
