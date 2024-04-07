import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SongCard } from "@/components/SongCard";

const mockSong = {
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

describe("SongCard Component", () => {
  it("renders SongCard component correctly", () => {
    render(
      <SongCard
        song={mockSong}
        isPlaying={false}
        activeSong={undefined}
        i={0}
        data={[]}
        adamid=""
      />
    );

    const songTitleElement = screen.getByText("Example Title 1");
    expect(songTitleElement).toBeInTheDocument();
  });
});
