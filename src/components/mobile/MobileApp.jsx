import { useEffect, useMemo, useState } from 'react';
import { C, T } from '../../theme';
import TrainersTab from './tabs/TrainersTab';
import ClassesTab from './tabs/ClassesTab';
import ReportTab from './tabs/ReportTab';
import './MobileApp.css';

const MENU = [
  {
    id: 'home',
    label: 'Home',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#F0C040' : '#777'}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: 'notification',
    label: 'Notification',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#F0C040' : '#777'}>
        <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6V9c0-3.07-1.63-5.64-4.5-6.32V2a1.5 1.5 0 0 0-3 0v.68C7.63 3.36 6 5.92 6 9v7l-2 2v1h16v-1l-2-2z" />
      </svg>
    ),
  },
  {
    id: 'trainers',
    label: 'Trainers',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#F0C040' : '#777'}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    id: 'classes',
    label: 'Classes',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#F0C040' : '#777'}>
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
      </svg>
    ),
  },
  {
    id: 'report',
    label: 'Report',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#F0C040' : '#777'}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#F0C040' : '#777'}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
];

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatDayLabel(date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getWeekDays(startOfWeek = 0) {
  const today = new Date();
  const dayIndex = today.getDay();
  const diff = dayIndex - startOfWeek;
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - diff);

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });
}

