import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

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
          <li onClick={() => scrollTo('hero')}>Sobre Mim</li>
          <li onClick={() => scrollTo('projects')}>Projetos</li>
          <li onClick={() => scrollTo('experiences')}>Experiências</li>
          <li onClick={() => scrollTo('contact')}>Contato</li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="navbar-profile" onClick={() => navigate('/')}>
          <FaUserCircle size={32} color="#e50914" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
