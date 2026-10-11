import { useState } from 'react'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'
import './Hero.css'

function Hero() {
  const [lang, setLang] = useState('pt')

  const content = {
    pt: {
      greeting: 'Olá, eu sou',
      name: 'João Pedro',
      description:
        'Estudante de Engenharia de Software na PUC Minas, cursando o 2º semestre. Apaixonado por desenvolvimento web, futebol, filmes e games. Buscando minha primeira oportunidade como estagiário na área de desenvolvimento.',
      btnText: 'Ver Projetos',
      btnInfo: 'Mais Informações',
    },
    en: {
      greeting: "Hi, I'm",
      name: 'João Pedro',
      description:
        'Software Engineering student at PUC Minas, currently in my 2nd semester. Passionate about web development, football, movies and gaming. Looking for my first internship opportunity in software development.',
      btnText: 'See Projects',
      btnInfo: 'More Info',
    },
  }

  const t = content[lang]

  return (
    <section className="hero" id="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-lang-toggle">
          <button
            className={lang === 'pt' ? 'active' : ''}
            onClick={() => setLang('pt')}
          >
            PT
          </button>
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </div>
        <p className="hero-greeting">{t.greeting}</p>
        <h1 className="hero-name">{t.name}</h1>
        <p className="hero-description">{t.description}</p>
        <div className="hero-buttons">
          <a href="#projects" className="hero-btn hero-btn-primary">
            <FaPlay /> {t.btnText}
          </a>
          <a href="#contact" className="hero-btn hero-btn-secondary">
            <FaInfoCircle /> {t.btnInfo}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
