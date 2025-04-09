import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/users';
import MonthlyFinance from './MonthlyFinance';
import BottomNav from './BottomNav';
import './Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        // 从本地存储获取用户信息
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse user data:', error);
                // 如果解析失败，重定向到登录页面
                navigate('/login');
            }
        } else {
            // 如果没有用户信息，重定向到登录页面
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        // 清除本地存储中的用户信息
        localStorage.removeItem('user');
        // 重定向到登录页面
        navigate('/login');
    };

    if (!user) {
        return <div className="loading">加载中...</div>;
    }

    return (
        <div className="home-container">
            <div className="home-header">
                <h1>AI智能记账簿 - {user.username}</h1>
                <button className="logout-button" onClick={handleLogout}>退出登录</button>
            </div>

            <div className="home-content">
                {/* 整合的月度财务概览和交易明细 */}
                <MonthlyFinance user={user} />
            </div>

            {/* 底部导航栏 */}
            <BottomNav />
        </div>
    );
};

export default Home;