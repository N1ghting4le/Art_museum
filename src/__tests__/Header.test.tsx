import { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';
import Header from 'components/header/Header';
import useBurgerMenu from 'hooks/burgerMenu.hook';

jest.mock('hooks/burgerMenu.hook');

describe('Header Component', () => {
  let toggleMenuMock: jest.Mock;
  let isOpenMock: boolean;

  beforeEach(() => {
    toggleMenuMock = jest.fn();
    isOpenMock = false;
    (useBurgerMenu as jest.Mock).mockReturnValue({
      ref: createRef(),
      toggleMenu: toggleMenuMock,
      isOpen: isOpenMock,
    });
  });

  test('test_burger_menu_toggle_on_touch', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const button = getByRole('button');

    fireEvent.touchStart(button);

    expect(toggleMenuMock).toHaveBeenCalled();
  });

  test('test_nav_wrapper_active_class', () => {
    isOpenMock = true;
    (useBurgerMenu as jest.Mock).mockReturnValue({
      ref: createRef(),
      toggleMenu: toggleMenuMock,
      isOpen: isOpenMock,
    });

    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const navWrapper = container.querySelector('.header__nav__wrapper');

    expect(navWrapper).toHaveClass('active');
  });

  test('test_links_rendering', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Favorites')).toBeInTheDocument();
  });
});
