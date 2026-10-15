import { FaPlay, FaInfoCircle } from 'react-icons/fa'
import { useLanguage } from '../i18n/context.js'
import './Hero.css'

function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero" id="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-greeting">{t.hero.greeting}</p>
        <h1 className="hero-name">João Pedro</h1>
        <p className="hero-description">{t.hero.description}</p>
        <div className="hero-buttons">
          <a href="#projects" className="hero-btn hero-btn-primary">
            <FaPlay /> {t.hero.btnText}
          </a>
          <a href="#contact" className="hero-btn hero-btn-secondary">
            <FaInfoCircle /> {t.hero.btnInfo}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
