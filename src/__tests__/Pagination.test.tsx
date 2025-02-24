import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '@/components/pagination/Pagination';
import { useCardsListContext } from '@/App';

jest.mock('@/App', () => ({
  useCardsListContext: jest.fn(),
}));

describe('Pagination Component', () => {
  const mockSetCurrPage = jest.fn();

  const mockUseCardsListContext = (currPage: number, amountOfPages: number) => {
    (useCardsListContext as jest.Mock).mockReturnValue({
      currPage,
      setCurrPage: mockSetCurrPage,
      amountOfPages,
    });
  };

  beforeEach(() => {
    mockSetCurrPage.mockClear();
  });

  test('test_pagination_with_few_pages', () => {
    mockUseCardsListContext(1, 3);

    const { getByText } = render(<Pagination disabled={false} />);

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
  });

  test('test_pagination_page_click', () => {
    mockUseCardsListContext(2, 5);

    const { getByText } = render(<Pagination disabled={false} />);

    const pageItem = getByText('3');
    fireEvent.click(pageItem);

    expect(mockSetCurrPage).toHaveBeenCalledWith(3);
  });

  test('test_pagination_left_arrow_hidden_on_first_page', () => {
    mockUseCardsListContext(1, 5);

    const { container } = render(<Pagination disabled={false} />);

    const leftArrowButton = container.querySelector('.pagination__btn.hidden');
    expect(leftArrowButton).toBeInTheDocument();
  });

  test('test_disabled_state', () => {
    mockUseCardsListContext(2, 5);

    const { getByText } = render(<Pagination disabled={true} />);

    const pageItem = getByText('3');
    fireEvent.click(pageItem);

    expect(mockSetCurrPage).not.toHaveBeenCalled();
  });
});
