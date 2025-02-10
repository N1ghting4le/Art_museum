import SearchForm from 'components/searchForm/SearchForm';
import CardsList from 'components/cardsList/CardsList';
import './homePage.scss';

const HomePage = () => {
  return (
    <main className="home_page">
      <h1 className="home_page__h1">
        let's find some <span>art</span> here!
      </h1>
      <SearchForm />
      <CardsList />
    </main>
  );
};

export default HomePage;
