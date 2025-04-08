import React, { useState, useEffect } from 'react';
import { BillSummary as BillSummaryType } from '../types/bills';
import { getMonthSummary } from '../services/billApi';
import { User } from '../types/users';
import './BillSummary.css';

interface BillSummaryProps {
    user: User;
    refreshTrigger?: number; // 用于触发刷新的属性
}

const BillSummary: React.FC<BillSummaryProps> = ({ user, refreshTrigger }) => {
    const [summary, setSummary] = useState<BillSummaryType>({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // 获取当前年月
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript月份从0开始

    // 添加年份和月份的状态
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

    // 获取月度统计数据
    useEffect(() => {
        const fetchSummary = async () => {
            if (!user || !user.id) return;

            setLoading(true);
            setError('');
            try {
                const response = await getMonthSummary(user.id, selectedYear, selectedMonth);

                if (response.success === 1) {
                    setSummary(response.data);
                } else {
                    setError(response.message || '获取月度统计失败');
                    console.error('获取月度统计失败:', response.message);
                }
            } catch (err) {
                setError('获取月度统计时发生错误');
                console.error('获取月度统计异常:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [user, user.id, selectedYear, selectedMonth, refreshTrigger]);

    // 处理月份变化
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(parseInt(e.target.value));
    };

    // 处理年份变化
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(e.target.value));
    };

    // 生成年份选项，前后5年
    const yearOptions = [];
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
        yearOptions.push(year);
    }

    if (loading) {
        return <div className="summary-loading">加载统计数据中...</div>;
    }

    if (error) {
        return <div className="summary-error">{error}</div>;
    }

    return (
        <div className="bill-summary-container">
            <div className="summary-header">
                <h3>月度财务概览</h3>
                <div className="date-selector">
                    <select value={selectedYear} onChange={handleYearChange}>
                        {yearOptions.map(year => (
                            <option key={year} value={year}>{year}年</option>
                        ))}
                    </select>
                    <select value={selectedMonth} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>{month}月</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="summary-cards">
                <div className="summary-card income">
                    <div className="card-title">总收入</div>
                    <div className="card-amount">¥{summary.totalIncome.toFixed(2)}</div>
                </div>
                <div className="summary-card expense">
                    <div className="card-title">总支出</div>
                    <div className="card-amount">¥{summary.totalExpense.toFixed(2)}</div>
                </div>
                <div className="summary-card balance">
                    <div className="card-title">本月结余</div>
                    <div className="card-amount">¥{summary.balance.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
};

export default BillSummary;