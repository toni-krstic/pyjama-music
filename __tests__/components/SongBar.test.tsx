import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SongBar } from "@/components";
import { Song } from "@/types";

describe("SongBar Component", () => {
  const mockSong: Song = {
    artists: [{ alias: "example-alias", id: "123", adamid: "123456789" }],
    hub: {
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
    url: "example-url",
  };

  const mockIndex = 0;
  const mockIsPlaying = false;
  const mockActiveSong: Song | undefined = undefined;
  const mockHandlePauseClick = jest.fn();
  const mockHandlePlayClick = jest.fn();

  it("renders SongBar component correctly", () => {
    render(
      <SongBar
        song={mockSong}
        i={mockIndex}
        isPlaying={mockIsPlaying}
        activeSong={mockActiveSong}
        handlePauseClick={mockHandlePauseClick}
        handlePlayClick={mockHandlePlayClick}
      />
    );

    const songTitle = screen.getByText("Example Title 1");
    expect(songTitle).toBeInTheDocument();
  });

  it("calls handlePlayClick when PlayPause is clicked", () => {
    render(
      <SongBar
        song={mockSong}
        i={mockIndex}
        isPlaying={mockIsPlaying}
        activeSong={mockActiveSong}
        handlePauseClick={mockHandlePauseClick}
        handlePlayClick={mockHandlePlayClick}
      />
    );

    const playPauseButton = screen.getByTestId("play-icon");
    fireEvent.click(playPauseButton);

    expect(mockHandlePlayClick).toHaveBeenCalledWith(mockSong, mockIndex);
  });
});
