import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} João Pedro — Portfólio Profissional</p>
      <p className="footer-sub">
        Desenvolvido com React + Vite
      </p>
    </footer>
  )
}

export default Footer
