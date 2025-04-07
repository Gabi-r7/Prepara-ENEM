// import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import './Navbar.css'
import Login from '../login/login'
import Home from '../home/home'
import Filter from '../filter/filter'
import Ranking from '../ranking/ranking'
import Redaction from '../redaction/redaction'

function Navbar() {

  const logo = {
    name: 'logo',
    src: '/logo.png',
    alt: 'logo do site, um post-it escrito "Prepara ENEM"'
  }

  return (
    <>
      <Router>
        <nav>
          <div className="window">
            <div id='logo'>
              <Link to="/">
                <img src={logo.src} alt={logo.alt} />
              </Link>
            </div>
            <div id='links'>
              <div>
                <span className="material-symbols-outlined">
                  home
                </span>
                <Link to="/">Inicio</Link>
              </div>
              <div>
                <span className="material-symbols-outlined">
                  leaderboard
                </span>
                <Link to="/ranking">Ranking</Link>
              </div>
              <div>
                <span className="material-symbols-outlined">
                  quiz
                </span>
                <Link to="/filter">Questões</Link>
              </div>
              <div>
                <span className="material-symbols-outlined">
                  article
                </span>
                <Link to="/redaction">Redações</Link>
              </div>
              <div>
                <span className="material-symbols-outlined">
                  login
                </span>
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/redaction" element={<Redaction />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default Navbar
