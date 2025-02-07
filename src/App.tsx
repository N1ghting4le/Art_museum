import { BrowserRouter, Routes, Route } from 'react-router';
import Header from './components/header/Header';
import HomePage from './pages/homePage/HomePage';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path=":id" element={<div></div>} />
        <Route path="favorites" element={<div></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
