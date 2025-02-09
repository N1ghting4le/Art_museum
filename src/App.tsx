import { BrowserRouter, Routes, Route } from 'react-router';
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { Fields } from './components/searchForm/SearchForm';
import { Cards } from './components/cardsList/CardsList';
import Header from './components/header/Header';
import HomePage from './pages/homePage/HomePage';
import FavoritesPage from './pages/favoritesPage/FavoritesPage';
import ArtPage from './pages/artPage/ArtPage';
import './App.scss';

type SearchFormContextType = {
  fields: Fields;
  setFields: Dispatch<SetStateAction<Fields>>;
};

type CardsListContextType = {
  queryStr: string;
  currPage: number;
  amountOfPages: number;
  cards: Cards;
  sortParam: string;
  setQueryStr: Dispatch<SetStateAction<string>>;
  setCurrPage: Dispatch<SetStateAction<number>>;
  setAmountOfPages: Dispatch<SetStateAction<number>>;
  setCards: Dispatch<SetStateAction<Cards>>;
  setSortParam: Dispatch<SetStateAction<string>>;
};

export const baseUrl = 'https://api.artic.edu';

const SearchFormContext = createContext<SearchFormContextType | null>(null);
const CardsListContext = createContext<CardsListContextType | null>(null);

function App() {
  const [fields, setFields] = useState<Fields>({
    title: '',
    artist_title: '',
    place_of_origin: '',
    style_title: '',
    start_year: '',
    end_year: '',
  });
  const [queryStr, setQueryStr] = useState('');
  const [currPage, setCurrPage] = useState(1);
  const [amountOfPages, setAmountOfPages] = useState(1);
  const [cards, setCards] = useState<Cards>([]);
  const [sortParam, setSortParam] = useState('no sort');

  return (
    <BrowserRouter>
      <Header />
      <SearchFormContext.Provider value={{ fields, setFields }}>
        <CardsListContext.Provider
          value={{
            queryStr,
            currPage,
            amountOfPages,
            cards,
            sortParam,
            setQueryStr,
            setCurrPage,
            setAmountOfPages,
            setCards,
            setSortParam,
          }}
        >
          <Routes>
            <Route index element={<HomePage />} />
            <Route path=":id" element={<ArtPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Routes>
        </CardsListContext.Provider>
      </SearchFormContext.Provider>
    </BrowserRouter>
  );
}

export default App;

export const useSearchFormContext = () => {
  const context = useContext(SearchFormContext);

  if (!context) {
    throw new Error(
      'useSearchFormContext has to be used within <SearchFormContext.Provider>'
    );
  }

  return context;
};

export const useCardsListContext = () => {
  const context = useContext(CardsListContext);

  if (!context) {
    throw new Error(
      'useCardsListContext has to be used within <CardsListContext.Provider>'
    );
  }

  return context;
};
