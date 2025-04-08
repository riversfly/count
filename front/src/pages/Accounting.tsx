import React from 'react';
import { User } from '../types/users';
import BillForm from '../components/BillForm';
import BottomNav from '../components/BottomNav';
import './Accounting.css';

const Accounting: React.FC = () => {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        // 从本地存储获取用户信息
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse user data:', error);
            }
        }
    }, []);

    const handleBillAdded = () => {
        // 可以添加一些成功提示或其他逻辑
    };

    if (!user) {
        return <div className="loading">加载中...</div>;
    }

    return (
        <div className="accounting-container">
            <div className="accounting-header">
                <h1>添加账单</h1>
            </div>

            <div className="accounting-content">
                {/* 添加新账单表单 */}
                <BillForm user={user} onBillAdded={handleBillAdded} />
            </div>

            {/* 底部导航栏 */}
            <BottomNav />
        </div>
    );
};

export default Accounting;