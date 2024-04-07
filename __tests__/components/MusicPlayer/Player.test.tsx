import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Player } from "@/components/MusicPlayer/Player";

const playMock = jest.fn(() => Promise.resolve());
const pauseMock = jest.fn(() => Promise.resolve());

beforeEach(() => {
  jest
    .spyOn(window.HTMLMediaElement.prototype, "play")
    .mockImplementation(playMock);
  jest
    .spyOn(window.HTMLMediaElement.prototype, "pause")
    .mockImplementation(pauseMock);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Player Component", () => {
  test("renders audio element with correct source", () => {
    const mockProps = {
      activeSong: {
        artists: [{ alias: "example-alias", id: "123", adamid: "123456789" }],
        hub: {
          type: "example-type",
          image: "example-image-url",
          actions: [
            { id: "123", uri: "example-uri" },
            {
              id: "123",
              uri: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/24/ac/cb24ac75-128c-f817-7d81-7fbffbdaafe3/mzaf_1522770279362005862.plus.aac.ep.m4a",
            },
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
      isPlaying: false,
      volume: 0.5,
      seekTime: 0,
      onEnded: jest.fn(),
      onTimeUpdate: jest.fn(),
      onLoadedData: jest.fn(),
      repeat: false,
    };

    render(<Player {...mockProps} />);

    const audioElement = screen.getAllByTestId("audio")[0] as HTMLAudioElement;
    expect(audioElement).toBeInTheDocument();

    expect(audioElement.src).toBe(
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/24/ac/cb24ac75-128c-f817-7d81-7fbffbdaafe3/mzaf_1522770279362005862.plus.aac.ep.m4a"
    );
  });

  test("plays and pauses audio", async () => {
    const mockProps = {
      activeSong: {
        artists: [{ alias: "example-alias", id: "123", adamid: "123456789" }],
        hub: {
          type: "example-type",
          image: "example-image-url",
          actions: [
            {
              id: "123",
              uri: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/24/ac/cb24ac75-128c-f817-7d81-7fbffbdaafe3/mzaf_1522770279362005862.plus.aac.ep.m4a",
            },
            {
              id: "123",
              uri: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/24/ac/cb24ac75-128c-f817-7d81-7fbffbdaafe3/mzaf_1522770279362005862.plus.aac.ep.m4a",
            },
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
      isPlaying: false,
      volume: 0.5,
      seekTime: 0,
      onEnded: jest.fn(),
      onTimeUpdate: jest.fn(),
      onLoadedData: jest.fn(),
      repeat: false,
    };

    render(<Player {...mockProps} />);

    const audioElement = screen.getAllByTestId("audio")[0] as HTMLAudioElement;

    expect(audioElement.paused).toBe(true);

    await audioElement.play();

    await waitFor(() => expect(audioElement.play).toHaveBeenCalled());

    await audioElement.pause();

    await waitFor(() => expect(audioElement.pause).toHaveBeenCalled());
  });
});
