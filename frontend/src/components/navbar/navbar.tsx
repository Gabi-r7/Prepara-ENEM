import { Link } from 'react-router-dom'
import './navbar.css'
import icons from '../utils/icons';

function Navbar() {

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

  return (
    <>
      <nav>
        <div className="window">
          <div id="logo">
            <Link to="/">
              <img src={logo.src} alt={logo.alt} />
            </Link>
          </div>
          <div id="links">
            {navItems.map((item, index) => (
              <div key={index}>
                <label htmlFor={`${item.id}-link`} className="nav-icon">{item.icon && <item.icon />}</label>
                <Link to={item.path} id={`${item.id}-link`}>{item.text}</Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
