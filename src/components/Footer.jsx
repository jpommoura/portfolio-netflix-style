import { useLanguage } from '../i18n/context.js'
import './Footer.css'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} João Pedro — {t.footer.rights}</p>
      <p className="footer-sub">{t.footer.builtWith}</p>
    </footer>
  )
}

export default Footer
