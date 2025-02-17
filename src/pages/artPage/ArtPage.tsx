import Spinner from 'components/spinner/Spinner';
import BookmarkBtn from 'components/bookmarkBtn/BookmarkBtn';
import useArtPage from 'src/hooks/artPage.hook';
import './artPage.scss';

const ArtPage = () => {
  const { baseSrc, isError, isLoading, info, isFavorite, toggleIsFavorite } =
    useArtPage();

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

        const mainInfo = [
          ['title', title],
          ['artist', artist_title],
          ['year', date_end],
        ];

        const addInfo = [
          ['Style', style_title],
          ['Place of origin', place_of_origin],
          ['Dimensions', dimensions],
          ['Credit line', credit_line],
        ];

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
                {mainInfo.map(([cl, info], i) => (
                  <p key={i} className={`art_page__${cl}`}>
                    {info}
                  </p>
                ))}
              </div>
              <div className="art_page__add_info_wrapper">
                <p className="art_page__title">Overview</p>
                {addInfo.map(([descr, info], i) => (
                  <p key={i} className="art_page__add_info">
                    <span>{descr}:</span> {info || noInfo}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
};

export default ArtPage;
