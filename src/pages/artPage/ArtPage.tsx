import { baseUrl } from 'src/App';
import { fieldsStr, ShowCard } from 'components/cardsList/CardsList';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import useQuery from 'hooks/query.hook';
import Spinner from 'components/spinner/Spinner';
import BookmarkBtn from 'components/bookmarkBtn/BookmarkBtn';
import './artPage.scss';

const params = [
  'place_of_origin',
  'style_title',
  'dimensions',
  'credit_line',
] as const;

type FullInfo = ShowCard & {
  [val in (typeof params)[number]]: string | null;
};

const ArtPage = () => {
  const baseSrc = sessionStorage.getItem('baseSrc');
  const favorites = JSON.parse(
    sessionStorage.getItem('favorites') || '[]'
  ) as ShowCard[];
  const { isLoading, isError, query } = useQuery();
  const { id } = useParams() as { id: string };
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((item) => item.id === +id)
  );
  const [info, setInfo] = useState<FullInfo | null>(null);

  useEffect(() => {
    query<{ data: FullInfo }>(
      `${baseUrl}/api/v1/artworks/${id}?${fieldsStr},${params.join()}`
    ).then((res) => {
      setInfo(res.data);
    });
  }, []);

  const toggleIsFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      sessionStorage.setItem(
        'favorites',
        JSON.stringify(favorites.filter((item) => item.id !== +id))
      );
    } else if (info) {
      const { place_of_origin, style_title, dimensions, credit_line, ...card } = info;

      setIsFavorite(true);
      sessionStorage.setItem('favorites', JSON.stringify([...favorites, card]));
    }
  };

  return (
    <main className="art_page">
      {(() => {
        if (isLoading || !info) return <Spinner />;
        if (isError) return <h1>Unable to load data</h1>;

        const {
          image_id,
          title,
          artist_title,
          date_end,
          place_of_origin,
          style_title,
          dimensions,
          credit_line,
        } = info;
        const noInfo = 'No info';

        return (
          <div className="art_page__wrapper">
            <div className="art_page__img_wrapper">
              <img
                src={`${baseSrc}/${image_id}/full/843,/0/default.jpg`}
                alt={title}
                className="art_page__img"
              />
              <BookmarkBtn
                isFavorite={isFavorite}
                onClick={toggleIsFavorite}
                className="art_page__btn"
              />
            </div>
            <div className="art_page__info_wrapper">
              <div className="art_page__main_info_wrapper">
                <p className="art_page__title">{title}</p>
                <p className="art_page__artist">{artist_title}</p>
                <p className="art_page__year">{date_end}</p>
              </div>
              <div className="art_page__add_info_wrapper">
                <p className="art_page__title">Overview</p>
                <p className="art_page__add_info">
                  <span>Style:</span> {style_title || noInfo}
                </p>
                <p className="art_page__add_info">
                  <span>Place of origin:</span> {place_of_origin || noInfo}
                </p>
                <p className="art_page__add_info">
                  <span>Dimensions:</span> {dimensions || noInfo}
                </p>
                <p className="art_page__add_info">
                  <span>Credit line:</span> {credit_line || noInfo}
                </p>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
};

export default ArtPage;
