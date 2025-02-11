import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchForm from 'components/searchForm/SearchForm';
import { useSearchFormContext, useCardsListContext } from 'src/App';
import useDebounce from 'hooks/debounce.hook';

// Mock the context hooks
jest.mock('src/App', () => ({
  useSearchFormContext: jest.fn(),
  useCardsListContext: jest.fn(),
}));

//jest.mock(, () => jest.fn((fn) => fn));

jest.mock('hooks/debounce.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SearchForm Component', () => {
  beforeEach(() => {
    (useSearchFormContext as jest.Mock).mockReturnValue({
      fields: {
        title: 'Mona Lisa',
        artist_title: 'Leonardo da Vinci',
        place_of_origin: 'Italy',
        style_title: 'Renaissance',
        start_year: '1500',
        end_year: '1519',
      },
      setFields: jest.fn(),
    });

    (useCardsListContext as jest.Mock).mockReturnValue({
      setQueryStr: jest.fn(),
    });

    (useDebounce as jest.Mock).mockReturnValue((fn: Function) => fn);
  });

  test('test_form_initialization_with_context_values', () => {
    render(<SearchForm />);
    expect(screen.getByPlaceholderText('Enter art title...')).toHaveValue(
      'Mona Lisa'
    );
    expect(screen.getByPlaceholderText('Enter artist...')).toHaveValue(
      'Leonardo da Vinci'
    );
    expect(screen.getByPlaceholderText('Enter place of origin...')).toHaveValue(
      'Italy'
    );
    expect(screen.getByPlaceholderText('Enter style...')).toHaveValue(
      'Renaissance'
    );
    expect(screen.getByPlaceholderText('From')).toHaveValue('1500');
    expect(screen.getByPlaceholderText('To')).toHaveValue('1519');
  });

  test('test_form_validation_errors_display', async () => {
    render(<SearchForm />);
    fireEvent.change(screen.getByPlaceholderText('Enter art title...'), {
      target: { value: 'a'.repeat(51) },
    });
    fireEvent.blur(screen.getByPlaceholderText('Enter art title...'));
    await waitFor(() => {
      expect(
        screen.getByText(/Maximum length - 50 characters/i)
      ).toBeInTheDocument();
    });
  });

  test('test_debounced_input_change_handling', async () => {
    const debounceMock = jest.fn((fn) => fn);
    (useDebounce as jest.Mock).mockReturnValue(debounceMock);

    render(<SearchForm />);
    fireEvent.change(screen.getByPlaceholderText('Enter art title...'), {
      target: { value: 'New Title' },
    });

    expect(debounceMock).toHaveBeenCalledWith(expect.any(Function), 500);
  });
});
