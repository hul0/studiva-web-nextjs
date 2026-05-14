'use client';

import { useRef } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Download,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './NotesManager.css';

export default function NotesManagerPage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.notes-table tr', {
      x: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out'
    });
  }, { scope: containerRef });

  const notes = [
    { id: 1, title: 'JEE Advanced Physics - Mechanics', category: 'Entrance', status: 'Live', views: '2.4K', downloads: '840', price: '₹150' },
    { id: 2, title: 'Organic Chemistry - Carbonyls', category: 'NEET', status: 'Pending', views: '0', downloads: '0', price: '₹120' },
    { id: 3, title: 'Modern History - 1857 Revolt', category: 'UPSC', status: 'Live', views: '5.1K', downloads: '1.2K', price: 'Free' },
    { id: 4, title: 'Microeconomics - Game Theory', category: 'B.Com', status: 'Live', views: '1.1K', downloads: '320', price: '₹80' },
    { id: 5, title: 'Calculus - Integration Tricks', category: 'CBSE 12', status: 'Rejected', views: '0', downloads: '0', price: '₹50' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Live': return <CheckCircle2 size={14} className="status-icon live" />;
      case 'Pending': return <Clock size={14} className="status-icon pending" />;
      case 'Rejected': return <AlertCircle size={14} className="status-icon rejected" />;
      default: return null;
    }
  };

  return (
    <div className="notes-manager" ref={containerRef}>
      <div className="manager-actions dashboard-card">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search your notes..." />
        </div>
        <div className="filter-group">
          <button className="icon-btn-small"><Filter size={18} /></button>
          <select className="category-select">
            <option>All Categories</option>
            <option>Entrance</option>
            <option>Academic</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper dashboard-card">
        <table className="notes-table">
          <thead>
            <tr>
              <th>Note Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Views</th>
              <th>Downloads</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>
                  <div className="note-name">
                    <div className="note-icon">N</div>
                    <span>{note.title}</span>
                  </div>
                </td>
                <td><span className="category-badge">{note.category}</span></td>
                <td>
                  <div className={`status-pill ${note.status.toLowerCase()}`}>
                    {getStatusIcon(note.status)}
                    {note.status}
                  </div>
                </td>
                <td className="stat-cell"><Eye size={14} /> {note.views}</td>
                <td className="stat-cell"><Download size={14} /> {note.downloads}</td>
                <td><span className="price-tag">{note.price}</span></td>
                <td>
                  <button className="action-btn">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
