'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  IndianRupee, 
  BarChart3, 
  Settings, 
  Bell, 
  PlusCircle,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './DashboardLayout.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
    { id: 'notes', label: 'Notes Manager', icon: <FileText size={20} />, href: '/dashboard/notes' },
    { id: 'earnings', label: 'Earnings', icon: <IndianRupee size={20} />, href: '/dashboard/earnings' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, href: '/dashboard/analytics' },
  ];

  const currentLabel = navItems.find(i => i.href === pathname)?.label || 'Dashboard';

  return (
    <div className="dashboard-root">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo">
            <div className="logo-icon">S</div>
            <span>STUDIVA</span>
          </Link>
          <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`nav-item ${pathname === item.href ? 'active' : ''}`}
            >
              {item.icon}
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link href="/dashboard/settings" className="nav-item">
            <Settings size={20} />
            <span className="nav-label">Settings</span>
          </Link>
          <div className="user-profile">
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-info">
              <span className="user-name">Creator Account</span>
              <span className="user-email">@studiva</span>
            </div>
            <button className="logout-btn">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>{currentLabel}</h1>
          </div>
          <div className="header-right">
            <button className="btn-upload">
              <PlusCircle size={18} />
              <span>Upload New Note</span>
            </button>
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}
