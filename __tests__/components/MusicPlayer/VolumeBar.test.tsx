import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { VolumeBar } from "@/components/MusicPlayer/VolumeBar";

describe("VolumeBar Component", () => {
  test("renders volume bar and icons", () => {
    const mockProps = {
      value: 0.6,
      min: 0,
      max: 1,
      onChange: jest.fn(),
      setVolume: jest.fn(),
    };

    render(<VolumeBar {...mockProps} />);

    const volumeBar = screen.getByRole("slider");

    const volumeMuteIcon = screen.getByTestId("volume-mute-icon");

    expect(volumeBar).toBeInTheDocument();
    expect(volumeMuteIcon).toBeInTheDocument();
  });

  test("Mutes volume when icon is clicked", () => {
    const mockProps = {
      value: 0.5,
      min: 0,
      max: 1,
      onChange: jest.fn(),
      setVolume: jest.fn(),
    };

    render(<VolumeBar {...mockProps} />);

    const volumeMuteIcon = screen.getByTestId("volume-mute-icon");

    fireEvent.click(volumeMuteIcon);
    expect(mockProps.setVolume).toHaveBeenCalledWith(0);
  });

  test("Unmutes volume when icon is clicked", () => {
    const mockProps = {
      value: 0,
      min: 0,
      max: 1,
      onChange: jest.fn(),
      setVolume: jest.fn(),
    };

    render(<VolumeBar {...mockProps} />);

    const volumeUnmuteIcon = screen.getByTestId("volume-unmute-icon");

    fireEvent.click(volumeUnmuteIcon);
    expect(mockProps.setVolume).toHaveBeenCalledWith(1);
  });

  test("calls onChange when volume bar is changed", () => {
    const mockProps = {
      value: 0.5,
      min: 0,
      max: 1,
      onChange: jest.fn(),
      setVolume: jest.fn(),
    };

    render(<VolumeBar {...mockProps} />);

    const volumeBar = screen.getByRole("slider") as HTMLInputElement;

    fireEvent.change(volumeBar, { target: { value: "0.75" } });

    expect(mockProps.onChange).toHaveBeenCalled();
  });
});
