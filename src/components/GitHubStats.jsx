import { useEffect, useMemo, useRef, useState } from 'react'
import { FaBook, FaStar, FaCode, FaClock } from 'react-icons/fa'
import { useLanguage } from '../i18n/context.js'
import { formatRelative, useGitHubEvents, useGitHubRepos } from '../hooks/useGitHub.js'
import { getLanguageColor } from '../utils/languageColors.js'
import './GitHubStats.css'

const WEEKS = 12
const DAY_MS = 24 * 60 * 60 * 1000

function dayKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function levelFor(count) {
  if (count === 0) return 0
  if (count === 1) return 1
  if (count <= 3) return 2
  if (count <= 6) return 3
  return 4
}

function useInView(ref) {
  const [inView, setInView] = useState(() => !('IntersectionObserver' in window))
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, inView])
  return inView
}

function CountUp({ value, start }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!start) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const duration = reduce || value === 0 ? 0 : 1100
    const begin = performance.now()
    let frame
    const tick = (now) => {
      const progress = duration ? Math.min((now - begin) / duration, 1) : 1
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, start])

  return <>{display}</>
}

function buildLanguages(repos) {
  const counts = new Map()
  repos.forEach((repo) => {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
  })
  const total = [...counts.values()].reduce((sum, n) => sum + n, 0)
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      count,
      percent: total ? (count / total) * 100 : 0,
      color: getLanguageColor(name),
    }))
}

function buildHeatmap(events, lang) {
  const counts = new Map()
  events.forEach((event) => {
    const key = dayKey(new Date(event.created_at))
    counts.set(key, (counts.get(key) ?? 0) + 1)
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(today.getTime() - (today.getDay() + (WEEKS - 1) * 7) * DAY_MS)
  const locale = lang === 'pt' ? 'pt-BR' : 'en'
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'short' })
  const dayFormat = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' })

  const weeks = []
  let lastMonth = -1
  for (let w = 0; w < WEEKS; w++) {
    const days = []
    let monthLabel = ''
    for (let d = 0; d < 7; d++) {
      const date = new Date(start)
      date.setDate(start.getDate() + w * 7 + d)
      if (d === 0 && date.getMonth() !== lastMonth) {
        monthLabel = monthFormat.format(date).replace('.', '')
        lastMonth = date.getMonth()
      }
      const future = date > today
      const count = future ? 0 : counts.get(dayKey(date)) ?? 0
      days.push({ key: dayKey(date), label: dayFormat.format(date), count, future, level: levelFor(count) })
    }
    weeks.push({ days, monthLabel })
  }

  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    return i % 2 === 1 ? weekdayFormat.format(date).replace('.', '') : ''
  })

  return { weeks, weekdays }
}

