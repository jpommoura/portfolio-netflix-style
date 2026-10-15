import { useEffect, useMemo, useRef, useState } from 'react'
import {
  FaBell,
  FaArrowUp,
  FaBook,
  FaCodeBranch,
  FaTag,
  FaTrashAlt,
  FaStar,
  FaClone,
  FaExclamationCircle,
  FaCommentAlt,
  FaEye,
  FaRocket,
  FaGlobeAmericas,
  FaUserPlus,
  FaGithub,
} from 'react-icons/fa'
import { useLanguage } from '../i18n/context.js'
import { GITHUB_USERNAME, formatRelative, useGitHubEvents } from '../hooks/useGitHub.js'
import './Notifications.css'

const SEEN_KEY = 'portfolio-notifications-seen'
const MAX_ITEMS = 12

function readSeen() {
  try {
    return Number(localStorage.getItem(SEEN_KEY)) || 0
  } catch {
    return 0
  }
}

function writeSeen(value) {
  try {
    localStorage.setItem(SEEN_KEY, String(value))
  } catch {
    return
  }
}

function shortRepo(fullName) {
  const [owner, name] = fullName.split('/')
  return owner?.toLowerCase() === GITHUB_USERNAME.toLowerCase() ? name : fullName
}

function stripRef(ref) {
  return ref ? ref.replace(/^refs\/(heads|tags)\//, '') : ''
}

function describeEvent(event, n) {
  const repoFull = event.repo?.name ?? ''
  const repo = shortRepo(repoFull)
  const repoUrl = `https://github.com/${repoFull}`
  const payload = event.payload ?? {}

  switch (event.type) {
    case 'PushEvent': {
      const branch = stripRef(payload.ref)
      return {
        icon: FaArrowUp,
        text: n.push(repo, branch),
        url: branch ? `${repoUrl}/tree/${branch}` : repoUrl,
      }
    }
    case 'CreateEvent': {
      const ref = stripRef(payload.ref)
      if (payload.ref_type === 'repository') return { icon: FaBook, text: n.createRepo(repo), url: repoUrl }
      if (payload.ref_type === 'tag') return { icon: FaTag, text: n.createTag(repo, ref), url: repoUrl }
      return {
        icon: FaCodeBranch,
        text: n.createBranch(repo, ref),
        url: ref ? `${repoUrl}/tree/${ref}` : repoUrl,
      }
    }
    case 'DeleteEvent':
      return { icon: FaTrashAlt, text: n.deleteRef(repo, stripRef(payload.ref)), url: repoUrl }
    case 'WatchEvent':
      return { icon: FaStar, text: n.star(repo), url: repoUrl }
    case 'ForkEvent':
      return { icon: FaClone, text: n.fork(repo), url: payload.forkee?.html_url ?? repoUrl }
    case 'PullRequestEvent': {
      const action = payload.action === 'closed' && payload.pull_request?.merged ? 'merged' : payload.action
      return { icon: FaCodeBranch, text: n.pr(repo, action), url: payload.pull_request?.html_url ?? repoUrl }
    }
    case 'PullRequestReviewEvent':
      return { icon: FaEye, text: n.review(repo), url: payload.review?.html_url ?? repoUrl }
    case 'IssuesEvent':
      return { icon: FaExclamationCircle, text: n.issue(repo, payload.action), url: payload.issue?.html_url ?? repoUrl }
    case 'IssueCommentEvent':
    case 'CommitCommentEvent':
    case 'PullRequestReviewCommentEvent':
      return { icon: FaCommentAlt, text: n.comment(repo), url: payload.comment?.html_url ?? repoUrl }
    case 'ReleaseEvent':
      return { icon: FaRocket, text: n.release(repo), url: payload.release?.html_url ?? repoUrl }
    case 'PublicEvent':
      return { icon: FaGlobeAmericas, text: n.public(repo), url: repoUrl }
    case 'MemberEvent':
      return { icon: FaUserPlus, text: n.member(repo), url: repoUrl }
    default:
      return { icon: FaGithub, text: n.generic(repo), url: repoUrl }
  }
}

function Notifications() {
  const { lang, t } = useLanguage()
  const n = t.notifications
  const { data, loading, error } = useGitHubEvents()
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(readSeen)
  const [highlightAfter, setHighlightAfter] = useState(seen)
  const wrapperRef = useRef(null)

  const items = useMemo(() => {
    if (!data) return []
    return data.slice(0, MAX_ITEMS).map((event) => ({
      id: event.id,
      date: event.created_at,
      time: new Date(event.created_at).getTime(),
      ...describeEvent(event, n),
    }))
  }, [data, n])

  const unread = items.filter((item) => item.time > seen).length
  const latest = items[0]?.time ?? 0

  useEffect(() => {
    if (!open) return
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next) {
      setHighlightAfter(seen)
      if (latest > seen) {
        writeSeen(latest)
        setSeen(latest)
      }
    }
  }

  return (
    <div className="notifications" ref={wrapperRef}>
      <button
        type="button"
        className={`notifications-bell ${unread > 0 ? 'has-unread' : ''}`}
        onClick={toggle}
        aria-label={n.open}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <FaBell />
        {unread > 0 && <span className="notifications-badge">{unread > 9 ? '9+' : unread}</span>}
      </button>

      {open && (
        <div className="notifications-panel" role="dialog" aria-label={n.title}>
          <div className="notifications-header">{n.title}</div>
          <ul className="notifications-list">
            {loading && <li className="notifications-state">{n.loading}</li>}
            {error && <li className="notifications-state">{n.error}</li>}
            {!loading && !error && items.length === 0 && <li className="notifications-state">{n.empty}</li>}
            {items.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`notifications-item ${item.time > highlightAfter ? 'unread' : ''}`}
                  >
                    <span className="notifications-icon">
                      <Icon />
                    </span>
                    <span className="notifications-body">
                      <span className="notifications-text">{item.text}</span>
                      <span className="notifications-time">{formatRelative(item.date, lang)}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="notifications-footer"
          >
            <FaGithub /> {n.viewAll}
          </a>
        </div>
      )}
    </div>
  )
}

export default Notifications
