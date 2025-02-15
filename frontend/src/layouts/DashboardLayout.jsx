import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import {
  Wallet, ChevronLeft, ChevronRight, LayoutDashboard, Users,
  Receipt, Banknote, BarChart3, LogOut, Menu, Bell, LogIn
} from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`dashboard-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="app-logo">
            <Wallet size={24} />
            <span className="logo-text">SplitPal</span>
          </h2>
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <div className="user-profile">
          <div className="avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="user-info">
            <h5>{user?.name || 'User'}</h5>
            <p>{user?.email || 'user@example.com'}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''}>
            <LayoutDashboard size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/dashboard/groups" className={({ isActive }) => isActive ? 'active' : ''}>
            <Users size={20} />
            <span>Groups</span>
          </NavLink>
          <NavLink to="/dashboard/expenses" className={({ isActive }) => isActive ? 'active' : ''}>
            <Receipt size={20} />
            <span>Expenses</span>
          </NavLink>
          <NavLink to="/dashboard/settlements" className={({ isActive }) => isActive ? 'active' : ''}>
            <Banknote size={20} />
            <span>Settlements</span>
          </NavLink>
          <NavLink to="/dashboard/reports" className={({ isActive }) => isActive ? 'active' : ''}>
            <BarChart3 size={20} />
            <span>Reports</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <Menu size={22} />
            </button>
            <h1>Dashboard</h1>
          </div>
          <div className="header-right">
            <div className="user-dropdown">
              <span>{user?.name || ''}</span>
              <button className="logout-small-btn" onClick={handleLogout}>
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>

        <footer className="dashboard-footer">
          <p>© 2025 SplitPal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
