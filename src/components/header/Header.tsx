import { Link } from 'react-router-dom';
import Logo from '@/assets/museum-logo 2.svg?react';
import Home from '@/assets/home.svg?react';
import Bookmark from '@/assets/bookmark.svg?react';
import BurgerMenuIcon from '@/assets/burger-menu.svg?react';
import useBurgerMenu from '@/hooks/burgerMenu.hook';
import './header.scss';

const Header = () => {
  const { ref, toggleMenu, isOpen } = useBurgerMenu();

  return (
    <header className="header" ref={ref}>
      <Logo className="header__logo" />
      <nav className="header__nav">
        <div className={`header__nav__wrapper ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="header__link" onTouchStart={toggleMenu}>
            <Home />
            Home
          </Link>
          <Link
            to="/favorites"
            className="header__link"
            onTouchStart={toggleMenu}
          >
            <Bookmark />
            Favorites
          </Link>
        </div>
      </nav>
      <button className="header__button" onTouchStart={toggleMenu}>
        <BurgerMenuIcon height="100%" width="100%" />
      </button>
    </header>
  );
};

export default Header;
