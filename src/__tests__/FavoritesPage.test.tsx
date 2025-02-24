import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import FavoritesPage from '@/pages/favoritesPage/FavoritesPage';
import { useCardsListContext } from '@/App';
import { ShowCard } from '@/types/cards';

jest.mock('@/App', () => ({
  useCardsListContext: jest.fn(),
}));

const favorites = { current: [] as ShowCard[] };

describe('FavoritesPage Component', () => {
  (useCardsListContext as jest.Mock).mockReturnValue({
    baseSrc: 'http://example.com',
    favorites,
  });

  beforeEach(() => {
    sessionStorage.clear();
  });

  test('test_initialize_and_render_favorites', () => {
    const mockFavorites: ShowCard[] = [
      {
        id: 1,
        image_id: 'img1',
        title: 'Art 1',
        artist_title: 'Artist 1',
        date_end: 2021,
      },
      {
        id: 2,
        image_id: 'img2',
        title: 'Art 2',
        artist_title: 'Artist 2',
        date_end: 2022,
      },
    ];
    favorites.current = mockFavorites;

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Your favorites list')).toBeInTheDocument();
    expect(screen.getByText('Art 1')).toBeInTheDocument();
    expect(screen.getByText('Art 2')).toBeInTheDocument();
  });

  test('test_delete_from_favorites', () => {
    const mockFavorites: ShowCard[] = [
      {
        id: 1,
        image_id: 'img1',
        title: 'Art 1',
        artist_title: 'Artist 1',
        date_end: 2021,
      },
    ];
    favorites.current = mockFavorites;

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Art 1')).not.toBeInTheDocument();
    expect(favorites.current).toEqual([]);
  });

  test('test_no_favorites_display_message', () => {
    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText("You don't have favorites yet")
    ).toBeInTheDocument();
  });
});
