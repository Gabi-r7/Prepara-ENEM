import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './Navbar.css'
import icons from '../utils/icons';

function Navbar() {
  const [isNavHidden, setIsNavHidden] = useState(false);

  const logo = {
    name: 'logo',
    src: '/logo.png',
    alt: 'logo do site, um post-it escrito "Prepara ENEM"'
  }

  const navItems = [
    { path: '/', text: 'Inicio', icon: icons.Home , id: 'home'},
    { path: '/ranking', text: 'Ranking', icon: icons.Ranking , id: 'ranking'},
    { path: '/filter', text: 'Questões', icon: icons.Filter , id: 'questions'},
    { path: '/essay', text: 'Redações', icon: icons.Essay , id: 'essay'},
    { path: '/login', text: 'Login', icon: icons.Login , id: 'login'},
    { path: '/profile', text: 'Perfil', icon: icons.Profile , id: 'profile'},
  ];

  const handleHiddenMenu = () => {
    setIsNavHidden((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const threshold = window.screen.width * 0.6; // 70% do tamanho da tela
      setIsNavHidden(windowWidth < threshold);
    };

    // Adiciona o evento de resize
    window.addEventListener('resize', handleResize);

    // Chama a função uma vez para verificar o estado inicial
    handleResize();

    // Remove o evento ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className={isNavHidden ? 'hidden-navbar' : ''}>
        <div className="window navbar">
          <div id="logo">
            <Link to="/">
              <img src={logo.src} alt={logo.alt} />
            </Link>
          </div>
          <div id="links">
          {navItems.map((item) => (
            <Link to={item.path} id={`${item.id}-link`} className="link" key={item.id}>
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
