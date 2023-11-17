import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Controls from '@/components/MusicPlayer/Controls';
import "@testing-library/jest-dom";

describe('Controls Component', () => {
  test('renders controls with play button', () => {
    const mockProps = {
      isPlaying: false,
      repeat: false,
      setRepeat: jest.fn(),
      shuffle: false,
      setShuffle: jest.fn(),
      currentSongs: [{}],
      handlePlayPause: jest.fn(),
      handlePrevSong: jest.fn(),
      handleNextSong: jest.fn(),
    };

    render(<Controls {...mockProps} />);

    const playButton = screen.getByTestId('play-button');
    expect(playButton).toBeInTheDocument();
  });

  test('handles click events correctly', () => {
    const mockProps = {
      isPlaying: false,
      repeat: false,
      setRepeat: jest.fn(),
      shuffle: false,
      setShuffle: jest.fn(),
      currentSongs: [{}],
      handlePlayPause: jest.fn(),
      handlePrevSong: jest.fn(),
      handleNextSong: jest.fn(),
    };

    render(<Controls {...mockProps} />);

    const playButton = screen.getByTestId('play-button');
    fireEvent.click(playButton);

    expect(mockProps.handlePlayPause).toHaveBeenCalledTimes(1);
  });
  
  // Add more tests for other functionalities as needed
});