export default function MobileApp({ onLogout }) {
  const [active, setActive] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [now, setNow] = useState(new Date());
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Santos',
    email: 'alex@example.com',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  });

  const membership = {
    plan: '1MONTH MEMBERSHIP',
    name: 'Alex Santos',
    expires: new Date('2026-04-15'),
  };

  const daysLeft = Math.max(0, Math.ceil((membership.expires - now) / (1000 * 60 * 60 * 24)));

  useEffect(() => {
    const query = '(max-width: 700px)';
    const matcher = typeof window !== 'undefined' ? window.matchMedia(query) : null;

    const updateIsMobile = () => setIsMobile(matcher ? matcher.matches : false);
    updateIsMobile();
    if (matcher) {
      matcher.addEventListener?.('change', updateIsMobile);
    }

    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => {
      clearInterval(interval);
      if (matcher) matcher.removeEventListener?.('change', updateIsMobile);
    };
  }, []);

  const weekDays = useMemo(() => getWeekDays(0), [now]);
  const todayIndex = now.getDay();


  const Sidebar = () => (
    <div className="mobile-app-sidebar">
      <div>
        <div className="mobile-app-brand">KL FITNESS</div>
        <div className="mobile-app-menu">
          {MENU.map(({ id, label, icon }) => {
            const activeItem = id === active;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={`mobile-app-menu-btn ${activeItem ? 'active' : ''}`}
              >
                {icon(activeItem)}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowLogoutConfirm(true)}
        className="mobile-app-logout-btn"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#F0C040">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        Logout
      </button>
    </div>
  );

  const Dashboard = () => (
    <div className="mobile-app-dashboard">
      <div className="mobile-app-cards-row">
        <div className="mobile-app-card">
          <div className="mobile-app-card-header">
            <div>
              <div className="mobile-app-card-title">
                Good Morning, Alex! <span role="img" aria-label="wave">👋</span>
              </div>
              <div className="mobile-app-card-subtitle">{formatDayLabel(now)}</div>
            </div>
            <div className="mobile-app-card-time">
              <div className="mobile-app-card-time-large">{formatTime(now)}</div>
              <div className="mobile-app-card-time-small">Local Time</div>
            </div>
          </div>
          <div className="mobile-app-card-bg-blur" />
        </div>

        <div className="mobile-app-card">
          <div className="mobile-app-card-header">
            <div>
              <div className="mobile-app-membership-header">ACTIVE PLAN</div>
              <div className="mobile-app-membership-plan">{membership.plan}</div>
              <div className="mobile-app-membership-name">{membership.name}</div>
            </div>
            <div className="mobile-app-membership-info-right">
              <div className="mobile-app-membership-days">{daysLeft} days left</div>
              <div className="mobile-app-membership-expires">
                Expires on {membership.expires.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>

          <div className="mobile-app-progress-bar">
            <div
              className="mobile-app-progress-fill"
              style={{
                width: `${Math.max(0, Math.min(100, 100 - (daysLeft / 30) * 100))}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mobile-app-reminder">
        <strong>Reminder:</strong> Your membership plan expires on{' '}
        {membership.expires.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}. Renew now!
      </div>

      <div className="mobile-app-week-grid">
        {weekDays.map((day, index) => {
          const isToday = index === todayIndex;
          return (
            <div
              key={day.toDateString()}
              className={`mobile-app-day-card ${isToday ? 'today' : ''}`}
            >
              <div className="mobile-app-day-label">
                {day.toLocaleDateString(undefined, { weekday: 'short' })}
              </div>
              <div className="mobile-app-day-number">{day.getDate()}</div>
            </div>
          );
        })}
      </div>

      <div className="mobile-app-stats-grid">
        <div className="mobile-app-stat-card">
          <div className="mobile-app-stat-label">Session This Month</div>
          <div className="mobile-app-stat-value">12</div>
        </div>
        <div className="mobile-app-stat-card">
          <div className="mobile-app-stat-label">Upcoming Class</div>
          <div className="mobile-app-stat-value">3</div>
        </div>
      </div>
    </div>
  );

  const ProfilePanel = ({ profileData, setProfileData }) => {
    const [editedData, setEditedData] = useState(profileData);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [showPasswordFields, setShowPasswordFields] = useState({ current: false, new: false, confirm: false });

    useEffect(() => {
      setEditedData(profileData);
    }, [profileData]);

    const handleSaveProfile = () => {
      setProfileData(editedData);
      alert('Profile updated successfully!');
    };

    const handlePasswordChange = () => {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert('New passwords do not match!');
        return;
      }
      if (passwordData.newPassword.length < 6) {
        alert('Password must be at least 6 characters!');
        return;
      }
      alert('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    };

    return (
      <div className="mobile-app-profile-panel">
        <h1 className="mobile-app-profile-title">Profile Settings</h1>

        {/* Profile Picture Section */}
        <div className="mobile-app-profile-section mobile-app-profile-picture">
          <div className="mobile-app-profile-avatar">
            <img src={editedData.profileImage} alt="Profile" />
          </div>
          <input
            type="file"
            id="profile-pic-input"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setEditedData({ ...editedData, profileImage: event.target?.result || '' });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <button
            onClick={() => document.getElementById('profile-pic-input')?.click()}
            className="mobile-app-btn"
          >
            Change Picture
          </button>
        </div>

        {/* Profile Information Section */}
        <div className="mobile-app-profile-section">
          <h2 className="mobile-app-profile-section-title">Personal Information</h2>
          <div className="mobile-app-form-group">
            <label className="mobile-app-form-label">Full Name</label>
            <input
              type="text"
              value={editedData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              className="mobile-app-form-input"
            />
          </div>
          <div className="mobile-app-form-group">
            <label className="mobile-app-form-label">Email</label>
            <input
              type="email"
              value={editedData.email}
              onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
              className="mobile-app-form-input"
            />
          </div>
          <button onClick={handleSaveProfile} className="mobile-app-btn">
            Save Changes
          </button>
        </div>

        {/* Password Section */}
        <div className="mobile-app-profile-section">
          <h2 className="mobile-app-profile-section-title">Security</h2>
          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="mobile-app-btn mobile-app-btn-secondary"
            >
              Change Password
            </button>
          ) : (
            <div className="mobile-app-password-form">
              <div className="mobile-app-form-group">
                <label className="mobile-app-form-label">Current Password</label>
                <div className="mobile-app-password-wrapper">
                  <input
                    type={showPasswordFields.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="mobile-app-form-input mobile-app-form-input-with-toggle"
                  />
                  <button
                    onClick={() => setShowPasswordFields({ ...showPasswordFields, current: !showPasswordFields.current })}
                    className="mobile-app-password-toggle"
                  >
                    {showPasswordFields.current ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
              <div className="mobile-app-form-group">
                <label className="mobile-app-form-label">New Password</label>
                <div className="mobile-app-password-wrapper">
                  <input
                    type={showPasswordFields.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="mobile-app-form-input mobile-app-form-input-with-toggle"
                  />
                  <button
                    onClick={() => setShowPasswordFields({ ...showPasswordFields, new: !showPasswordFields.new })}
                    className="mobile-app-password-toggle"
                  >
                    {showPasswordFields.new ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
              <div className="mobile-app-form-group">
                <label className="mobile-app-form-label">Confirm Password</label>
                <div className="mobile-app-password-wrapper">
                  <input
                    type={showPasswordFields.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="mobile-app-form-input mobile-app-form-input-with-toggle"
                  />
                  <button
                    onClick={() => setShowPasswordFields({ ...showPasswordFields, confirm: !showPasswordFields.confirm })}
                    className="mobile-app-password-toggle"
                  >
                    {showPasswordFields.confirm ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
              <div className="mobile-app-btn-group">
                <button onClick={handlePasswordChange} className="mobile-app-btn">
                  Update Password
                </button>
                <button onClick={() => setShowPasswordForm(false)} className="mobile-app-btn mobile-app-btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const LogoutConfirmationModal = () => (
    <div className="mobile-app-modal-overlay">
      <div className="mobile-app-modal-content">
        <h2 className="mobile-app-modal-title">Confirm Logout</h2>
        <p className="mobile-app-modal-text">Are you sure you want to logout? You'll need to sign in again to access your account.</p>
        <div className="mobile-app-modal-actions">
          <button
            onClick={() => setShowLogoutConfirm(false)}
            className="mobile-app-modal-cancel"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowLogoutConfirm(false);
              onLogout?.();
              setActive('home');
            }}
            className="mobile-app-modal-confirm"
          >
            Continue to Logout
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (active === 'home') return <Dashboard />;
    if (active === 'trainers') return <TrainersTab />;
    if (active === 'classes') return <ClassesTab />;
    if (active === 'report') return <ReportTab />;
    if (active === 'profile') return <ProfilePanel profileData={profileData} setProfileData={setProfileData} />;
    if (active === 'notification') return <div className="mobile-app-notification-page">Notifications</div>;
    return <Dashboard />;
  };

  return (
    <div className="mobile-app-wrapper">
      <div className={`mobile-app-container ${isMobile ? 'mobile' : ''}`}>
        {/* Notch */}
        {!isMobile && (
          <div className="mobile-app-notch">
            <div className="mobile-app-notch-inner" />
          </div>
        )}
        {/* Screen */}
        <div className={`mobile-app-screen ${isMobile ? 'mobile' : ''}`}>
          <div className="mobile-app-content">
            {!isMobile && <Sidebar />}
            <div className="mobile-app-inner">
              {renderContent()}
            </div>
          </div>

          {isMobile && (
            <div className="mobile-app-bottom-menu">
              {MENU.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`mobile-app-bottom-menu-btn ${active === id ? 'active' : ''}`}
                >
                  {icon(active === id)}
                  <span className="mobile-app-bottom-menu-label">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {showLogoutConfirm && <LogoutConfirmationModal />}
    </div>
  );
}
