import { ButtonHTMLAttributes, memo } from 'react';
import Bookmark from 'assets/bookmark.svg?react';
import './bookmarkBtn.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { isFavorite?: boolean };

const BookmarkBtn = memo(({ className, isFavorite, ...props }: Props) => (
  <button
    {...props}
    className={`bookmark_btn ${isFavorite ? 'favorite' : ''} ${className || ''}`}
  >
    <Bookmark />
  </button>
));

export default BookmarkBtn;
