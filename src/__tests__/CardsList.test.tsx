import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardsList from '@/components/cardsList/CardsList';
import { useCardsListContext } from '@/App';
import { MemoryRouter } from 'react-router';
import useQuery from '@/hooks/query.hook';

jest.mock('@/App', () => ({
  useCardsListContext: jest.fn(),
}));

jest.mock('@/hooks/query.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('CardsList Component', () => {
  const mockUseCardsListContext = (overrides = {}) => {
    (useCardsListContext as jest.Mock).mockReturnValue({
      queryStr: '',
      currPage: 1,
      amountOfPages: 1,
      cards: [],
      sortParam: 'no sort',
      setCurrPage: jest.fn(),
      setAmountOfPages: jest.fn(),
      setCards: jest.fn(),
      setSortParam: jest.fn(),
      ...overrides,
    });
  };

  const mockUseQuery = (overrides = {}) => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      query: jest.fn(),
      ...overrides,
    });
  };

  const cards = [
    {
      id: 1,
      title: 'B Art',
      artist_title: 'Artist B',
      date_end: 2020,
      image_id: 'img1',
    },
    {
      id: 2,
      title: 'A Art',
      artist_title: 'Artist A',
      date_end: 2021,
      image_id: 'img2',
    },
  ];

  test('test_initial_fetch_and_set_cards', async () => {
    const apiResponse = {
      pagination: { total_pages: 1 },
      data: [
        {
          id: 1,
          title: 'Art 1',
          artist_title: 'Artist 1',
          date_end: 2020,
          image_id: 'img1',
        },
      ],
      config: {
        iiif_url: 'http://example.com',
        website_url: 'http://example.com',
      },
    };

    const mockSetCards = jest.fn();
    const mockQuery = jest.fn().mockResolvedValue(apiResponse);

    mockUseCardsListContext({ setCards: mockSetCards });
    mockUseQuery({ query: mockQuery });

    render(<CardsList />);

    await waitFor(() => expect(mockQuery).toHaveBeenCalled());
    expect(mockSetCards).toHaveBeenCalledWith(apiResponse.data);
  });

  test('test_sort_cards_by_parameter', () => {
    mockUseCardsListContext({ cards, sortParam: 'title' });
    mockUseQuery();

    const { container } = render(
      <MemoryRouter>
        <CardsList />
      </MemoryRouter>
    );

    const sortedCards = container.querySelectorAll('.cards_list_item__title');
    expect(sortedCards[0]).toHaveTextContent('A Art');
    expect(sortedCards[1]).toHaveTextContent('B Art');
  });

  test('test_error_handling_on_data_load', () => {
    mockUseCardsListContext({ cards });
    mockUseQuery({ isError: true });

    render(<CardsList />);

    expect(screen.getByText('Unable to load data')).toBeInTheDocument();
  });
});
