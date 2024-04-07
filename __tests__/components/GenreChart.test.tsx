import React from "react";
import { render, screen } from "@testing-library/react";
import { useSuspenseQuery as actualUseSuspenseQuery } from "@tanstack/react-query";
import "@testing-library/jest-dom";

import { GenreChart } from "@/components/GenreChart";

jest.mock("@tanstack/react-query");

const useSuspenseQuery = actualUseSuspenseQuery as jest.Mock;

describe("GenreChart Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders GenreChart component correctly", () => {
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

    render(<GenreChart initialData={mockData} />);

    mockData.tracks.forEach((song) => {
      const songElement = screen.getByText(song.title);
      expect(songElement).toBeInTheDocument();
    });
  });

  it("handles error correctly", () => {
    useSuspenseQuery.mockImplementation(() => ({
      data: null,
      error: new Error("Test error"),
    }));

    render(<GenreChart initialData={{}} />);

    const errorMessage = screen.getByText(
      "Something went wrong. Please try again."
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
