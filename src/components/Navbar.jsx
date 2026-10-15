import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import LanguageToggle from './LanguageToggle.jsx'
import Notifications from './Notifications.jsx'
import { useLanguage } from '../i18n/context.js'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-left">
        <span className="navbar-logo" onClick={() => scrollTo('hero')}>PORTFOLIO</span>
        <ul className="navbar-links">
          <li onClick={() => scrollTo('hero')}>{t.nav.about}</li>
          <li onClick={() => scrollTo('projects')}>{t.nav.projects}</li>
          <li onClick={() => scrollTo('experiences')}>{t.nav.experiences}</li>
          <li onClick={() => scrollTo('trending')}>{t.nav.github}</li>
          <li onClick={() => scrollTo('skills')}>{t.nav.skills}</li>
          <li onClick={() => scrollTo('contact')}>{t.nav.contact}</li>
        </ul>
      </div>
      <div className="navbar-right">
        <LanguageToggle />
        <Notifications />
        <div className="navbar-profile" onClick={() => navigate('/')} title={t.nav.backToProfiles}>
          <FaUserCircle size={32} color="#e50914" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
