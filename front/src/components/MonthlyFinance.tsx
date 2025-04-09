import React, { useState, useEffect } from 'react';
import { BillSummary as BillSummaryType, Bill, QueryBillsRequest } from '../types/bills';
import { getMonthSummary, getUserBills, deleteBill } from '../services/billApi';
import { User } from '../types/users';
import './BillSummary.css';
import './BillList.css';
import './MonthlyFinance.css';

interface MonthlyFinanceProps {
    user: User;
    refreshTrigger?: number; // 用于触发刷新的属性
}

const MonthlyFinance: React.FC<MonthlyFinanceProps> = ({ user, refreshTrigger }) => {
    // 共享的年月选择器状态
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript月份从0开始

    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

    // BillSummary相关状态
    const [summary, setSummary] = useState<BillSummaryType>({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });
    const [summaryLoading, setSummaryLoading] = useState<boolean>(true);
    const [summaryError, setSummaryError] = useState<string>('');

    // BillList相关状态
    const [bills, setBills] = useState<Bill[]>([]);
    const [billsLoading, setBillsLoading] = useState<boolean>(true);
    const [billsError, setBillsError] = useState<string>('');
    const [filterType, setFilterType] = useState<'all' | 'pay' | 'income'>('all');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [selectedBillId, setSelectedBillId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    // 预定义的支出分类
    const expenseCategories = ['餐饮', '交通', '购物', '娱乐', '居家', '医疗', '教育', '其他'];
    // 预定义的收入分类
    const incomeCategories = ['工资', '奖金', '投资', '兼职', '礼金', '其他'];

    // 获取月度统计数据
    useEffect(() => {
        const fetchSummary = async () => {
            if (!user || !user.id) return;

            setSummaryLoading(true);
            setSummaryError('');
            try {
                const response = await getMonthSummary(user.id, selectedYear, selectedMonth);

                if (response.success === 1) {
                    setSummary(response.data);
                } else {
                    setSummaryError(response.message || '获取月度统计失败');
                    console.error('获取月度统计失败:', response.message);
                }
            } catch (err) {
                setSummaryError('获取月度统计时发生错误');
                console.error('获取月度统计异常:', err);
            } finally {
                setSummaryLoading(false);
            }
        };

        fetchSummary();
    }, [user, user.id, selectedYear, selectedMonth, refreshTrigger]);

    // 获取账单数据
    useEffect(() => {
        const fetchBills = async () => {
            if (!user || !user.id) return;

            setBillsLoading(true);
            setBillsError('');
            try {
                // 构建查询参数
                const queryParams: QueryBillsRequest = {
                    // 添加日期范围筛选
                    startDate: `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-01`,
                    endDate: `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${new Date(selectedYear, selectedMonth, 0).getDate().toString().padStart(2, '0')}`
                };

                // 根据筛选条件设置查询参数
                if (filterType !== 'all') {
                    queryParams.type = filterType;
                }

                if (filterCategory !== 'all') {
                    queryParams.use_for = filterCategory;
                }

                const response = await getUserBills(user.id, queryParams);
                if (response.success === 1) {
                    // 按日期降序排序，最新的在前面
                    const sortedBills = response.data.sort((a: Bill, b: Bill) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                    setBills(sortedBills);
                } else {
                    setBillsError(response.message || '获取账单失败');
                }
            } catch (err) {
                setBillsError('获取账单时发生错误');
                console.error(err);
            } finally {
                setBillsLoading(false);
            }
        };

        fetchBills();
    }, [user.id, refreshTrigger, filterType, filterCategory, selectedYear, selectedMonth]);

    // 处理年份变化
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(e.target.value));
    };

    // 处理月份变化
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(parseInt(e.target.value));
    };

    // 处理筛选类型变化
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as 'all' | 'pay' | 'income';
        setFilterType(value);
        // 当切换类型时，重置分类筛选
        setFilterCategory('all');
    };

    // 处理筛选分类变化
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterCategory(e.target.value);
    };

    // 重置所有筛选条件
    const resetFilters = () => {
        setFilterType('all');
        setFilterCategory('all');
    };

    // 格式化日期显示
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
    };

    // 格式化金额显示
    const formatMoney = (money: number, type: string) => {
        return type === 'income' ? `+${money.toFixed(2)}` : `-${money.toFixed(2)}`;
    };

    // 生成年份选项，前后5年
    const yearOptions = [];
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
        yearOptions.push(year);
    }

    // 渲染筛选器部分
    const renderFilters = () => (
        <div className="bill-filter-container">
            <div className="filter-group">
                <select
                    value={filterType}
                    onChange={handleTypeChange}
                    className="filter-select"
                >
                    <option value="all">全部类型</option>
                    <option value="income">收入</option>
                    <option value="pay">支出</option>
                </select>

                {filterType !== 'all' && (
                    <select
                        value={filterCategory}
                        onChange={handleCategoryChange}
                        className="filter-select"
                    >
                        <option value="all">全部{filterType === 'income' ? '收入' : '支出'}类别</option>
                        {filterType === 'income'
                            ? incomeCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))
                            : expenseCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))
                        }
                    </select>
                )}

                {(filterType !== 'all' || filterCategory !== 'all') && (
                    <button
                        onClick={resetFilters}
                        className="filter-reset-button"
                    >
                        重置筛选
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="monthly-finance-container">
            {/* 月度财务概览部分 */}
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

                {summaryLoading ? (
                    <div className="summary-loading">加载统计数据中...</div>
                ) : summaryError ? (
                    <div className="summary-error">{summaryError}</div>
                ) : (
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
                )}
            </div>

            {/* 交易明细部分 */}
            <div className="bill-list-container">
                <div className="bill-list-header">
                    <h3>交易明细</h3>
                    {renderFilters()}
                </div>

                {billsLoading ? (
                    <div className="bill-loading">加载账单中...</div>
                ) : billsError ? (
                    <div className="bill-error">{billsError}</div>
                ) : (
                    <div className="bill-list">
                        {bills.length === 0 ? (
                            <div className="bill-empty">暂无账单记录，请添加新的账单。</div>
                        ) : bills.map((bill) => (
                            <div key={bill.id} className={`bill-item ${bill.type === 'income' ? 'income' : 'expense'}`}>
                                <div className="bill-date">{formatDate(bill.date)}</div>
                                <div className="bill-info">
                                    <div className="bill-category">{bill.useFor || (bill.type === 'income' ? '收入' : '支出')}</div>
                                    <div className="bill-note">{bill.note || '-'}</div>
                                </div>
                                <div className="bill-amount">{formatMoney(bill.money, bill.type)}</div>
                                <button
                                    className="bill-delete-button"
                                    onClick={() => {
                                        setSelectedBillId(bill.id);
                                        setShowDeleteConfirm(true);
                                    }}
                                >
                                    删除
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* 删除确认对话框 */}
                {showDeleteConfirm && selectedBillId && (
                    <div className="delete-confirm-overlay">
                        <div className="delete-confirm-dialog">
                            <h4>确认删除</h4>
                            <p>确定要删除这条账单记录吗？此操作不可撤销。</p>
                            <div className="delete-confirm-buttons">
                                <button
                                    className="cancel-button"
                                    onClick={() => {
                                        setShowDeleteConfirm(false);
                                        setSelectedBillId(null);
                                    }}
                                    disabled={deleteLoading}
                                >
                                    取消
                                </button>
                                <button
                                    className="confirm-button"
                                    onClick={async () => {
                                        setDeleteLoading(true);
                                        try {
                                            const response = await deleteBill(selectedBillId);
                                            if (response.success === 1) {
                                                // 重新获取账单列表
                                                const updatedBills = bills.filter(bill => bill.id !== selectedBillId);
                                                setBills(updatedBills);
                                            } else {
                                                setBillsError(response.message || '删除账单失败');
                                            }
                                        } catch (err) {
                                            setBillsError('删除账单时发生错误');
                                            console.error(err);
                                        } finally {
                                            setDeleteLoading(false);
                                            setShowDeleteConfirm(false);
                                            setSelectedBillId(null);
                                        }
                                    }}
                                    disabled={deleteLoading}
                                >
                                    {deleteLoading ? '删除中...' : '确认删除'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MonthlyFinance;