import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../firebase';
import './AdminLogin.css';

const ADMIN_EMAILS = ['admin@klfitness.com', 'kyrie@klfitness.com'];

function AdminLogin({ onClose, onAdminSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    try {
      const auth = getAuth(app);
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const loggedEmail = credential.user?.email?.toLowerCase();

      if (!ADMIN_EMAILS.includes(loggedEmail)) {
        await signOut(auth);
        setError('Unauthorized admin account.');
        return;
      }

      alert(`Admin logged in as ${email}!`);
      setEmail('');
      setPassword('');
      onClose();
      onAdminSuccess?.();
    } catch (error) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-modal">
        <button className="admin-login-close" type="button" onClick={onClose}>×</button>
        
        <div className="login-card">
          <div className="login-right">
            <div className="login-inner">
              <div className="login-header">
                <div className="login-brand">KL FITNESS</div>
                <div className="login-title">Log in to Admin Account</div>
                <div className="login-subtitle">Enter your email and password</div>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                {error && <div className="login-error">{error}</div>}

                <div className="login-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@gmail.com"
                    className="login-input"
                  />
                </div>

                <div className="login-form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="login-input"
                  />
                </div>

                <div className="login-forgot">
                  <a href="#" className="login-small-link">
                    Forgot Password?
                  </a>
                </div>

                <button className="login-cta" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>

          <div className="login-left">
            <h1>Welcome Back Admin!</h1>
            <p>You can login to access with your existing account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
