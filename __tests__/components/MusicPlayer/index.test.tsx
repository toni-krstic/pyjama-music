import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { PlayerContext } from "@/context/PlayerContext";
import { MusicPlayer } from "@/components";

const mockPlayerContext = {
  currentSongs: [
    {
      artists: [{ alias: "example-alias", id: "123", adamid: "123456789" }],
      hub: {
        type: "example-type",
        image: "example-image-url",
        actions: [
          { id: "123", uri: "example-uri" },
          { id: "123", uri: "example-uri" },
        ],
      },
      images: {
        background: "example-background-url",
        coverart: "example-coverart-url",
        coverarthq: "example-coverarthq-url",
        joecolor: "example-joecolor",
      },
      key: "123",
      subtitle: "Example Artist",
      title: "Example Title 1",
      type: "Example Type",
      url: "example-url",
    },
    {
      artists: [{ alias: "example-alias", id: "123", adamid: "123456789" }],
      hub: {
        type: "example-type",
        image: "example-image-url",
        actions: [
          { id: "123", uri: "example-uri" },
          { id: "123", uri: "example-uri" },
        ],
      },
      images: {
        background: "example-background-url",
        coverart: "example-coverart-url",
        coverarthq: "example-coverarthq-url",
        joecolor: "example-joecolor",
      },
      key: "234",
      subtitle: "Example Artist",
      title: "Example Title 2",
      type: "Example Type",
      url: "example-url",
    },
  ],
  activeSong: {
    artists: [{ alias: "example-alias", id: "123", adamid: "123456789" }],
    hub: {
      type: "example-type",
      image: "example-image-url",
      actions: [
        { id: "123", uri: "example-uri" },
        { id: "123", uri: "example-uri" },
      ],
    },
    images: {
      background: "example-background-url",
      coverart: "example-coverart-url",
      coverarthq: "example-coverarthq-url",
      joecolor: "example-joecolor",
    },
    key: "123",
    subtitle: "Example Artist",
    title: "Example Title 1",
    type: "Example Type",
    url: "example-url",
  },
  currentIndex: 0,
  isPlaying: false,
  isActive: true,
  genreListId: "example-id",
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

test("renders MusicPlayer component with active song", () => {
  render(
    <PlayerContext.Provider value={mockPlayerContext}>
      <MusicPlayer />
    </PlayerContext.Provider>
  );

  const trackTitle = screen.getByText("Example Title 1");
  const playPauseButton = screen.getByTestId("play-button");
  const nextButton = screen.getByTestId("next-button");
  const prevButton = screen.getByTestId("prev-button");
  const seekbar = screen.getByTestId("seek");
  const volumeBar = screen.getByTestId("volume");

  expect(trackTitle).toBeInTheDocument();
  expect(playPauseButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
  expect(prevButton).toBeInTheDocument();
  expect(seekbar).toBeInTheDocument();
  expect(volumeBar).toBeInTheDocument();
});

test("handles play/pause, next, and previous song interactions", () => {
  render(
    <PlayerContext.Provider value={mockPlayerContext}>
      <MusicPlayer />
    </PlayerContext.Provider>
  );

  const playPauseButton = screen.getByTestId("play-button");
  const nextButton = screen.getByTestId("next-button");
  const prevButton = screen.getByTestId("prev-button");

  fireEvent.click(playPauseButton);
  expect(mockPlayerContext.playPause).toHaveBeenCalledWith(true);

  fireEvent.click(nextButton);
  expect(mockPlayerContext.nextSong).toHaveBeenCalled();

  fireEvent.click(prevButton);
  expect(mockPlayerContext.prevSong).toHaveBeenCalled();
});
