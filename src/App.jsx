import { Routes, Route } from 'react-router-dom'
import ProfileSelect from './pages/ProfileSelect.jsx'
import Home from './pages/Home.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProfileSelect />} />
      <Route path="/browse" element={<Home />} />
    </Routes>
  )
}

export default App
