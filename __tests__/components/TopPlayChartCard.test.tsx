import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { TopPlayChartCard } from "@/components/TopPlayChartCard";
import { Song } from "@/core/types";

describe("TopPlayChartCard Component", () => {
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

  it("renders TopPlayChartCard component correctly", () => {
    const mockHandlePause = jest.fn();
    const mockHandlePlay = jest.fn();

    render(
      <TopPlayChartCard
        song={mockSong}
        i={0}
        isPlaying={false}
        activeSong={undefined}
        handlePause={mockHandlePause}
        handlePlay={mockHandlePlay}
      />
    );

    const songTitle = screen.getByText("Example Title 1");
    expect(songTitle).toBeInTheDocument();

    const artistLink = screen.getByText("Example Artist");
    expect(artistLink).toBeInTheDocument();
  });

  it("triggers handlePlay when Play button is clicked", () => {
    const mockHandlePause = jest.fn();
    const mockHandlePlay = jest.fn();

    render(
      <TopPlayChartCard
        song={mockSong}
        i={0}
        isPlaying={false}
        activeSong={undefined}
        handlePause={mockHandlePause}
        handlePlay={mockHandlePlay}
      />
    );

    const playButton = screen.getByTestId("play-icon");
    fireEvent.click(playButton);

    expect(mockHandlePlay).toHaveBeenCalled();
  });
});
