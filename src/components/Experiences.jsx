import { FaGraduationCap, FaCode, FaLaptopCode } from 'react-icons/fa'
import { useLanguage } from '../i18n/context.js'
import './Experiences.css'

const icons = [FaGraduationCap, FaCode, FaLaptopCode]

function Experiences() {
  const { t } = useLanguage()

  return (
    <section className="experiences" id="experiences">
      <h2 className="section-title">{t.experiences.title}</h2>
      <div className="experiences-list">
        {t.experiences.items.map((exp, index) => {
          const Icon = icons[index] ?? FaCode
          return (
            <div className="experience-card" key={index}>
              <div className="experience-icon">
                <Icon />
              </div>
              <div className="experience-content">
                <h3>{exp.title}</h3>
                <p className="experience-place">{exp.place}</p>
                <p className="experience-description">{exp.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Experiences
