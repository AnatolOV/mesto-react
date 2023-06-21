import React from 'react';

function Footer({ loggedIn }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={loggedIn ? 'footer' : 'footer__invisible'}>
      <p className="footer__text">&copy; {currentYear} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
