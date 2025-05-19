import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './navbar.css'
import icons from '../utils/icons';

function Navbar() {
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isNavMinimal, setIsNavMinimal] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const logo = {
    name: 'logo',
    src: '/logo.png',
    alt: 'logo do site, um post-it escrito "Prepara ENEM"'
  }

  const navItems = [
    { path: '/home', text: 'Inicio', icon: icons.Home , id: 'home'},
    { path: '/ranking', text: 'Ranking', icon: icons.Ranking , id: 'ranking'},
    { path: '/filter', text: 'Questões', icon: icons.Filter , id: 'questions'},
    { path: '/essay', text: 'Redações', icon: icons.Essay , id: 'essay'},
    { path: '/login', text: 'Login', icon: icons.Login , id: 'login'},
    { path: '/signup', text: 'Cadastrar', icon: icons.SignUp , id: 'signup'},
    { path: '/profile', text: 'Perfil', icon: icons.Profile , id: 'profile'},
  ];

  const handleHiddenMenu = () => {
    if (isNavMinimal) {
      setIsMobileNavOpen((prev) => !prev);
    } else {
      setIsNavHidden((prev) => !prev);
    }
  };

  const handleLinkClick = () => {
      setIsMobileNavOpen(false);
  };

  const getNavClass = () => {
    if (isMobileNavOpen) return 'open-mobile-navbar';
    if (isNavMinimal) return 'minimal-navbar';
    if (isNavHidden) return 'hidden-navbar';
    return ''; // Classe padrão
  };

  useEffect(() => {
    const handleResizeNav = () => {
      const windowWidth = window.innerWidth;
      const threshold = window.screen.width * 0.6;
      const minimalWidth = window.screen.width * 0.4;

      setIsNavMinimal(windowWidth <= minimalWidth);

      if (windowWidth <= minimalWidth) {
        setIsNavHidden(false);
      } else {
        setIsNavHidden(windowWidth < threshold);
      }

      // Remove a classe open-mobile-navbar se a tela for maior que 40%
      if (windowWidth > minimalWidth) {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResizeNav);
    handleResizeNav();

    return () => {
      window.removeEventListener('resize', handleResizeNav);
    };
  }, []);

  return (
    <>
      <nav className={getNavClass()}>
        <div className="window navbar">
          <div id="logo">
            <Link to="/">
              <img src={logo.src} alt={logo.alt} />
            </Link>
          </div>
          <div id="links">
          {navItems.map((item) => (
            <Link
                to={item.path}
                id={`${item.id}-link`}
                className="link"
                key={item.id}
                onClick={handleLinkClick}
              >
              <span className="nav-icon">{item.icon && <item.icon />}</span>
              <span className="text-link">{item.text}</span>
            </Link>
          ))}
        </div>
        </div>
        <div id="hidde-menu-bt" onClick={handleHiddenMenu}>
          <label>
            {isNavHidden ? (
              <span>
                <icons.DoubleArrowRight className="hidde-menu-icon" />
              </span>
            ) : (
              <span>
                <icons.DoubleArrowLeft className="hidde-menu-icon" />
              </span>
            )}
          </label>
        </div>
      </nav>
    </>
  )
}

export default Navbar