function GitHubStats() {
  const { lang, t } = useLanguage()
  const s = t.stats
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef)
  const repos = useGitHubRepos()
  const events = useGitHubEvents()
  const [activeLang, setActiveLang] = useState(null)

  const ownRepos = useMemo(() => (repos.data ?? []).filter((repo) => !repo.fork), [repos.data])
  const languages = useMemo(() => buildLanguages(ownRepos), [ownRepos])
  const stars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

  const lastActivity = useMemo(() => {
    const dates = [
      ...ownRepos.map((repo) => repo.pushed_at),
      ...(events.data ?? []).map((event) => event.created_at),
    ].filter(Boolean)
    if (!dates.length) return null
    return dates.reduce((latest, date) => (new Date(date) > new Date(latest) ? date : latest))
  }, [ownRepos, events.data])

  const heatmap = useMemo(() => buildHeatmap(events.data ?? [], lang), [events.data, lang])

  const loading = repos.loading
  const failed = repos.error && !repos.data

  const cards = [
    { icon: FaBook, label: s.repos, value: ownRepos.length, numeric: true },
    { icon: FaStar, label: s.stars, value: stars, numeric: true },
    { icon: FaCode, label: s.topLanguage, value: languages[0]?.name ?? s.none },
    { icon: FaClock, label: s.lastActivity, value: lastActivity ? formatRelative(lastActivity, lang) : s.none },
  ]

  return (
    <section className="gh-stats" id="trending" ref={sectionRef}>
      <h2 className="section-title">{s.title}</h2>
      <p className="gh-stats-subtitle">{s.subtitle}</p>

      {failed ? (
        <p className="gh-stats-error">{s.error}</p>
      ) : (
        <>
          <div className="gh-stats-cards">
            {cards.map((card, index) => {
              const Icon = card.icon
              return (
                <div
                  className={`gh-stats-card ${inView ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 90}ms` }}
                  key={card.label}
                >
                  <span className="gh-stats-rank">{index + 1}</span>
                  <div className="gh-stats-card-body">
                    <Icon className="gh-stats-card-icon" />
                    <span className={`gh-stats-value ${loading ? 'skeleton' : ''}`}>
                      {loading ? ' ' : card.numeric ? <CountUp value={card.value} start={inView} /> : card.value}
                    </span>
                    <span className="gh-stats-label">{card.label}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="gh-stats-panels">
            <div className="gh-stats-panel">
              <h3>{s.languages}</h3>
              <div className="gh-lang-bar" onMouseLeave={() => setActiveLang(null)}>
                {loading && <span className="gh-lang-bar-skeleton" />}
                {languages.map((language) => (
                  <span
                    key={language.name}
                    className={`gh-lang-segment ${activeLang && activeLang !== language.name ? 'dim' : ''}`}
                    style={{
                      width: inView ? `${language.percent}%` : '0%',
                      background: language.color,
                    }}
                    onMouseEnter={() => setActiveLang(language.name)}
                    title={`${language.name} · ${language.percent.toFixed(0)}%`}
                  />
                ))}
              </div>
              <ul className="gh-lang-legend">
                {languages.map((language) => (
                  <li
                    key={language.name}
                    className={`${activeLang && activeLang !== language.name ? 'dim' : ''} ${activeLang === language.name ? 'active' : ''}`}
                    onMouseEnter={() => setActiveLang(language.name)}
                    onMouseLeave={() => setActiveLang(null)}
                    onFocus={() => setActiveLang(language.name)}
                    onBlur={() => setActiveLang(null)}
                    tabIndex={0}
                  >
                    <span className="gh-lang-dot" style={{ background: language.color }} />
                    <span className="gh-lang-name">{language.name}</span>
                    <span className="gh-lang-percent">{language.percent.toFixed(0)}%</span>
                    <span className="gh-lang-count">{s.reposCount(language.count)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="gh-stats-panel">
              <h3>{s.activity}</h3>
              <div className="gh-heatmap-wrapper">
                <div className="gh-heatmap-weekdays" aria-hidden="true">
                  <span />
                  {heatmap.weekdays.map((label, i) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
                <div className="gh-heatmap">
                  {heatmap.weeks.map((week, w) => (
                    <div className="gh-heatmap-week" key={w}>
                      <span className="gh-heatmap-month" aria-hidden="true">{week.monthLabel}</span>
                      {week.days.map((day) => (
                        <span
                          key={day.key}
                          className={`gh-heatmap-cell level-${day.level} ${day.future ? 'future' : ''} ${inView ? 'visible' : ''}`}
                          style={{ transitionDelay: `${w * 35}ms` }}
                          data-tip={day.future ? undefined : `${day.count ? s.events(day.count) : s.noActivity} · ${day.label}`}
                          aria-label={day.future ? undefined : `${day.label}: ${day.count ? s.events(day.count) : s.noActivity}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="gh-heatmap-legend" aria-hidden="true">
                <span>{s.less}</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <span key={level} className={`gh-heatmap-cell visible level-${level}`} />
                ))}
                <span>{s.more}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default GitHubStats
