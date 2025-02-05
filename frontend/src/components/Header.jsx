import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Wallet, LayoutDashboard, LogIn } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLoginPage = location.pathname === '/';

  return (
    <div
      className={`sticky-top bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center`}
      style={{
        boxShadow: scrolled ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.3s ease',
        zIndex: 1000
      }}
    >
      <div className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginRight: '12px'
        }}>
          <Wallet size={22} color="white" />
        </div>
        <h2 className="m-0 fw-bold" style={{ fontSize: '1.35rem' }}>
          <span style={{ color: '#6366f1' }}>Expense</span>
          <span style={{ color: '#0f172a' }}>Pro</span>
        </h2>
      </div>

      <div className="d-none d-md-flex gap-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="btn btn-sm btn-outline-primary rounded-pill px-3 d-flex align-items-center gap-1"
        >
          <LayoutDashboard size={16} /> Dashboard
        </button>
        {!isLoginPage && (
          <button
            onClick={() => navigate('/')}
            className="btn btn-sm btn-primary rounded-pill px-3 d-flex align-items-center gap-1"
          >
            <LogIn size={16} /> Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
