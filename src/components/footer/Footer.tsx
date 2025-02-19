import Logo from '@/assets/museum-logo.svg?react';
import ModsenLogo from '@/assets/logo modsen-02 2.svg?react';
import './footer.scss';

const Footer = () => (
  <footer className="footer">
    <Logo className="footer__logo" />
    <ModsenLogo className="footer__modsen_logo" />
  </footer>
);

export default Footer;
