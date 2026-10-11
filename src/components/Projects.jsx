import { FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useRef } from 'react'
import './Projects.css'

const projects = [
  {
    id: 1,
    name: 'NexTrip',
    description: 'Aplicação web dinâmica de viagens com autenticação e CRUD administrativo.',
    techs: ['HTML', 'CSS', 'JavaScript', 'JSON Server'],
    github: 'https://github.com/jpommoura/NexTrip',
    image: null,
    period: '2026/1',
  },
  {
    id: 2,
    name: 'Vigilare',
    description: 'Plataforma de segurança de bairro com denúncias e mapeamento comunitário.',
    techs: ['HTML', 'Bootstrap', 'JavaScript', 'JSON Server'],
    github: 'https://github.com/jpommoura',
    image: null,
    period: '2026/1',
  },
  {
    id: 3,
    name: 'VemDoar',
    description: 'Plataforma de mobilização de doadores de sangue. Em desenvolvimento.',
    techs: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-2-ti2-8243100-ok',
    image: null,
    badge: 'Em desenvolvimento',
    period: '2026/2',
  },
  {
    id: 4,
    name: 'Arquivo Fácil',
    description: 'Sistema de gerenciamento de notas fiscais com Supabase.',
    techs: ['Node.js', 'Express', 'Supabase'],
    github: 'https://github.com/jpommoura/arquivo-facil',
    image: null,
    period: '2026/2',
  },
  {
    id: 5,
    name: 'PenaltyCrash',
    description: 'Jogo de pênaltis com mecânicas de crash.',
    techs: ['A definir'],
    github: 'https://github.com/vnajose/PenaltyCrash',
    image: null,
    period: '2026/2',
  },
]

function Projects() {
  const rowRef = useRef(null)

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = 350
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="projects" id="projects">
      <h2 className="section-title">Projetos</h2>
      <p className="timeline-subtitle">Linha do tempo — do mais antigo ao mais recente</p>
      <div className="projects-row-wrapper">
        <button className="row-btn row-btn-left" onClick={() => scroll('left')}>
          <FaChevronLeft />
        </button>
        <div className="projects-row" ref={rowRef}>
          {projects.map((project, index) => (
            <div className="timeline-item" key={project.id}>
              <div className="timeline-marker-row">
                <div className={`timeline-line ${index === 0 ? 'timeline-line-hidden' : ''}`} />
                <div className="timeline-dot" />
                <div className={`timeline-line ${index === projects.length - 1 ? 'timeline-line-hidden' : ''}`} />
              </div>
              <span className="timeline-period">{project.period}</span>
              <div className="project-card">
                <div className="project-thumbnail">
                  {project.image ? (
                    <img src={project.image} alt={project.name} />
                  ) : (
                    <div className="project-placeholder">
                      <span>{project.name[0]}</span>
                    </div>
                  )}
                  {project.badge && (
                    <span className="project-badge">{project.badge}</span>
                  )}
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-techs">
                    {project.techs.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-github"
                  >
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="row-btn row-btn-right" onClick={() => scroll('right')}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  )
}

export default Projects
