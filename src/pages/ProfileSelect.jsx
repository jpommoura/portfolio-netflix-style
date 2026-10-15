import { useNavigate } from 'react-router-dom'
import profilePhoto from '../assets/profile-photo.png'
import LanguageToggle from '../components/LanguageToggle.jsx'
import { useLanguage } from '../i18n/context.js'
import './ProfileSelect.css'

function ProfileSelect() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <div className="profile-select">
      <div className="profile-lang">
        <LanguageToggle />
      </div>
      <h1 className="profile-logo">PORTFOLIO</h1>
      <h2 className="profile-title">{t.profile.title}</h2>
      <div className="profile-list">
        <div className="profile-card" onClick={() => navigate('/browse')}>
          <div className="profile-avatar">
            <img src={profilePhoto} alt="João Pedro" />
          </div>
          <span className="profile-name">João Pedro</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileSelect
