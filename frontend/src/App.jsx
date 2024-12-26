import './App.css'
import DashBoard from './DashBoard';
import { Routes, Route } from 'react-router-dom';
import ArtisanProfile from './ArtisanProfile';
function App() {
  return (
      <>
        <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/ArtisanProfile" element={<ArtisanProfile />} />
         </Routes>

      </>
      )
}

export default App
