import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from '../navbar/navbar.tsx'
import Login from '../login/login'
import Home from '../home/home'
import Filter from '../filter/filter'
import Ranking from '../ranking/ranking'
import Essay from '../essay/essay'
import Footer from '../footer/footer'
import Question from '../question/question';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/essay" element={<Essay />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Question" element={<Question />}/>
          </Routes>
          <Footer/>
        </div>
      </div>
    </Router>
  </StrictMode>,
)
