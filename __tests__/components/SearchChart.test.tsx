import React from "react";
import { render, screen } from "@testing-library/react";
import { useSuspenseQuery as actualUseSuspenseQuery } from "@tanstack/react-query";
import "@testing-library/jest-dom";

import { SearchChart } from "@/components/SearchChart";

jest.mock("@tanstack/react-query");

const useSuspenseQuery = actualUseSuspenseQuery as jest.Mock;

describe("SearchChart Component", () => {
  const mockSearchTerm = "test";
  const mockData = {
    tracks: {
      hits: [
        {
          track: {
            artists: [
              { alias: "example-alias", id: "123", adamid: "123456789" },
            ],
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
        },
        {
          track: {
            artists: [
              { alias: "example-alias", id: "123", adamid: "123456789" },
            ],
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
        },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  useSuspenseQuery.mockImplementation(() => ({
    data: mockData,
    error: null,
  }));

  it("renders SearchChart component correctly", () => {
    render(<SearchChart searchTerm={mockSearchTerm} />);

    mockData.tracks.hits.forEach((song) => {
      const songElement = screen.getByText(song.track.title);
      expect(songElement).toBeInTheDocument();
    });
  });

  it("renders Error component when there is an error", () => {
    useSuspenseQuery.mockImplementation(() => ({
      data: null,
      error: new Error("Test error"),
    }));

    render(<SearchChart searchTerm={mockSearchTerm} />);

    const errorComponent = screen.getByText(
      "Something went wrong. Please try again."
    );
    expect(errorComponent).toBeInTheDocument();
  });
});
