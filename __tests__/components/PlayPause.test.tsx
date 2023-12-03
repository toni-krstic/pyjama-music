import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { PlayPause } from "@/components";
import { Song } from "@/core/types";

describe("PlayPause Component", () => {
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

  it("renders PlayPause component with play icon when not playing", () => {
    render(
      <PlayPause
        isPlaying={false}
        activeSong={undefined}
        song={mockSong}
        handlePause={jest.fn()}
        handlePlay={jest.fn()}
      />
    );

    const playIcon = screen.getByTestId("play-icon");
    expect(playIcon).toBeInTheDocument();
  });

  it("renders PlayPause component with pause icon when playing the same song", () => {
    render(
      <PlayPause
        isPlaying={true}
        activeSong={mockSong}
        song={mockSong}
        handlePause={jest.fn()}
        handlePlay={jest.fn()}
      />
    );

    const pauseIcon = screen.getByTestId("pause-icon");
    expect(pauseIcon).toBeInTheDocument();
  });

  it("calls handlePlay when play icon is clicked", () => {
    const handlePlayMock = jest.fn();

    render(
      <PlayPause
        isPlaying={false}
        activeSong={undefined}
        song={mockSong}
        handlePause={jest.fn()}
        handlePlay={handlePlayMock}
      />
    );

    const playIcon = screen.getByTestId("play-icon");
    fireEvent.click(playIcon);

    expect(handlePlayMock).toHaveBeenCalled();
  });

  it("calls handlePause when pause icon is clicked", () => {
    const handlePauseMock = jest.fn();

    render(
      <PlayPause
        isPlaying={true}
        activeSong={mockSong}
        song={mockSong}
        handlePause={handlePauseMock}
        handlePlay={jest.fn()}
      />
    );

    const pauseIcon = screen.getByTestId("pause-icon");
    fireEvent.click(pauseIcon);

    expect(handlePauseMock).toHaveBeenCalled();
  });
});
