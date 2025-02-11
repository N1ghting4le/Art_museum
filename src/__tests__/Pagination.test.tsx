import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from 'components/pagination/Pagination';

describe('Pagination Component', () => {
  const mockSetCurrPage = jest.fn();

  test('test_pagination_with_few_pages', () => {
    const { getByText } = render(
      <Pagination
        currPage={1}
        setCurrPage={mockSetCurrPage}
        amountOfPages={3}
      />
    );

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
  });

  test('test_pagination_page_click', () => {
    const { getByText } = render(
      <Pagination
        currPage={2}
        setCurrPage={mockSetCurrPage}
        amountOfPages={5}
      />
    );

    const pageItem = getByText('3');
    fireEvent.click(pageItem);

    expect(mockSetCurrPage).toHaveBeenCalledWith(3);
  });

  test('test_pagination_left_arrow_hidden_on_first_page', () => {
    const { container } = render(
      <Pagination
        currPage={1}
        setCurrPage={mockSetCurrPage}
        amountOfPages={5}
      />
    );

    const leftArrowButton = container.querySelector('.pagination__btn.hidden');
    expect(leftArrowButton).toBeInTheDocument();
  });
});
