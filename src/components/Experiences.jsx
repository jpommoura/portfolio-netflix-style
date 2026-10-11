import { FaGraduationCap, FaCode, FaLaptopCode } from 'react-icons/fa'
import './Experiences.css'

const experiences = [
  {
    icon: <FaGraduationCap />,
    title: 'Engenharia de Software',
    place: 'PUC Minas — Contagem',
    period: '2026 – 2030 (previsão)',
    description: 'Graduação em andamento, atualmente no 2º semestre. Foco em desenvolvimento web e engenharia de software.',
  },
  {
    icon: <FaCode />,
    title: 'Projetos Acadêmicos',
    place: 'PUC Minas',
    period: '2026',
    description: 'Desenvolvimento de projetos práticos como NexTrip, Vigilare e VemDoar, aplicando HTML, CSS, JavaScript, Bootstrap e JSON Server.',
  },
  {
    icon: <FaLaptopCode />,
    title: 'Projetos Pessoais',
    place: 'Freelance / Autodidata',
    period: '2026',
    description: 'Criação do Arquivo Fácil (Node.js + Supabase) para gerenciamento de notas fiscais, e exploração de APIs e ferramentas modernas de desenvolvimento.',
  },
]

function Experiences() {
  return (
    <section className="experiences" id="experiences">
      <h2 className="section-title">Experiências</h2>
      <div className="experiences-list">
        {experiences.map((exp, index) => (
          <div className="experience-card" key={index}>
            <div className="experience-icon">{exp.icon}</div>
            <div className="experience-content">
              <div className="experience-header">
                <h3>{exp.title}</h3>
                <span className="experience-period">{exp.period}</span>
              </div>
              <p className="experience-place">{exp.place}</p>
              <p className="experience-description">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experiences
