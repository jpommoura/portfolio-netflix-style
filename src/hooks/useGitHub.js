import { useEffect, useState } from 'react'

export const GITHUB_USERNAME = 'jpommoura'

const API = 'https://api.github.com'
const cache = new Map()

function fetchJson(path) {
  if (!cache.has(path)) {
    const request = fetch(`${API}${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`)
        return res.json()
      })
      .catch((error) => {
        cache.delete(path)
        throw error
      })
    cache.set(path, request)
  }
  return cache.get(path)
}

function useGitHubResource(path) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    let active = true
    fetchJson(path)
      .then((data) => {
        if (active) setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (active) setState({ data: null, loading: false, error })
      })
    return () => {
      active = false
    }
  }, [path])

  return state
}

export function useGitHubRepos() {
  const state = useGitHubResource(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
  const data = Array.isArray(state.data) ? state.data : null
  return { ...state, data }
}

export function useGitHubEvents() {
  const state = useGitHubResource(`/users/${GITHUB_USERNAME}/events/public?per_page=100`)
  const data = Array.isArray(state.data) ? state.data : null
  return { ...state, data }
}

export function formatRelative(dateInput, lang) {
  const date = new Date(dateInput)
  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000)
  const units = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
  ]
  const formatter = new Intl.RelativeTimeFormat(lang === 'pt' ? 'pt-BR' : 'en', { numeric: 'auto' })
  for (const [unit, seconds] of units) {
    if (Math.abs(diffSeconds) >= seconds) {
      return formatter.format(Math.round(diffSeconds / seconds), unit)
    }
  }
  return formatter.format(0, 'minute')
}
