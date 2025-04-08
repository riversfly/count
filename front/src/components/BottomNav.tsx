import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bottom-nav">
            <div
                className={`nav-item ${isActive('/') ? 'active' : ''}`}
                onClick={() => navigate('/')}
            >
                <span className="nav-icon">📊</span>
                <span className="nav-text">月账单</span>
            </div>
            <div
                className={`nav-item ${isActive('/accounting') ? 'active' : ''}`}
                onClick={() => navigate('/accounting')}
            >
                <span className="nav-icon">📝</span>
                <span className="nav-text">记账</span>
            </div>
        </nav>
    );
};

export default BottomNav;