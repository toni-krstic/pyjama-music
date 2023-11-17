import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useSuspenseQuery as actualUseSuspenseQuery } from "@tanstack/react-query";
import "@testing-library/jest-dom";

import { PlayerContext } from "@/context/PlayerContext";
import { ArtistChart } from "@/components";

jest.mock("@tanstack/react-query");

const useSuspenseQuery = actualUseSuspenseQuery as jest.Mock;

describe("ArtistChart Component", () => {
  it("renders ArtistChart component correctly", async () => {
    const mockData = {
      data: [
        {
          id: "123",      
          attributes: {
            albumName: "example-album-name-1",
            artistName: "Example Artist 1",
            artwork: {
              bgColor: "example-bgColor",
              hasP3: false,
              height: 400,
              textColor1: "example-text-color-1",
              textColor2: "example-text-color-2",
              textColor3: "example-text-color-3",
              textColor4: "example-text-color-4",
              url: "example-url",
              width: 400,
            },
            name: "example-song",
            previews: [
              {
                url: "example-url-1",
              },
              { url: "example-url-2" },
            ],
          },
        },
      ],
    };

    useSuspenseQuery.mockImplementation(() => ({
      data: mockData,
      error: null,
    }));

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
      getSongsByArtist: jest.fn(() => Promise.resolve(mockData)),
    };

    const { getByText } = render(
      <PlayerContext.Provider value={mockContext}>
        <ArtistChart id="123" />
      </PlayerContext.Provider>
    );

    await waitFor(() => {
        const artistNameElement = getByText(/Top Songs By:/i);
        expect(artistNameElement).toBeInTheDocument();
        expect(artistNameElement.textContent).toContain("Example Artist 1");
      });
  });
});
