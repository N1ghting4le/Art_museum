import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortMenu from '@/components/sortMenu/SortMenu';

describe('SortMenu Component', () => {
  const mockSetSortParam = jest.fn();

  test('test_toggle_sort_options_visibility', () => {
    const { container } = render(
      <SortMenu sortParam="no sort" setSortParam={mockSetSortParam} />
    );

    const button = container.querySelector('.sort_menu__btn')!;
    const list = container.querySelector('ul');

    fireEvent.click(button);
    expect(list).toHaveClass('active');
    fireEvent.click(button);
    expect(list).not.toHaveClass('active');
  });

  test('test_update_sort_param_on_selection', () => {
    const { getByText, container } = render(
      <SortMenu sortParam="no sort" setSortParam={mockSetSortParam} />
    );

    const button = container.querySelector('.sort_menu__btn')!;
    fireEvent.click(button);

    const titleOption = getByText('title');
    fireEvent.click(titleOption);

    expect(mockSetSortParam).toHaveBeenCalledWith('title');
  });

  test('test_active_class_applied_when_list_visible', () => {
    const { getByText, container } = render(
      <SortMenu sortParam="no sort" setSortParam={mockSetSortParam} />
    );

    const button = container.querySelector('.sort_menu__btn')!;
    fireEvent.click(button);

    expect(button).toHaveClass('active');
    expect(getByText('title').parentElement).toHaveClass('active');
  });
});
