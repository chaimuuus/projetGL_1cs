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
import Artisandash from './artisandash';
import Devis from './Devis';
import DevisRecus from './DevisRecus';
import Devisrp from './Devisrp';
import UserDevis from './UserDevis';
import UserDevisRecus from './UserDevisRecus';
import UserDevisrp from './UserDevisrp';
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
        <Route path="/artisandash" element={<Artisandash />} />
        <Route path="/devis" element={<Devis />}>
          <Route index element={<DevisRecus />} />
          <Route path="devisrp" element={<Devisrp />} />
          
        </Route>
        <Route path="/userdevis" element={<UserDevis />}>
          <Route index element={<UserDevisRecus />} />
          <Route path="userdevisrp" element={<UserDevisrp />} />
          
        </Route>
      </Routes>
    </>
  )
}

export default App
