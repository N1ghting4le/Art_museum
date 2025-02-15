import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardItem from 'components/cardItem/CardItem';
import { ShowCard } from 'components/cardsList/CardsList';
import { BrowserRouter as Router } from 'react-router-dom';
import useQuery from 'hooks/query.hook';

const mockQuery = jest.fn();
const mockSetCards = jest.fn();

const card: ShowCard = {
  id: 1,
  image_id: 'image1',
  title: 'Art Title',
  artist_title: 'Artist Name',
  date_end: 2023,
};

const favorites = { current: [] };

jest.mock('hooks/query.hook');

describe('CardItem Component', () => {
  test('test_toggle_favorite_status', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      query: mockQuery,
    });

    render(
      <Router>
        <CardItem
          card={card}
          setCards={mockSetCards}
          baseSrc="http://example.com"
          favorites={favorites}
        />
      </Router>
    );

    const bookmarkBtn = screen.getByRole('button');

    fireEvent.click(bookmarkBtn);
    expect(favorites.current).toHaveLength(1);
    fireEvent.click(bookmarkBtn);
    expect(favorites.current).toHaveLength(0);
  });

  test('test_display_spinner_on_loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      query: mockQuery,
    });

    const { container } = render(
      <Router>
        <CardItem
          card={card}
          setCards={mockSetCards}
          baseSrc="http://example.com"
          favorites={favorites}
        />
      </Router>
    );

    expect(container.querySelector('g')).toBeInTheDocument();
  });

  test('test_display_error_message_on_load_failure', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      query: mockQuery,
    });

    render(
      <Router>
        <CardItem
          card={card}
          setCards={mockSetCards}
          baseSrc="http://example.com"
          favorites={favorites}
        />
      </Router>
    );

    expect(screen.getByText('Unable to load art')).toBeInTheDocument();
  });
});
