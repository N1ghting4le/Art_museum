import { BrowserRouter, Routes, Route } from 'react-router';
import {
  createContext,
  useContext,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  RefObject,
  lazy,
} from 'react';
import { Fields } from '@/components/searchForm/schema';
import { Cards } from '@/types/cards';
import { SortParam } from '@/types/sortParam';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

const HomePage = lazy(() => import('@/pages/homePage/HomePage'));
const FavoritesPage = lazy(() => import('@/pages/favoritesPage/FavoritesPage'));
const ArtPage = lazy(() => import('@/pages/artPage/ArtPage'));
const Page404 = lazy(() => import('@/pages/page404/Page404'));

export type SearchFormContextType = {
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

const SearchFormContext = createContext<SearchFormContextType | null>(null);
const CardsListContext = createContext<CardsListContextType | null>(null);

const routes = [
  ['/', <HomePage />],
  ['/:id', <ArtPage />],
  ['/favorites', <FavoritesPage />],
  ['*', <Page404 />],
] as const;

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
            {routes.map(([path, el]) => (
              <Route key={path} path={path} element={el} />
            ))}
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
