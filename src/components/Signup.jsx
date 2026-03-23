import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { app } from "../Firebase";
import "./Signup.css";

function Signup({ onClose, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const auth = getAuth(app);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Validation
    if (!agree) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert(`Account created for ${userCredential.user.email}!`);

      // Reset form
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgree(false);
      setShowPassword(false);
      setShowConfirmPassword(false);

      onClose(); // Close modal
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal">
        <button className="signup-close" type="button" onClick={onClose}>
          ×
        </button>

        <div className="signup-card">
          <div className="signup-left">
            <h1>Welcome to KL FITNESS!</h1>
            <p>You can sign up to start your journey with KLF.</p>
          </div>

          <div className="signup-right">
            <div className="signup-inner">
              <div className="signup-header">
                <div className="signup-brand">KL FITNESS</div>
                <div className="signup-title">Create your account</div>
                <div className="signup-subtitle">
                  Enter your correct information below.
                </div>
              </div>

              <form className="signup-form" onSubmit={handleSubmit}>
                {error && <div className="signup-error">{error}</div>}

                <div className="signup-form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose your username"
                    className="signup-input"
                    required
                  />
                </div>

                <div className="signup-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@gmail.com"
                    className="signup-input"
                    required
                  />
                </div>

                <div className="signup-form-group">
                  <label>Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="signup-input"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>

                <div className="signup-form-group">
                  <label>Confirm Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="signup-input"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      title={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>

                <div className="signup-actions">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                  />
                  <label>
                    I agree to the{" "}
                    <span className="signup-link">
                      terms & condition
                    </span>
                  </label>
                </div>

                <button type="submit" className="signup-cta">
                  Create Account
                </button>
              </form>

              <div className="signup-footer">
                Already have an account?{" "}
                <button
                  type="button"
                  className="signup-link-btn"
                  onClick={onSwitchToLogin}
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;