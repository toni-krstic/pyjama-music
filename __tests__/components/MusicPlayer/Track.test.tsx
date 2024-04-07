import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Track } from "@/components/MusicPlayer/Track";
import { Song } from "@/core/types";

describe("Track Component", () => {
  test("renders with active song data", () => {
    const mockActiveSong: Song = {
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

    render(
      <Track isPlaying={true} isActive={true} activeSong={mockActiveSong} />
    );

    const titleElement = screen.getByText("Example Title 1");
    const artistElement = screen.getByText("Example Artist");

    expect(titleElement).toBeInTheDocument();
    expect(artistElement).toBeInTheDocument();

    const coverartImage = screen.getByAltText("cover art") as HTMLImageElement;
    expect(coverartImage).toHaveAttribute("src", "example-coverart-url");
  });

  test("renders with no active song", () => {
    render(<Track />);

    const noActiveSongElement = screen.getAllByText("No active Song")[0];
    expect(noActiveSongElement).toBeInTheDocument();
  });
});
