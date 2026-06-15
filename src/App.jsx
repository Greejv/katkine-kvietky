import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PlantList from './components/PlantList';
import PlantDetail from './components/PlantDetail';
import About from './components/About';
import AmbientBackground from './components/AmbientBackground';
import ScrollManager from './components/ScrollManager';
import { FavoritesProvider } from './context/FavoritesContext';
import './App.css';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <AmbientBackground />
        <ScrollManager />
        <div className="app-container">
          <Header />
          <main className="main-content">
            <div className="container">
              <Routes>
                <Route path="/" element={<PlantList />} />
                <Route path="/rastlina/:id" element={<PlantDetail />} />
                <Route path="/o-projekte" element={<About />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
