import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { UsersLoginRequest, ResultVo, User } from '../types/users';
import './Auth.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<UsersLoginRequest>({
        username: '',
        password: ''
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await loginUser(formData) as ResultVo<User>;

            if (response.success === 1) {
                // 登录成功，保存用户信息到本地存储
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/');
            } else {
                // 登录失败，显示错误信息
                setError(response.message || '登录失败，请检查用户名和密码');
            }
        } catch (err) {
            setError('登录过程中发生错误，请稍后再试');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                <h2>登录</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">用户名</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="请输入用户名"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">密码</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="请输入密码"
                        />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? '登录中...' : '登录'}
                    </button>
                </form>
                <p className="auth-redirect">
                    还没有账号？ <span onClick={() => navigate('/register')}>立即注册</span>
                </p>
            </div>
        </div>
    );
};

export default Login;