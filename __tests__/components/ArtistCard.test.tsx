import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

import { ArtistCard } from "@/components";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ArtistCard Component", () => {
  it("renders ArtistCard component correctly", () => {
    const song = {
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
      title: "Example Title",
      type: "Example Type",
      url: "example-url",
    };

    const { getByAltText, getByText } = render(<ArtistCard song={song} />);

    expect(getByAltText("artist")).toBeInTheDocument();
    expect(getByText("Example Artist")).toBeInTheDocument();
  });

  it("handles click event correctly", () => {
    const song = {
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
      title: "Example Title",
      type: "Example Type",
      url: "example-url",
    };

    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const { container } = render(<ArtistCard song={song} />);

    const firstChild = container.firstChild;

    if (firstChild instanceof Element) {
      fireEvent.click(firstChild);
    }

    expect(mockRouter.push).toHaveBeenCalledWith("/artists/123456789");
  });

  it("does not call router.push when song is not provided", () => {
    const { container } = render(<ArtistCard />);

    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const firstChild = container.firstChild;

    if (firstChild instanceof Element) {
      fireEvent.click(firstChild);
    }

    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
