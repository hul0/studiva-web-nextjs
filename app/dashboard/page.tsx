'use client';

import { useRef } from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  Download, 
  Eye 
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Overview.css';

const IndianRupee = ({ size }: { size: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" />
  </svg>
);

export default function DashboardOverviewPage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.stat-card', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });
    
    gsap.from('.chart-bar', {
      scaleY: 0,
      duration: 1,
      stagger: 0.05,
      ease: 'power2.out',
      transformOrigin: 'bottom'
    });
  }, { scope: containerRef });

  const stats = [
    { label: 'Total Earnings', value: '₹12,450', trend: '+12%', isPositive: true, icon: <TrendingUp size={20} /> },
    { label: 'Total Downloads', value: '1,240', trend: '+5%', isPositive: true, icon: <Download size={20} /> },
    { label: 'Note Views', value: '45.2K', trend: '-2%', isPositive: false, icon: <Eye size={20} /> },
    { label: 'Followers', value: '850', trend: '+18%', isPositive: true, icon: <Users size={20} /> },
  ];

  const chartData = [40, 70, 45, 90, 65, 80, 50, 85, 60, 95, 75, 100];

  return (
    <div className="overview-container" ref={containerRef}>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-card__top">
              <div className="stat-icon-wrapper">{stat.icon}</div>
              <div className={`stat-trend ${stat.isPositive ? 'pos' : 'neg'}`}>
                {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div className="stat-card__bottom">
              <span className="stat-label">{stat.label}</span>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-main-grid">
        <div className="chart-section dashboard-card">
          <div className="card-header">
            <h3>Earnings Analytics</h3>
            <select className="date-select">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="chart-wrapper">
             <div className="chart-bars">
                {chartData.map((val, i) => (
                  <div key={i} className="chart-bar-container">
                    <div className="chart-bar" style={{ height: `${val}%` }}>
                      <div className="bar-tooltip">₹{val * 10}</div>
                    </div>
                  </div>
                ))}
             </div>
             <div className="chart-labels">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
             </div>
          </div>
        </div>

        <div className="activity-section dashboard-card">
          <div className="card-header">
            <h3>Recent Sales</h3>
            <button className="text-btn">View All</button>
          </div>
          <div className="activity-list">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div className="activity-item" key={i}>
                <div className="activity-icon">
                  <IndianRupee size={16} />
                </div>
                <div className="activity-info">
                  <p className="activity-title">Chemistry Notes Vol 2</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
                <div className="activity-amount">+ ₹150</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
