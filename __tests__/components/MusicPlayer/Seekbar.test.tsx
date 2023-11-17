import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Seekbar from "@/components/MusicPlayer/Seekbar";

describe("Seekbar Component", () => {
  test("renders Seekbar component correctly", () => {
    const mockProps = {
      value: 0,
      min: 0,
      max: 60,
      onInput: jest.fn(),
      setSeekTime: jest.fn(),
      appTime: 60,
    };

    render(<Seekbar {...mockProps} />);

    expect(screen.getByText("0:00")).toBeInTheDocument();
    expect(screen.getByText("1:00")).toBeInTheDocument();
  });

  test("calls onInput function when input range changes", () => {
    const mockProps = {
      value: 30,
      min: 0,
      max: 60,
      onInput: jest.fn(),
      setSeekTime: jest.fn(),
      appTime: 60,
    };

    render(<Seekbar {...mockProps} />);

    const rangeInput = screen.getByTestId("seek") as HTMLInputElement;

    rangeInput.value = "45";
    fireEvent.input(rangeInput);

    expect(mockProps.onInput).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "45" }),
      })
    );
  });
});
