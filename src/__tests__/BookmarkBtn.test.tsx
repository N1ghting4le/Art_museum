import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import BookmarkBtn from '@/components/bookmarkBtn/BookmarkBtn';

describe('BookmarkBtn Component', () => {
  test('test_render_bookmark_btn', () => {
    const { container } = render(<BookmarkBtn />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bookmark_btn');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('test_apply_favorite_class', () => {
    const { container } = render(<BookmarkBtn isFavorite={true} />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('favorite');
  });

  test('test_merge_additional_classes', () => {
    const { container } = render(<BookmarkBtn className="custom-class" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bookmark_btn custom-class');
  });
});
