import {BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from '../navbar/navbar'
import Login from '../login/login'
import Home from '../home/home'
import Filter from '../filter/filter'
import Ranking from '../ranking/ranking'
import Essay from '../essay/essay'
import Footer from '../footer/footer'
import Question from '../question/question'
import Profile from '../profile/profile'
import SignUp from  '../signUp/signUp'
import Introduction from '../introduction/introduction'

function App() {
  const location = useLocation(); // Hook para obter a URL atual

  // Verifica se a página atual é "introdução" (substitua "/introducao" pelo caminho correto)
  const isIntroductionPage = location.pathname == '/';

  return (
    <>
      <div className="app-container">
        {!isIntroductionPage && <Navbar />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/home" element={<Home />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/essay" element={<Essay />} />
            <Route path="/login" element={<Login />} />
            <Route path="/question" element={<Question />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
)
