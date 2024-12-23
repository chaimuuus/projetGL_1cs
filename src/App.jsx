import './App.css'
import DashBoard from './DashBoard';
import { Routes, Route } from 'react-router-dom';
import ArtisanProfile from './ArtisanProfile';
import Portfolio from './Portfolio';
import Certificate from './Certificate';
import Generale from './Generale';
import RqDevis from './RqDevis';
import RpDevis from './RpDevis';
import Facture from './Facture';
function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/artisanprofile" element={<ArtisanProfile />}>
          <Route index element={<Generale />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="certificate" element={<Certificate />} />
        </Route>
        <Route path="/rqdevis" element={<RqDevis />} />
        <Route path="/rpdevis" element={<RpDevis />} />
        <Route path="/facture" element={<Facture />} />
      </Routes>
    </>
  )
}

export default App
