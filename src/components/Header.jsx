import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/lgogo.jpg';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <NavLink to="/" className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          Katkine kvietky
        </NavLink>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Zbierka
          </NavLink>
          <NavLink to="/o-projekte" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            O projekte
          </NavLink>
        </nav>
        <button className="menu-btn md-hidden">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
