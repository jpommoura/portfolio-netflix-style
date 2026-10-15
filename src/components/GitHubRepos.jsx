import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa'
import { useLanguage } from '../i18n/context.js'
import { useGitHubRepos } from '../hooks/useGitHub.js'
import { getLanguageColor } from '../utils/languageColors.js'
import './GitHubRepos.css'

const MAX_REPOS = 8

function GitHubRepos() {
  const { t } = useLanguage()
  const { data, loading } = useGitHubRepos()
  const repos = (data ?? []).filter((r) => !r.fork).slice(0, MAX_REPOS)

  return (
    <section className="github-repos" id="github">
      <h2 className="section-title">{t.github.title}</h2>
      <p className="github-subtitle">{t.github.subtitle}</p>

      {loading ? (
        <div className="github-loading">
          <div className="github-spinner" />
          <span>{t.github.loading}</span>
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
                {repo.description || t.github.noDescription}
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

export default GitHubRepos
