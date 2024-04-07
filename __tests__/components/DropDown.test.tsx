import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DropDown } from "@/components/DropDown";

jest.mock("@headlessui/react", () => ({
  ...jest.requireActual("@headlessui/react"),
  Menu: jest.requireActual("@headlessui/react").Menu,
  Transition: jest.fn(({ children }) => children),
}));

describe("DropDown Component", () => {
  it("renders DropDown component correctly", () => {
    const setGenreListIdMock = jest.fn();
    render(
      <DropDown
        genreListId="genre-global-chart-4"
        setGenreListId={setGenreListIdMock}
      />
    );

    expect(screen.getByText("Discover Electronic")).toBeInTheDocument();
  });

  it("opens the dropdown menu and selects a genre", () => {
    const setGenreListIdMock = jest.fn();
    render(
      <DropDown
        setGenreListId={setGenreListIdMock}
        genreListId="genre-global-chart-4"
      />
    );

    fireEvent.click(screen.getByText("Electronic"));
    fireEvent.click(screen.getByText("Dance"));
    expect(setGenreListIdMock).toHaveBeenCalledWith("genre-global-chart-3");
  });
});
