import { BrowserRouter, Routes, Route } from 'react-router';
import {
  createContext,
  useContext,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  RefObject,
} from 'react';
import { Fields } from 'components/searchForm/SearchForm';
import { Cards } from 'components/cardsList/CardsList';
import { SortParam } from 'components/sortMenu/SortMenu';
import Header from 'components/header/Header';
import HomePage from 'pages/homePage/HomePage';
import FavoritesPage from 'pages/favoritesPage/FavoritesPage';
import ArtPage from 'pages/artPage/ArtPage';
import Footer from 'components/footer/Footer';

type SearchFormContextType = {
  fields: RefObject<Fields>;
  setQueryStr: Dispatch<SetStateAction<string>>;
};

type CardsListContextType = {
  queryStr: string;
  currPage: number;
  amountOfPages: number;
  cards: Cards;
  sortParam: SortParam;
  setCurrPage: Dispatch<SetStateAction<number>>;
  setAmountOfPages: Dispatch<SetStateAction<number>>;
  setCards: Dispatch<SetStateAction<Cards>>;
  setSortParam: Dispatch<SetStateAction<SortParam>>;
};

export const baseUrl = 'https://api.artic.edu';

const SearchFormContext = createContext<SearchFormContextType | null>(null);
const CardsListContext = createContext<CardsListContextType | null>(null);

function App() {
  const fields = useRef<Fields>({
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
  const [sortParam, setSortParam] = useState<SortParam>('no sort');

  return (
    <BrowserRouter>
      <Header />
      <SearchFormContext.Provider value={{ fields, setQueryStr }}>
        <CardsListContext.Provider
          value={{
            queryStr,
            currPage,
            amountOfPages,
            cards,
            sortParam,
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
      <Footer />
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
