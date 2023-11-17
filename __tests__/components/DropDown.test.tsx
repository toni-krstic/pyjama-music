import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DropDown } from "@/components";
import { PlayerContext } from "@/context/PlayerContext";

jest.mock("@headlessui/react", () => ({
  ...jest.requireActual("@headlessui/react"),
  Menu: jest.requireActual("@headlessui/react").Menu,
  Transition: jest.fn(({ children }) => children),
}));

const mockContext = {
  currentSongs: [],
  currentIndex: 1,
  isActive: false,
  isPlaying: false,
  activeSong: undefined,
  genreListId: "genre-global-chart-4",
  selectActiveSong: jest.fn(),
  nextSong: jest.fn(),
  prevSong: jest.fn(),
  playPause: jest.fn(),
  selectGenreListId: jest.fn(),
  getTopCharts: jest.fn(),
  getSongsBySearch: jest.fn(),
  getSongsByGenre: jest.fn(),
  getSongsByCountry: jest.fn(),
  getSongsByArtist: jest.fn(),
};

describe("DropDown Component", () => {
  it("renders DropDown component correctly", () => {
    render(
      <PlayerContext.Provider value={mockContext}>
        <DropDown />
      </PlayerContext.Provider>
    );

    expect(screen.getByText("Discover Electronic")).toBeInTheDocument();
  });

  it("opens the dropdown menu and selects a genre", () => {
    render(
      <PlayerContext.Provider value={mockContext}>
        <DropDown />
      </PlayerContext.Provider>
    );

    fireEvent.click(screen.getByText("Electronic"));
    fireEvent.click(screen.getByText("Dance"));
    expect(mockContext.selectGenreListId).toHaveBeenCalledWith(
      "genre-global-chart-3"
    );
  });
});
