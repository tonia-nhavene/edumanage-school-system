import React, { useState } from 'react';
import './navbar.css';
import Profile from '../Profile/Profile';

export default function NavbarDark({ activeModule, setActiveModule }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'records', label: 'Records' },
    { id: 'grades', label: 'Grades' },
    { id: 'attendance', label: 'Attendance' }
  ];

  const handleNavClick = (moduleId) => {
    setActiveModule(moduleId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar-dark ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-wrapper">

        {/* Logo Section */}
        <div className="navbar-logo-section">
          <h1 className="logo-title">EduManage</h1>
        </div>

          {/* Hamburger Menu */}
        <button
          className={`menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>


        {/* Navigation */}
        <div className= {`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${activeModule === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >

              <span className="btn-label">{item.label}</span>
            </button>
          ))}
        </div>

        {/* profile component */}
        <Profile/>
      </div>
    </nav>
  );
}