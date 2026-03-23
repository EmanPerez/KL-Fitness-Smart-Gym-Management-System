import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from './firebase';
import './index.css';
import LandingPage from './components/LandingPage';
import MobileApp      from './components/mobile/MobileApp';
import AdminDashboard from './components/admin/AdminDashboard';

export default function App() {
  const [view, setView] = useState('landing');
  const [auth, setAuth] = useState({ member: false, admin: false });

  const handleMemberLogin = () => {
    setAuth((prev) => ({ ...prev, member: true }));
    setView('mobile');
  };

  const handleAdminLogin = () => {
    setAuth((prev) => ({ ...prev, admin: true }));
    setView('admin');
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
    } catch {
      // ignore
    }
    setAuth({ member: false, admin: false });
    setView('landing');
  };

  useEffect(() => {
    if (view === 'mobile' && !auth.member) setView('landing');
    if (view === 'admin' && !auth.admin) setView('landing');
  }, [view, auth]);

  return (
    <>
      {view === 'landing' && (
        <LandingPage onLoginSuccess={handleMemberLogin} onAdminLoginSuccess={handleAdminLogin} />
      )}
      {view === 'mobile' && auth.member && <MobileApp onLogout={handleLogout} />}
      {view === 'admin' && auth.admin && <AdminDashboard onLogout={handleLogout} />}
    </>
  );
}