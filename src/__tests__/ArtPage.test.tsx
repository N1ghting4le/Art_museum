import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArtPage from '@/pages/artPage/ArtPage';
import useQuery from '@/hooks/query.hook';
import { useParams } from 'react-router';

jest.mock('@/hooks/query.hook');
jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

describe('ArtPage Component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('test_fetch_and_display_artwork_info', async () => {
    const mockData = {
      data: {
        image_id: '123',
        title: 'Artwork Title',
        artist_title: 'Artist Name',
        date_end: '2023',
        place_of_origin: 'France',
        style_title: 'Impressionism',
        dimensions: 'Dimensions',
        credit_line: 'Credit Line',
      },
    };

    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      query: jest.fn().mockResolvedValue(mockData),
    });

    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(<ArtPage />);

    expect(await screen.findByText('Artwork Title')).toBeInTheDocument();
    expect(screen.getByText('Artist Name')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('Impressionism')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  test('test_handle_data_loading_error', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      query: jest.fn().mockResolvedValue({ data: 'data' }),
    });

    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(<ArtPage />);

    expect(await screen.findByText('Unable to load data')).toBeInTheDocument();
  });

  test('test_toggle_favorite_status', async () => {
    const mockData = {
      data: {
        id: 1,
        image_id: '123',
        title: 'Artwork Title',
        artist_title: 'Artist Name',
        date_end: '2023',
        place_of_origin: 'Origin',
        style_title: 'Style',
        dimensions: 'Dimensions',
        credit_line: 'Credit Line',
      },
    };

    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      query: jest.fn().mockResolvedValue(mockData),
    });

    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(<ArtPage />);

    const bookmarkBtn = await screen.findByRole('button');
    fireEvent.click(bookmarkBtn);

    expect(sessionStorage.getItem('favorites')).toContain('Artwork Title');
  });
});
