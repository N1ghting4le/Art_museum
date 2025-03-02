import { Link } from 'react-router-dom';
import LargeBookmark from '@/assets/bookmark-large.svg?react';
import BookmarkBtn from '@/components/bookmarkBtn/BookmarkBtn';
import useFavoritesPage from '@/hooks/favoritesPage.hook';
import './favoritesPage.scss';

const FavoritesPage = () => {
  const { favorites, baseSrc, deleteFromFavorites } = useFavoritesPage();

  return (
    <main className="favorites_page">
      <h1 className="favorites_page__h1">
        here are your{' '}
        <span>
          <LargeBookmark height={66} />
          favorites
        </span>
      </h1>
      {favorites.length ? (
        <div className="favorites_page__content_wrapper">
          <p className="favorites_page__text">Saved by you</p>
          <h2 className="favorites_page__h2">Your favorites list</h2>
          <ul className="favorites_page__list">
            {favorites.map((card) => {
              const { id, image_id, title, artist_title, date_end } = card;

              return (
                <li key={id}>
                  <Link to={`/${id}`} className="favorites_page__card">
                    <img
                      src={`${baseSrc}/${image_id}/full/843,/0/default.jpg`}
                      alt={title}
                      className="favorites_page__img"
                    />
                    <div>
                      <p className="cards_list_item__title">
                        {title.length > 16
                          ? `${title.slice(0, 16).trimEnd()}...`
                          : title}
                      </p>
                      <p className="cards_list_item__artist">
                        {artist_title && artist_title.length > 18
                          ? `${artist_title.slice(0, 18).trimEnd()}...`
                          : artist_title}
                      </p>
                      <p className="cards_list_item__year">{date_end}</p>
                    </div>
                    <BookmarkBtn
                      style={{ marginLeft: 'auto' }}
                      id={`${id}`}
                      onClick={deleteFromFavorites}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <h2 className="favorites_page__h2">You don't have favorites yet</h2>
      )}
    </main>
  );
};

export default FavoritesPage;
