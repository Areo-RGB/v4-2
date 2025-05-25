import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoCard from './video-card';
import { Video } from '../types';

const mockVideo: Video = {
  id: 'test-id-1',
  title: 'Test Video Title',
  thumbnailUrl: 'https://placehold.co/600x400/EEE/31343C?text=Test+Thumbnail',
  videoUrl: 'https://sample-videos.com/video123/mp4/720/test_video_1mb.mp4',
};

describe('VideoCard Component', () => {
  test('renders video title and thumbnail correctly', () => {
    const mockOnClick = jest.fn();
    render(<VideoCard video={mockVideo} onClick={mockOnClick} />);

    // Check for title
    expect(screen.getByText(mockVideo.title)).toBeInTheDocument();

    // Check for thumbnail image
    const thumbnailImage = screen.getByAltText(mockVideo.title);
    expect(thumbnailImage).toBeInTheDocument();
    expect(thumbnailImage).toHaveAttribute('src', mockVideo.thumbnailUrl);
  });

  test('calls onClick prop with video data when clicked', () => {
    const mockOnClick = jest.fn();
    render(<VideoCard video={mockVideo} onClick={mockOnClick} />);

    // Simulate click on the card
    // The Card component itself is the clickable element
    const cardElement = screen.getByText(mockVideo.title).closest('div.group'); // Adjust selector based on final Card structure
    if (cardElement) {
        fireEvent.click(cardElement);
    } else {
        throw new Error("Card element not found for clicking. Check selector.");
    }
    

    // Check if onClick was called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockVideo);
  });
});
