'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { api } from '@/services/api';
import { LogOut, Database } from 'lucide-react';
import Loader from '@/components/common/Loader';
import './Admin.css';

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('campus_representative_applications');
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        checkUser();
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                checkAdminStatus(session.user);
            } else {
                setIsAdmin(false);
                setLoading(false);
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            await checkAdminStatus(session.user);
        } else {
            setLoading(false);
        }
    };

    const checkAdminStatus = async (currentUser: any) => {
        try {
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('is_admin')
                .eq('id', currentUser.id)
                .single();

            if (profileError) throw profileError;

            if (profile?.is_admin) {
                setIsAdmin(true);
            } else {
                await supabase.auth.signOut();
                setError('Access denied. You do not have admin privileges.');
            }
        } catch (err) {
            console.error('Error checking admin status:', err);
            setError('Could not verify admin status.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (authError) throw authError;
        } catch (err: any) {
            setError(err.message);
            setLoginLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const fetchData = async (tableName: string) => {
        try {
            let records: any = [];
            if (tableName === 'campus_representative_applications') {
                records = await api.campusReps.getAll();
            } else if (tableName === 'verified_creator_applications') {
                records = await api.creators.getAll();
            } else if (tableName === 'feature_suggestions') {
                records = await api.suggestions.getAll();
            } else if (tableName === 'support_tickets') {
                records = await api.support.getAll();
            }

            if (records.error) throw new Error(records.error);
            setData(records || []);
        } catch (err) {
            console.error(`Error fetching ${tableName}:`, err);
        }
    };

    useEffect(() => {
        if (isAdmin) {
            fetchData(activeTab);
        }
    }, [isAdmin, activeTab]);

    const tabs = [
        { id: 'campus_representative_applications', label: 'Campus Reps' },
        { id: 'verified_creator_applications', label: 'Verified Creators' },
        { id: 'feature_suggestions', label: 'Feature Ideas' },
        { id: 'support_tickets', label: 'Support Tickets' }
    ];

    if (loading) {
        return (
            <div className="admin-page">
                <div className="empty-state" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Loader size="medium" />
                    <span>Verifying session...</span>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="admin-page">
                <div className="admin-login">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', color: 'var(--accent)' }}>
                        <Database size={40} />
                    </div>
                    <h2>Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="field">
                            <label>Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@studiva.com" required />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                        </div>
                        {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
                        <button type="submit" disabled={loginLoading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            {loginLoading ? <Loader size="small" /> : 'Access Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-container">
                <header className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={16} /> Logout
                    </button>
                </header>

                <nav className="admin-nav">
                    {tabs.map(tab => (
                        <button key={tab.id} className={`admin-nav-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="admin-table-wrapper">
                    {data.length === 0 ? (
                        <div className="empty-state">No records found in this category.</div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    {Object.keys(data[0]).map(key => (
                                        <th key={key}>{key.replace(/_/g, ' ').toUpperCase()}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i}>
                                        {Object.values(row).map((val: any, j) => (
                                            <td key={j}>
                                                {typeof val === 'boolean' ? (val ? 'Yes' : 'No') : 
                                                 (j === Object.keys(row).indexOf('status') ? <span className={`status-badge ${val}`}>{val}</span> : 
                                                 (j === Object.keys(row).indexOf('created_at') ? new Date(val).toLocaleDateString() : String(val)))}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
