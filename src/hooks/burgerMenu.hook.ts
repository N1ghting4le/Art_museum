import { useState, useEffect, useRef } from 'react';

const useBurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setIsOpen((isOpen) => !isOpen);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleTouchOutside = (e: TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('touchstart', handleTouchOutside);

    return () => {
      document.removeEventListener('touchstart', handleTouchOutside);
    };
  }, []);

  return { ref, isOpen, toggleMenu, closeMenu };
};

export default useBurgerMenu;
