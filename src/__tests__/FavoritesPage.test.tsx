import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import FavoritesPage from '@/pages/favoritesPage/FavoritesPage';

describe('FavoritesPage Component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('test_initialize_and_render_favorites', () => {
    const mockFavorites = [
      {
        id: 1,
        image_id: 'img1',
        title: 'Art 1',
        artist_title: 'Artist 1',
        date_end: '2021',
      },
      {
        id: 2,
        image_id: 'img2',
        title: 'Art 2',
        artist_title: 'Artist 2',
        date_end: '2022',
      },
    ];
    sessionStorage.setItem('favorites', JSON.stringify(mockFavorites));

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
    const mockFavorites = [
      {
        id: 1,
        image_id: 'img1',
        title: 'Art 1',
        artist_title: 'Artist 1',
        date_end: '2021',
      },
    ];
    sessionStorage.setItem('favorites', JSON.stringify(mockFavorites));

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Art 1')).not.toBeInTheDocument();
    expect(JSON.parse(sessionStorage.getItem('favorites') || '[]')).toEqual([]);
  });

  test('test_no_favorites_display_message', () => {
    render(<FavoritesPage />);

    expect(
      screen.getByText("You don't have favorites yet")
    ).toBeInTheDocument();
  });
});
