import React, { useRef, useEffect } from 'react';
import './Analysis.css';
import BottomNav from '../components/BottomNav';
import { User } from '../types/users';
import { getUserBills } from '../services/billApi';
import * as echarts from 'echarts';
import { getAiAdvice } from '../services/aiAdviceApi';
import ReactMarkdown from 'react-markdown'

const Analysis: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = React.useState<User | null>(null);
    const [selectedYear, setSelectedYear] = React.useState<number>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = React.useState<number>(new Date().getMonth() + 1);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [bills, setBills] = React.useState<any[]>([]);
    const [totalIncome, setTotalIncome] = React.useState<number>(0);
    const [totalExpense, setTotalExpense] = React.useState<number>(0);
    const [charts, setCharts] = React.useState<echarts.ECharts[]>([]);
    const [aiAdvice, setAiAdvice] = React.useState<string>('');
    const [loadingAdvice, setLoadingAdvice] = React.useState<boolean>(false);

    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse user data:', error);
                setError('用户数据解析失败');
            }
        }
    }, []);


    const fetchBillData = async () => {
        if (!user) return;
        setLoading(true);
        setError('');
        try {
            // 构建日期范围
            const startDate = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-01`;
            const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();
            const endDate = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;

            const response = await getUserBills(user.id, {
                startDate,
                endDate,
            });

            if (response.success !== 1) {
                throw new Error(response.message || '获取账单数据失败');
            }

            const bills = response.data || [];


            const incomeBills = bills.filter((bill: any) => bill.type === 'income');
            const expenseBills = bills.filter((bill: any) => bill.type === 'pay');

            const income = incomeBills.reduce((sum: number, bill: any) => sum + Number(bill.money), 0);
            const expense = expenseBills.reduce((sum: number, bill: any) => sum + Number(bill.money), 0);

            // 按useFor字段分类统计
            const incomeByType = incomeBills.reduce((acc: { [key: string]: number }, bill: any) => {
                const type = bill.useFor || '其他';
                acc[type] = (acc[type] || 0) + Number(bill.money);
                return acc;
            }, {});

            const expenseByType = expenseBills.reduce((acc: { [key: string]: number }, bill: any) => {
                const type = bill.useFor || '其他';
                acc[type] = (acc[type] || 0) + Number(bill.money);
                return acc;
            }, {});

            // 确保至少有一些数据显示
            if (income === 0 && expense === 0) {
                setError('当前月份没有收支记录');
                return;
            }

            // 将账单数据保存到state中
            setBills(bills);
            setTotalIncome(income);
            setTotalExpense(expense);

            // 更新图表数据
            const incomeData = Object.entries(incomeByType).map(([name, value]) => ({ name, value }));
            const expenseData = Object.entries(expenseByType).map(([name, value]) => ({ name, value }));
        } catch (error) {
            console.error('获取账单数据失败:', error);
            setError('获取账单数据失败，请稍后重试');
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchBillData();
    }, [selectedYear, selectedMonth, user]);

    useEffect(() => {
        if (!chartRef.current || loading || (totalIncome === 0 && totalExpense === 0)) return;

        // 清除现有图表
        charts.forEach(chart => chart.dispose());

        // 创建容器
        const container = chartRef.current;
        container.style.display = 'flex';
        container.style.justifyContent = 'space-between';
        container.innerHTML = '';

        // 创建三个图表容器
        const chartContainers = Array.from({ length: 3 }, () => {
            const div = document.createElement('div');
            div.style.width = '30%';
            div.style.height = '300px';
            container.appendChild(div);
            return div;
        });

        // 初始化三个图表
        const newCharts = chartContainers.map(container => echarts.init(container));
        setCharts(newCharts);

        // 总收支占比图表
        const totalOption = {
            title: { text: '月度收支占比', left: 'center' },
            tooltip: { trigger: 'item' as const, formatter: '{b}: {c} ({d}%)' },
            legend: { orient: 'horizontal' as const, bottom: 0, data: ['收入', '支出'] },
            series: [{
                name: '收支情况',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: totalIncome, name: '收入', itemStyle: { color: '#52c41a' } },
                    { value: totalExpense, name: '支出', itemStyle: { color: '#ff4d4f' } }
                ]
            }]
        };

        // 收入类型占比图表
        const incomeOption = {
            title: { text: '收入类型占比', left: 'center' },
            tooltip: { trigger: 'item' as const, formatter: '{b}: {c} ({d}%)' },
            legend: { orient: 'horizontal' as const, bottom: 0 },
            color: ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
            series: [{
                name: '收入类型',
                type: 'pie',
                radius: '50%',
                data: bills
                    .filter((bill: any) => bill.type === 'income')
                    .reduce((acc: any[], bill: any) => {
                        const type = bill.useFor || '其他';
                        const existingType = acc.find(item => item.name === type);
                        if (existingType) {
                            existingType.value += Number(bill.money);
                        } else {
                            acc.push({ name: type, value: Number(bill.money) });
                        }
                        return acc;
                    }, [])
            }]
        };

        // 支出类型占比图表
        const expenseOption = {
            title: { text: '支出类型占比', left: 'center' },
            tooltip: { trigger: 'item' as const, formatter: '{b}: {c} ({d}%)' },
            legend: { orient: 'horizontal' as const, bottom: 0 },
            color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#3ba272'],
            series: [{
                name: '支出类型',
                type: 'pie',
                radius: '50%',
                data: bills
                    .filter((bill: any) => bill.type === 'pay')
                    .reduce((acc: any[], bill: any) => {
                        const type = bill.useFor || '其他';
                        const existingType = acc.find(item => item.name === type);
                        if (existingType) {
                            existingType.value += Number(bill.money);
                        } else {
                            const colorIndex = acc.length % 10; // 使用取模确保颜色循环使用
                            acc.push({
                                name: type,
                                value: Number(bill.money),
                                itemStyle: {
                                    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#3ba272'][colorIndex]
                                }
                            });
                        }
                        return acc;
                    }, [])
            }]
        };

        // 设置图表选项
        newCharts[0].setOption(totalOption);
        newCharts[1].setOption(incomeOption);
        newCharts[2].setOption(expenseOption);

        // 处理窗口大小变化
        const handleResize = () => newCharts.forEach(chart => chart.resize());
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            newCharts.forEach(chart => chart.dispose());
        };
    }, [totalIncome, totalExpense, loading, selectedYear, selectedMonth]);

    const handleGetAiAdvice = async () => {
        if (!bills.length) return;

        setLoadingAdvice(true);
        setAiAdvice('');

        // 将图表数据转换为文字描述
        const incomeBills = bills.filter(bill => bill.type === 'income');
        const expenseBills = bills.filter(bill => bill.type === 'pay');

        // 收入类型统计
        const incomeByType = incomeBills.reduce((acc, bill) => {
            const type = bill.useFor || '其他';
            acc[type] = (acc[type] || 0) + Number(bill.money);
            return acc;
        }, {});

        // 支出类型统计
        const expenseByType = expenseBills.reduce((acc, bill) => {
            const type = bill.useFor || '其他';
            acc[type] = (acc[type] || 0) + Number(bill.money);
            return acc;
        }, {});

        // 格式化文字描述
        const textDescription = `本月收支情况：\n` +
            `总收入：${totalIncome}元，总支出：${totalExpense}元\n\n` +
            `收入来源：${Object.entries(incomeByType).map(([type, amount]) => `${type}(${amount}元)`).join('、')}\n` +
            `支出类别：${Object.entries(expenseByType).map(([type, amount]) => `${type}(${amount}元)`).join('、')}`;

        // 调用大模型API获取建议
        try {
            const response = await getAiAdvice(textDescription);
            if (response.success === 1) {
                setAiAdvice(response.data || '');
            } else {
                setAiAdvice(response.message || '获取AI建议失败');
            }
        } catch (error) {
            console.error('获取AI建议失败:', error);
            setAiAdvice('获取AI建议失败，请稍后重试');
        } finally {
            setLoadingAdvice(false);
        }
    };

    const renderContent = () => {
        if (loading) {
            return <div className="loading">加载中...</div>;
        }
        if (error) {
            return <div className="error-message">{error}</div>;
        }
        if (totalIncome === 0 && totalExpense === 0) {
            return <div className="no-data">当前月份暂无收支记录</div>;
        }
        return (
            <div className="bill-summary">
                <div ref={chartRef} className="chart-container" style={{ minHeight: '300px' }} />
                <div className="ai-advice-container">
                    <button
                        className="ai-advice-button"
                        onClick={handleGetAiAdvice}
                        disabled={loadingAdvice}
                    >
                        {loadingAdvice ? '生成建议中...' : '获取AI建议'}
                    </button>
                    {aiAdvice && <div className="ai-advice-content"><ReactMarkdown>{aiAdvice}</ReactMarkdown></div>}
                </div>
            </div>

        );
    };

    if (!user) {
        return <div className="loading">加载中...</div>;
    }

    return (
        <div className="analysis-container">
            <div className="analysis-header">
                <h1>账单分析</h1>
            </div>
            <div className="analysis-content">
                <div className="date-selector">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>{year}年</option>
                        ))}
                    </select>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>{month}月</option>
                        ))}
                    </select>
                </div>
                {renderContent()}
            </div>
            <BottomNav />
        </div>
    );
};

export default Analysis;