import React, { useState } from 'react';
import './Profile.css';

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'teacher'
  });

  const [errors, setErrors] = useState({});

  // ============================================================================
  // LOGIN HANDLER
  // ============================================================================

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginData.email) newErrors.email = 'Email is required';
    if (!loginData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate login
    setIsLoggedIn(true);
    setUserEmail(loginData.email);
    setUserName(loginData.email.split('@'));
    setShowLoginForm(false);
    setLoginData({ email: '', password: '' });
    setErrors({});
  };

  // ============================================================================
  // REGISTER HANDLER
  // ============================================================================

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!registerData.name) newErrors.name = 'Name is required';
    if (!registerData.email) newErrors.email = 'Email is required';
    if (!registerData.password) newErrors.password = 'Password is required';
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate registration
    setIsLoggedIn(true);
    setUserEmail(registerData.email);
    setUserName(registerData.name);
    setShowRegisterForm(false);
    setRegisterData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'teacher'
    });
    setErrors({});
  };

  // ============================================================================
  // LOGOUT HANDLER
  // ============================================================================

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserName('');
    setLoginData({ email: '', password: '' });
    setRegisterData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'teacher'
    });
    setErrors({});
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="profile-container">
      {isLoggedIn ? (
        // LOGGED IN VIEW
        <div className="profile-logged-in">
          <div className="profile-info">
            <div className="profile-avatar">👤</div>
            <div className="profile-details">
              <p className="profile-name">{userName}</p>
              <p className="profile-email">{userEmail}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        // NOT LOGGED IN VIEW
        <div className="profile-not-logged-in">
          <button
            className="auth-btn login-btn"
            onClick={() => {
              setShowLoginForm(true);
              setShowRegisterForm(false);
            }}
          >
            Login
          </button>
          <button
            className="auth-btn register-btn"
            onClick={() => {
              setShowRegisterForm(true);
              setShowLoginForm(false);
            }}
          >
            Register
          </button>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLoginForm && (
        <div className="modal-overlay" onClick={() => setShowLoginForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Login</h2>
              <button
                className="close-btn"
                onClick={() => setShowLoginForm(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'input-error' : ''}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <button type="submit" className="submit-btn">
                Login
              </button>
            </form>

            <p className="form-footer">
              Don't have an account?{' '}
              <button
                className="link-btn"
                onClick={() => {
                  setShowLoginForm(false);
                  setShowRegisterForm(true);
                }}
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {showRegisterForm && (
        <div className="modal-overlay" onClick={() => setShowRegisterForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Register</h2>
              <button
                className="close-btn"
                onClick={() => setShowRegisterForm(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={registerData.role}
                  onChange={handleRegisterChange}
                >
                  <option value="teacher">Teacher</option>
                  <option value="administrator">Administrator</option>
                </select>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'input-error' : ''}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? 'input-error' : ''}
                />
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>

              <button type="submit" className="submit-btn">
                Register
              </button>
            </form>

            <p className="form-footer">
              Already have an account?{' '}
              <button
                className="link-btn"
                onClick={() => {
                  setShowRegisterForm(false);
                  setShowLoginForm(true);
                }}
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}