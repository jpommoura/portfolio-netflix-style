import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import {
  FaEnvelope,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa'
import './Contact.css'

// Configure suas credenciais do EmailJS aqui:
// 1. Crie uma conta em https://www.emailjs.com/
// 2. Adicione um serviço de e-mail (Gmail, Outlook, etc.)
// 3. Crie um template com variáveis: {{from_name}}, {{from_email}}, {{message}}
// 4. Substitua os valores abaixo pelos seus
const EMAILJS_SERVICE_ID = 'service_4dip0ks'
const EMAILJS_TEMPLATE_ID = 'template_krb8ibn'
const EMAILJS_PUBLIC_KEY = '6Vt4NNomunXJpRUmi'

function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus('sent')
        setForm({ from_name: '', from_email: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      })
      .catch((error) => {
        console.error('EmailJS error:', error)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      })
  }

  const getButtonText = () => {
    switch (status) {
      case 'sending': return 'Enviando...'
      case 'sent': return '✓ Enviado com sucesso!'
      case 'error': return '✗ Erro ao enviar'
      default: return 'Enviar mensagem'
    }
  }

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Contato</h2>
      <div className="contact-wrapper">
        <div className="contact-icons">
          <a href="mailto:jpommoura@gmail.com" className="contact-icon-link" title="E-mail">
            <FaEnvelope />
            <span>jpommoura@gmail.com</span>
          </a>
          <a
            href="https://wa.me/5531992505677"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon-link"
            title="WhatsApp"
          >
            <FaWhatsapp />
            <span>(31) 99250-5677</span>
          </a>
          <a
            href="https://www.linkedin.com/in/jo%C3%A3o-pedro-oliveira-monteiro-moura-a91800393"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon-link"
            title="LinkedIn"
          >
            <FaLinkedin />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/jpommoura"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon-link"
            title="GitHub"
          >
            <FaGithub />
            <span>jpommoura</span>
          </a>
        </div>

        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            name="from_name"
            placeholder="Seu nome"
            value={form.from_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="from_email"
            placeholder="Seu e-mail"
            value={form.from_email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Sua mensagem"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className={`contact-submit ${status === 'sent' ? 'contact-submit-success' : ''} ${status === 'error' ? 'contact-submit-error' : ''}`}
            disabled={status === 'sending'}
          >
            {getButtonText()}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
