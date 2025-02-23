import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardItem from '@/components/cardItem/CardItem';
import { ShowCard } from '@/types/cards';
import { BrowserRouter as Router } from 'react-router-dom';

const card: ShowCard = {
  id: 1,
  image_id: 'image1',
  title: 'Art Title',
  artist_title: 'Artist Name',
  date_end: 2023,
};

const favorites = { current: [] };

jest.mock('@/hooks/query.hook');

describe('CardItem Component', () => {
  test('test_toggle_favorite_status', () => {
    render(
      <Router>
        <CardItem
          card={card}
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
    const { container } = render(
      <Router>
        <CardItem
          card={{ ...card, api_link: 'http://example.com' }}
          baseSrc="http://example.com"
          favorites={favorites}
        />
      </Router>
    );

    expect(container.querySelector('g')).toBeInTheDocument();
  });

  test('test_display_card', () => {
    render(
      <Router>
        <CardItem
          card={card}
          baseSrc="http://example.com"
          favorites={favorites}
        />
      </Router>
    );

    expect(screen.getByText(card.title)).toBeInTheDocument();
    expect(screen.getByText(card.artist_title!)).toBeInTheDocument();
    expect(screen.getByText(card.date_end!)).toBeInTheDocument();
    expect(screen.getByAltText(card.title)).toBeInTheDocument();
  });
});
