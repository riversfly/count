import React, { useState } from 'react';
import { CreateBillRequest } from '../types/bills';
import { createBill } from '../services/billApi';
import { User } from '../types/users';
import './BillForm.css';

interface BillFormProps {
    user: User;
    onBillAdded: () => void;
}

const BillForm: React.FC<BillFormProps> = ({ user, onBillAdded }) => {
    const [formData, setFormData] = useState<CreateBillRequest>({
        type: 'pay',
        money: 0,
        date: new Date().toISOString().split('T')[0], // 默认为今天
        note: '',
        use_for: ''
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    // 预定义的支出分类
    const expenseCategories = ['餐饮', '交通', '购物', '娱乐', '居家', '医疗', '教育', '其他'];
    // 预定义的收入分类
    const incomeCategories = ['工资', '奖金', '投资', '兼职', '礼金', '其他'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'money' ? parseFloat(value) || 0 : value
        }));
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value as 'pay' | 'income';
        setFormData(prev => ({
            ...prev,
            type,
            use_for: '' // 重置分类
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // 验证金额
        if (formData.money <= 0) {
            setError('金额必须大于0');
            setLoading(false);
            return;
        }

        try {
            const response = await createBill(user.id, formData);
            if (response.success === 1) {
                // 重置表单
                setFormData({
                    type: 'pay',
                    money: 0,
                    date: new Date().toISOString().split('T')[0],
                    note: '',
                    use_for: ''
                });
                // 显示成功提示
                setShowSuccess(true);
                // 3秒后自动关闭
                setTimeout(() => setShowSuccess(false), 3000);
                // 通知父组件刷新账单列表
                onBillAdded();
            } else {
                setError(response.message || '添加账单失败');
            }
        } catch (err) {
            setError('添加账单时发生错误');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bill-form-container">
            <h3>添加新账单</h3>
            {error && <div className="bill-form-error"><span>⚠️</span> {error}</div>}
            {showSuccess && <div className="bill-form-success"><span>✅</span> 账单添加成功！</div>}
            <form onSubmit={handleSubmit} className="bill-form">
                <div className="form-group">
                    <label htmlFor="type">账单类型</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleTypeChange}
                        required
                        className={formData.type === 'income' ? 'income-type' : 'expense-type'}
                    >
                        <option value="pay">支出</option>
                        <option value="income">收入</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="use_for">分类</label>
                    <select
                        id="use_for"
                        name="use_for"
                        value={formData.use_for}
                        onChange={handleChange}
                        required
                    >
                        <option value="">请选择分类</option>
                        {formData.type === 'pay'
                            ? expenseCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))
                            : incomeCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="form-group money-group">
                    <label htmlFor="money">金额</label>
                    <div className="money-input-wrapper">
                        <span className="currency-symbol">¥</span>
                        <input
                            type="number"
                            id="money"
                            name="money"
                            value={formData.money || ''}
                            onChange={handleChange}
                            step="0.01"
                            min="0.01"
                            required
                            placeholder="请输入金额"
                            className={formData.type === 'income' ? 'income-amount' : 'expense-amount'}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="date">日期</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="note">备注</label>
                    <textarea
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        placeholder="添加备注（可选）"
                        rows={2}
                    />
                </div>

                <button type="submit" className="bill-submit-button" disabled={loading}>
                    {loading ? '添加中...' : '添加账单'}
                    {!loading && <span className="button-icon">+</span>}
                </button>
            </form>
        </div>
    );
};

export default BillForm;