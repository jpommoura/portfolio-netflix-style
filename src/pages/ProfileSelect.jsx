import { useNavigate } from 'react-router-dom'
import profilePhoto from '../assets/profile-photo.png'
import './ProfileSelect.css'

function ProfileSelect() {
  const navigate = useNavigate()

  return (
    <div className="profile-select">
      <h1 className="profile-logo">PORTFOLIO</h1>
      <h2 className="profile-title">Quem está assistindo?</h2>
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
