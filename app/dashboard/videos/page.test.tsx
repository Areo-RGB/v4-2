import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideosPage from './page'; // Assuming this is the correct path to your page component
import { Video } from './types';

// Mock the './data' module
const mockVideosData: Video[] = [
  { id: '1', title: 'Mock Video 1', thumbnailUrl: 'thumb1.jpg', videoUrl: 'video1.mp4' },
  { id: '2', title: 'Mock Video 2', thumbnailUrl: 'thumb2.jpg', videoUrl: 'video2.mp4' },
];
jest.mock('./data', () => ({
  mockVideos: mockVideosData,
}));

// Mock the VideoCard component
jest.mock('./components/video-card', () => {
  // eslint-disable-next-line react/display-name
  return ({ video, onClick }: { video: Video; onClick: (video: Video) => void }) => (
    <div data-testid={`video-card-${video.id}`} onClick={() => onClick(video)}>
      <h3>{video.title}</h3>
      <img src={video.thumbnailUrl} alt={video.title} />
    </div>
  );
});


describe('VideosPage Component', () => {
  test('renders a list of video cards', () => {
    render(<VideosPage />);

    // Check for titles of the mock videos
    expect(screen.getByText('Mock Video 1')).toBeInTheDocument();
    expect(screen.getByText('Mock Video 2')).toBeInTheDocument();

    // Check for thumbnail images (via alt text from our mock VideoCard)
    expect(screen.getByAltText('Mock Video 1')).toBeInTheDocument();
    expect(screen.getByAltText('Mock Video 2')).toBeInTheDocument();
  });

  test('opens dialog with video when a card is clicked', async () => {
    render(<VideosPage />);
    const firstVideoCard = screen.getByTestId('video-card-1'); // Using the test id from mocked VideoCard

    fireEvent.click(firstVideoCard);

    await waitFor(() => {
      // Dialog title should be the title of the clicked video
      expect(screen.getByText(mockVideosData[0].title, { selector: '[role="dialog"] *' })).toBeInTheDocument();
    });

    // Check for the video element within the dialog
    // Note: HTML video elements might not have an explicit role. Query by tag name.
    const videoElement = document.querySelector('video');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('src', mockVideosData[0].videoUrl);
  });

  test('closes dialog when Escape key is pressed', async () => {
    const { container } = render(<VideosPage />);
    const firstVideoCard = screen.getByTestId('video-card-1');

    // Open the dialog
    fireEvent.click(firstVideoCard);

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText(mockVideosData[0].title, { selector: '[role="dialog"] *' })).toBeInTheDocument();
    });
    expect(document.querySelector('video')).toBeInTheDocument();


    // Simulate pressing Escape key on the dialog or container
    // The Dialog component typically attaches its keydown listener to the document or a high-level container.
    fireEvent.keyDown(container, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });
    // Also try on document body as a fallback for where the event listener might be
    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });


    await waitFor(() => {
      // Dialog title and video element should no longer be present
      expect(screen.queryByText(mockVideosData[0].title, { selector: '[role="dialog"] *' })).not.toBeInTheDocument();
      expect(document.querySelector('video')).not.toBeInTheDocument();
    });
  });
});
