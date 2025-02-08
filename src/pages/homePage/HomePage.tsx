import { useState } from 'react';
import SearchForm from '../../components/searchForm/SearchForm';
import CardsList from '../../components/cardsList/CardsList';
import './homePage.scss';

const HomePage = () => {
  const [queryStr, setQueryStr] = useState('');

  return (
    <main className="home_page">
      <h1 className="home_page__h1">
        let's find some <span style={{ color: '#F17900' }}>art</span> here!
      </h1>
      <SearchForm setQueryStr={setQueryStr} />
      <CardsList queryStr={queryStr} />
    </main>
  );
};

export default HomePage;
