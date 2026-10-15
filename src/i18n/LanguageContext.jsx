import { useCallback, useEffect, useMemo, useState } from 'react'
import { translations } from './translations.js'
import { LanguageContext } from './context.js'

const STORAGE_KEY = 'portfolio-lang'
const SUPPORTED = ['pt', 'en']

function getInitialLang() {
  let saved = null
  try {
    saved = localStorage.getItem(STORAGE_KEY)
  } catch {
    saved = null
  }
  if (SUPPORTED.includes(saved)) return saved
  const browser = (navigator.language || 'pt').toLowerCase()
  return browser.startsWith('pt') ? 'pt' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      return
    }
  }, [lang])

  const setLang = useCallback((next) => {
    if (SUPPORTED.includes(next)) setLangState(next)
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((current) => (current === 'pt' ? 'en' : 'pt'))
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t: translations[lang] }),
    [lang, setLang, toggleLang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
