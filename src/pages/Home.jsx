import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Projects from '../components/Projects.jsx'
import Experiences from '../components/Experiences.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <Projects />
      <Experiences />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
