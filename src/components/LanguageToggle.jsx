import { useLanguage } from '../i18n/context.js'
import './LanguageToggle.css'

const OPTIONS = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
]

function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="lang-toggle" role="group" aria-label={t.language.label}>
      <span
        className="lang-toggle-thumb"
        style={{ transform: `translateX(${lang === 'pt' ? 0 : 100}%)` }}
        aria-hidden="true"
      />
      {OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          className={`lang-toggle-btn ${lang === option.code ? 'active' : ''}`}
          onClick={() => setLang(option.code)}
          aria-pressed={lang === option.code}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default LanguageToggle
