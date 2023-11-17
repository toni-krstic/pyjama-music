import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useSuspenseQuery as actualUseSuspenseQuery } from "@tanstack/react-query";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";

import { AroundYouChart } from "@/components";
import { PlayerContext } from "@/context/PlayerContext";

jest.mock("@tanstack/react-query");

const useSuspenseQuery = actualUseSuspenseQuery as jest.Mock;

describe("AroundYouChart Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.mockOnce(JSON.stringify({ location: { country: "HR" } }));
  });

  it("renders AroundYouChart component correctly", async () => {
    const mockContext = {
      currentSongs: [],
      currentIndex: 1,
      isActive: false,
      isPlaying: false,
      activeSong: undefined,
      genreListId: "example-id",
      selectActiveSong: jest.fn(),
      nextSong: jest.fn(),
      prevSong: jest.fn(),
      playPause: jest.fn(),
      selectGenreListId: jest.fn(),
      getTopCharts: jest.fn(),
      getSongsBySearch: jest.fn(),
      getSongsByGenre: jest.fn(() => Promise.resolve(mockData)),
      getSongsByCountry: jest.fn(),
      getSongsByArtist: jest.fn(() => Promise.resolve(mockData)),
    };

    const mockData = {
      tracks: [
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
    };

    useSuspenseQuery.mockImplementation(() => ({
      data: mockData,
      error: null,
    }));

    render(
      <PlayerContext.Provider value={mockContext}>
        <AroundYouChart />
      </PlayerContext.Provider>
    );

    const headingElement = screen.getByText("Around You");
    expect(headingElement).toBeInTheDocument();

    await waitFor(() => {
      const songTitle = screen.getByText("Example Title 1");
      expect(songTitle).toBeInTheDocument();
    });
  });

  it("handles error correctly", () => {
    const mockContext = {
      currentSongs: [],
      currentIndex: 1,
      isActive: false,
      isPlaying: false,
      activeSong: undefined,
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

    useSuspenseQuery.mockImplementation(() => ({
      data: null,
      error: new Error("Test error"),
    }));

    render(
      <PlayerContext.Provider value={mockContext}>
        <AroundYouChart />
      </PlayerContext.Provider>
    );

    const errorMessage = screen.getByText(
      "Something went wrong. Please try again."
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
