import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PlantList from './components/PlantList';
import PlantDetail from './components/PlantDetail';
import logo from './assets/lgogo.jpg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<PlantList />} />
              <Route path="/rastlina/:id" element={<PlantDetail />} />
              <Route path="/o-projekte" element={
                <div className="about-page">
                  <div className="about-hero" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '2rem', 
                    marginBottom: '3rem',
                    flexWrap: 'wrap'
                  }}>
                    <img src={logo} alt="Projekt Logo" style={{ 
                      width: '180px', 
                      height: '180px', 
                      borderRadius: 'var(--rounded-2xl)',
                      boxShadow: 'var(--shadow-lg)',
                      objectFit: 'cover'
                    }} />
                    <div style={{ flex: '1', minWidth: '300px' }}>
                      <h1 className="headline-lg text-primary">Digitálny herbár</h1>
                      <p className="body-lg mt-4" style={{ lineHeight: '1.6' }}>
                        Vitajte v našom interaktívnom botanickom sprievodcovi. Tento projekt vznikol ako súčasť predmetu Biológia pod vedením pani učiteľky Hrubej. Naším cieľom bolo vytvoriť modernú platformu na spoznávanie rastlín, ktorá kombinuje odborné informácie s vysokokvalitným vizuálnym obsahom.
                      </p>
                    </div>
                  </div>

                  <div className="about-content grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="card p-6" style={{ background: 'var(--surface-container-low)', borderRadius: 'var(--rounded-xl)' }}>
                      <h3 className="headline-sm text-primary mb-3">Naša vízia</h3>
                      <p className="body-md">
                        Chceme priblížiť krásu a rozmanitosť flóry každému študentovi. Digitálna forma nám umožňuje rýchlo vyhľadávať informácie a neustále dopĺňať nové poznatky o svete rastlín.
                      </p>
                    </div>
                    <div className="card p-6" style={{ background: 'var(--surface-container-low)', borderRadius: 'var(--rounded-xl)' }}>
                      <h3 className="headline-sm text-primary mb-3">Technológie</h3>
                      <p className="body-md">
                        Aplikácia je postavená na moderných webových technológiách ako React a Vite, čo zaručuje jej rýchlosť a responzivitu na všetkých zariadeniach, od mobilov až po počítače.
                      </p>
                    </div>
                  </div>
                  
                  <div className="sources-section mt-8">
                    <h2 className="headline-sm text-primary">Zdroje obrázkov</h2>
                    <p className="body-md mb-4">Všetky obrázky použité v tejto aplikácii sú prevzaté z Wikimedia Commons:</p>
                    <ul className="sources-list" style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--on-surface-variant)',
                      maxHeight: '400px',
                      overflowY: 'auto',
                      padding: '1rem',
                      background: 'var(--surface-container-low)',
                      borderRadius: 'var(--rounded-lg)'
                    }}>
                      <li>1. Magnolia grandiflora: <a href="https://upload.wikimedia.org/wikipedia/commons/2/21/Magnolia_grandiflora%2C_by_Mary_Vaux_Walcott.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>2. Liriodendron tulipifera: <a href="https://upload.wikimedia.org/wikipedia/commons/f/fe/Liriodendron_tulipifera_Fall.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>3. Magnolia stellata: <a href="https://upload.wikimedia.org/wikipedia/commons/8/8c/Star_magnolia_8854.JPG" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>4. Magnolia kobus: <a href="https://upload.wikimedia.org/wikipedia/commons/7/75/Magnolia_kobus_borealis0.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>5. Magnolia liliiflora: <a href="https://upload.wikimedia.org/wikipedia/commons/d/d5/Mulan_2.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>6. Anemone nemorosa: <a href="https://upload.wikimedia.org/wikipedia/commons/8/81/Windflower.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>7. Pulsatilla pratensis: <a href="https://upload.wikimedia.org/wikipedia/commons/f/f1/Pulsatilla_pratensis.jpeg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>8. Aconitum napellus: <a href="https://upload.wikimedia.org/wikipedia/commons/5/5c/Aconit.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>9. Ranunculus acris: <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Meadow_%28Ranunculus%29.jpg/960px-Meadow_%28Ranunculus%29.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>10. Caltha palustris: <a href="https://upload.wikimedia.org/wikipedia/commons/f/f0/Sumpfdotterblume-2.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>11. Papaver somniferum: <a href="https://upload.wikimedia.org/wikipedia/commons/7/77/Crowning_P_Somniferum_topview.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>12. Papaver rhoeas: <a href="https://upload.wikimedia.org/wikipedia/commons/2/21/Andal%C3%BAziapipacs.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>13. Chelidonium majus: <a href="https://upload.wikimedia.org/wikipedia/commons/5/54/Vla%C5%A1tovi%C4%8Dn%C3%ADk.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>14. Fumaria officinalis: <a href="https://upload.wikimedia.org/wikipedia/commons/2/2c/Fumaria_officinalis_jordr%C3%B6k.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>15. Lamprocapnos spectabilis: <a href="https://upload.wikimedia.org/wikipedia/commons/9/99/2006-04-26Dicentra_spectabilis01.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>16. Nymphaea alba: <a href="https://upload.wikimedia.org/wikipedia/commons/9/92/Nymphaea_alba_close_up.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>17. Nuphar lutea: <a href="https://upload.wikimedia.org/wikipedia/commons/c/cd/Nuphar_lutea.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>18. Nymphaea candida: <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Nymphaea_alba_250607.jpg/960px-Nymphaea_alba_250607.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>19. Victoria amazonica: <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Vitoria_regia.jpg/960px-Vitoria_regia.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>20. Euryale ferox: <a href="https://upload.wikimedia.org/wikipedia/commons/2/2a/Euryale_ferox.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>21. Fagus sylvatica: <a href="https://upload.wikimedia.org/wikipedia/commons/7/7c/B%C3%B8keskog2.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>22. Quercus robur: <a href="https://upload.wikimedia.org/wikipedia/commons/9/91/DikkeboomLaren.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>23. Castanea sativa: <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/2006-07-20_10-14-43_Switzerland_Graubunden_Castasegna.jpg/960px-2006-07-20_10-14-43_Switzerland_Graubunden_Castasegna.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>24. Quercus cerris: <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Quercus_cerris_Lovech%2C_Bulgaria_1.jpg/960px-Quercus_cerris_Lovech%2C_Bulgaria_1.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>25. Quercus petraea: <a href="https://upload.wikimedia.org/wikipedia/commons/a/a4/Altersvergleich.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>26. Betula pendula: <a href="https://upload.wikimedia.org/wikipedia/commons/e/e3/Betula_aetnensis.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>27. Alnus glutinosa: <a href="https://upload.wikimedia.org/wikipedia/commons/d/de/Erlensterben.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>28. Betula nana: <a href="https://upload.wikimedia.org/wikipedia/commons/6/61/Betula_nana0.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>29. Alnus incana: <a href="https://upload.wikimedia.org/wikipedia/commons/4/40/Leppa_kukkii.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>30. Betula pubescens: <a href="https://upload.wikimedia.org/wikipedia/commons/0/06/1911_Britannica-Birch-Betula_alba.png" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>31. Corylus avellana: <a href="https://upload.wikimedia.org/wikipedia/commons/8/8d/Corylus_avellana_lindman_3.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>32. Carpinus betulus: <a href="https://upload.wikimedia.org/wikipedia/commons/4/40/Carpinus-betulus-Ekkodalen.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>33. Corylus colurna: <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Corylus_colurna0.jpg/960px-Corylus_colurna0.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>34. Carpinus orientalis: <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Carpinus_orientalis_foliage_Bulgaria_1.jpg/960px-Carpinus_orientalis_foliage_Bulgaria_1.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>35. Ostrya carpinifolia: <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Ostrya_carpinifolia_JPG1a.jpg/960px-Ostrya_carpinifolia_JPG1a.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>36. Tilia cordata: <a href="https://upload.wikimedia.org/wikipedia/commons/1/1d/Tassilo-Linde.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>37. Tilia platyphyllos: <a href="https://upload.wikimedia.org/wikipedia/commons/1/1d/Sommerlinde.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>38. Tilia tomentosa: <a href="https://upload.wikimedia.org/wikipedia/commons/f/f9/Tilia_tomentosa12.JPEG" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>39. Tilia euchlora: <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tilia_euchlora1.JPG/960px-Tilia_euchlora1.JPG" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                      <li>40. Tilia americana: <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Tilia_americana_NRCS-1.jpg/960px-Tilia_americana_NRCS-1.jpg" target="_blank" rel="noopener noreferrer">Odkaz</a></li>
                    </ul>
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
