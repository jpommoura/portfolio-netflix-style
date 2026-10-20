import { FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useRef } from 'react'
import { useLanguage } from '../i18n/context.js'
import './Projects.css'

const projects = [
  {
    id: 1,
    name: 'NexTrip',
    key: 'nextrip',
    techs: ['HTML', 'CSS', 'JavaScript', 'JSON Server'],
    period: '2026/1',
    github: 'https://github.com/jpommoura/NexTrip',
    image: 'public/NxT-Logo.svg',
  },
  {
    id: 2,
    name: 'Vigilare',
    key: 'vigilare',
    techs: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'JSON Server', 'Node.js'],
    period: '2026/1',
    github: 'https://github.com/jpommoura',
    image: 'public/vigilare-logo.jfif',
  },
{
    id: 3,
    name: 'PenaltyCrash',
    key: 'penaltyCrash',
    techs: ['HTML', 'CSS', 'JavaScript'],
    period: '2026/1',
    github: 'https://github.com/vnajose/PenaltyCrash',
    image: null,
  },
  {
    id: 4,
    name: 'Arquivo Fácil',
    key: 'arquivoFacil',
    techs: ['Node.js', 'Express', 'Supabase'],
    period: '2026/2',
    github: 'https://github.com/jpommoura/arquivo-facil',
    image: null,
  },

  {
    id: 5,
    name: 'VemDoar',
    key: 'vemDoar',
    techs: ['React', 'Vite', 'CSS'],
    period: '2026/2',
    github: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-2-ti2-8243100-ok',
    image: null,
    inProgress: true,
  },
]

function Projects() {
  const rowRef = useRef(null)
  const { t } = useLanguage()

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
      <h2 className="section-title">{t.projects.title}</h2>
      <p className="projects-subtitle">{t.projects.subtitle}</p>
      <div className="projects-row-wrapper">
        <button className="row-btn row-btn-left" onClick={() => scroll('left')}>
          <FaChevronLeft />
        </button>
        <div className="projects-row" ref={rowRef}>
          {projects.map((project, index) => (
            <div className="timeline-item" key={project.id}>
              <div className="timeline-marker-row">
                <div className="timeline-dot" />
                {index < projects.length - 1 && <div className="timeline-line" />}
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
                  {project.inProgress && (
                    <span className="project-badge">{t.projects.inProgress}</span>
                  )}
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{t.projects.items[project.key]}</p>
                  <div className="project-techs">
                    {project.techs.map((tech) => (
                      <span className="tech-tag" key={tech}>{tech}</span>
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
