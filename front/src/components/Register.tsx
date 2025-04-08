import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { UsersRegisterRequest, ResultVo } from '../types/users';
import './Auth.css';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<UsersRegisterRequest>({
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

        // 简单的表单验证
        if (formData.password.length < 6) {
            setError('密码长度必须至少为6个字符');
            setLoading(false);
            return;
        }

        try {
            const response = await registerUser(formData) as ResultVo<void>;

            if (response.success === 1) {
                // 注册成功，跳转到登录页面
                alert('注册成功！请登录');
                navigate('/login');
            } else {
                // 注册失败，显示错误信息
                setError(response.message || '注册失败，请稍后再试');
            }
        } catch (err) {
            setError('注册过程中发生错误，请稍后再试');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                <h2>注册</h2>
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
                            placeholder="请输入密码（至少6个字符）"
                        />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? '注册中...' : '注册'}
                    </button>
                </form>
                <p className="auth-redirect">
                    已有账号？ <span onClick={() => navigate('/login')}>立即登录</span>
                </p>
            </div>
        </div>
    );
};

export default Register;