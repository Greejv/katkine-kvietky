import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PlantList from './components/PlantList';
import PlantDetail from './components/PlantDetail';
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
                  <h1 className="headline-lg text-primary">O projekte</h1>
                  <p className="body-lg mt-4">
                    Tento digitálny herbár je školský projekt zameraný na dokumentáciu 
                    krytosemenných rastlín. Cieľom je poskytnúť prehľadný a estetický 
                    spôsob štúdia botaniky.
                  </p>
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
