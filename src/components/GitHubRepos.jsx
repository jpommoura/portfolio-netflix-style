import { useState, useEffect } from 'react'
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa'
import './GitHubRepos.css'

const GITHUB_USERNAME = 'jpommoura'

function GitHubRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=8`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data.filter((r) => !r.fork))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section className="github-repos" id="github">
      <h2 className="section-title">GitHub</h2>
      <p className="github-subtitle">
        Repositórios atualizados em tempo real via GitHub API
      </p>

      {loading ? (
        <div className="github-loading">
          <div className="github-spinner" />
          <span>Carregando repositórios...</span>
        </div>
      ) : (
        <div className="github-grid">
          {repos.map((repo) => (
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-card"
              key={repo.id}
            >
              <div className="github-card-header">
                <FaGithub className="github-card-icon" />
                <h3>{repo.name}</h3>
              </div>
              <p className="github-card-desc">
                {repo.description || 'Sem descrição'}
              </p>
              <div className="github-card-footer">
                {repo.language && (
                  <span className="github-lang">
                    <span
                      className="github-lang-dot"
                      style={{ background: getLanguageColor(repo.language) }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="github-stat">
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span className="github-stat">
                  <FaCodeBranch /> {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

function getLanguageColor(lang) {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    'C#': '#178600',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
  }
  return colors[lang] || '#808080'
}

export default GitHubRepos
