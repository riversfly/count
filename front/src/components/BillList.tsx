// import React, { useState, useEffect } from 'react';
// import { Bill, QueryBillsRequest } from '../types/bills';
// import { getUserBills, deleteBill } from '../services/billApi';
// import { User } from '../types/users';
// import './BillList.css';

// interface BillListProps {
//     user: User;
//     onBillsLoaded?: (bills: Bill[]) => void;
//     refreshTrigger?: number; // 用于触发刷新的属性
// }

// const BillList: React.FC<BillListProps> = ({ user, onBillsLoaded, refreshTrigger }) => {
//     const [bills, setBills] = useState<Bill[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
//     const [filterType, setFilterType] = useState<'all' | 'pay' | 'income'>('all');
//     const [filterCategory, setFilterCategory] = useState<string>('all');
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
//     const [selectedBillId, setSelectedBillId] = useState<number | null>(null);
//     const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

//     // 预定义的支出分类
//     const expenseCategories = ['餐饮', '交通', '购物', '娱乐', '居家', '医疗', '教育', '其他'];
//     // 预定义的收入分类
//     const incomeCategories = ['工资', '奖金', '投资', '兼职', '礼金', '其他'];

//     // 格式化日期显示
//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString);
//         return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
//     };

//     // 格式化金额显示
//     const formatMoney = (money: number, type: string) => {
//         return type === 'income' ? `+${money.toFixed(2)}` : `-${money.toFixed(2)}`;
//     };

//     // 当筛选条件变化时，重置分类筛选
//     useEffect(() => {
//         if (filterType === 'all') {
//             setFilterCategory('all');
//         }
//     }, [filterType]);

//     // 获取账单数据
//     useEffect(() => {
//         const fetchBills = async () => {
//             setLoading(true);
//             setError('');
//             try {
//                 // 构建查询参数
//                 const queryParams: QueryBillsRequest = {};

//                 // 根据筛选条件设置查询参数
//                 if (filterType !== 'all') {
//                     queryParams.type = filterType;
//                 }

//                 if (filterCategory !== 'all') {
//                     queryParams.use_for = filterCategory;
//                 }

//                 const response = await getUserBills(user.id, queryParams);
//                 if (response.success === 1) {
//                     // 按日期降序排序，最新的在前面
//                     const sortedBills = response.data.sort((a: Bill, b: Bill) =>
//                         new Date(b.date).getTime() - new Date(a.date).getTime()
//                     );
//                     setBills(sortedBills);
//                     if (onBillsLoaded) {
//                         onBillsLoaded(sortedBills);
//                     }

//                 } else {
//                     setError(response.message || '获取账单失败');
//                 }
//             } catch (err) {
//                 setError('获取账单时发生错误');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBills();
//     }, [user.id, refreshTrigger, onBillsLoaded, filterType, filterCategory]);

//     // 渲染筛选器部分
//     const renderFilters = () => (
//         <div className="bill-filter-container">
//             <div className="filter-group">
//                 <select
//                     value={filterType}
//                     onChange={handleTypeChange}
//                     className="filter-select"
//                 >
//                     <option value="all">全部类型</option>
//                     <option value="income">收入</option>
//                     <option value="pay">支出</option>
//                 </select>

//                 {filterType !== 'all' && (
//                     <select
//                         value={filterCategory}
//                         onChange={handleCategoryChange}
//                         className="filter-select"
//                     >
//                         <option value="all">全部{filterType === 'income' ? '收入' : '支出'}类别</option>
//                         {filterType === 'income'
//                             ? incomeCategories.map(cat => (
//                                 <option key={cat} value={cat}>{cat}</option>
//                             ))
//                             : expenseCategories.map(cat => (
//                                 <option key={cat} value={cat}>{cat}</option>
//                             ))
//                         }
//                     </select>
//                 )}

//                 {(filterType !== 'all' || filterCategory !== 'all') && (
//                     <button
//                         onClick={resetFilters}
//                         className="filter-reset-button"
//                     >
//                         重置筛选
//                     </button>
//                 )}
//             </div>

//             {/* 删除确认对话框 */}
//             {showDeleteConfirm && selectedBillId && (
//                 <div className="delete-confirm-overlay">
//                     <div className="delete-confirm-dialog">
//                         <h4>确认删除</h4>
//                         <p>确定要删除这条账单记录吗？此操作不可撤销。</p>
//                         <div className="delete-confirm-buttons">
//                             <button
//                                 className="cancel-button"
//                                 onClick={() => {
//                                     setShowDeleteConfirm(false);
//                                     setSelectedBillId(null);
//                                 }}
//                                 disabled={deleteLoading}
//                             >
//                                 取消
//                             </button>
//                             <button
//                                 className="confirm-button"
//                                 onClick={async () => {
//                                     setDeleteLoading(true);
//                                     try {
//                                         const response = await deleteBill(selectedBillId);
//                                         if (response.success === 1) {
//                                             // 重新获取账单列表
//                                             const updatedBills = bills.filter(bill => bill.id !== selectedBillId);
//                                             setBills(updatedBills);
//                                             if (onBillsLoaded) {
//                                                 onBillsLoaded(updatedBills);
//                                             }
//                                         } else {
//                                             setError(response.message || '删除账单失败');
//                                         }
//                                     } catch (err) {
//                                         setError('删除账单时发生错误');
//                                         console.error(err);
//                                     } finally {
//                                         setDeleteLoading(false);
//                                         setShowDeleteConfirm(false);
//                                         setSelectedBillId(null);
//                                     }
//                                 }}
//                                 disabled={deleteLoading}
//                             >
//                                 {deleteLoading ? '删除中...' : '确认删除'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );

//     // 处理筛选类型变化
//     const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const value = e.target.value as 'all' | 'pay' | 'income';
//         setFilterType(value);
//         // 当切换类型时，重置分类筛选
//         setFilterCategory('all');
//     };

//     // 处理筛选分类变化
//     const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setFilterCategory(e.target.value);
//     };

//     // 重置所有筛选条件
//     const resetFilters = () => {
//         setFilterType('all');
//         setFilterCategory('all');
//     };

//     console.log('bills:', bills);

//     if (loading) {
//         return (
//             <div className="bill-list-container">
//                 <div className="bill-list-header">
//                     <h3>交易明细</h3>
//                     {renderFilters()}
//                 </div>
//                 <div className="bill-loading">加载账单中...</div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="bill-list-container">
//                 <div className="bill-list-header">
//                     <h3>交易明细</h3>
//                     {renderFilters()}
//                 </div>
//                 <div className="bill-error">{error}</div>
//             </div>
//         );
//     }

//     return (
//         <div className="bill-list-container">
//             <div className="bill-list-header">
//                 <h3>交易明细</h3>
//                 {renderFilters()}
//             </div>
//             <div className="bill-list">
//                 {bills.length === 0 ? (
//                     <div className="bill-empty">暂无账单记录，请添加新的账单。</div>
//                 ) : bills.map((bill) => (
//                     <div key={bill.id} className={`bill-item ${bill.type === 'income' ? 'income' : 'expense'}`}>
//                         <div className="bill-date">{formatDate(bill.date)}</div>
//                         <div className="bill-info">
//                             <div className="bill-category">{bill.useFor || (bill.type === 'income' ? '收入' : '支出')}</div>
//                             <div className="bill-note">{bill.note || '-'}</div>
//                         </div>
//                         <div className="bill-amount">{formatMoney(bill.money, bill.type)}</div>
//                         <button
//                             className="bill-delete-button"
//                             onClick={() => {
//                                 setSelectedBillId(bill.id);
//                                 setShowDeleteConfirm(true);
//                             }}
//                         >
//                             删除
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {/* 删除确认对话框 */}
//             {showDeleteConfirm && selectedBillId && (
//                 <div className="delete-confirm-overlay">
//                     <div className="delete-confirm-dialog">
//                         <h4>确认删除</h4>
//                         <p>确定要删除这条账单记录吗？此操作不可撤销。</p>
//                         <div className="delete-confirm-buttons">
//                             <button
//                                 className="cancel-button"
//                                 onClick={() => {
//                                     setShowDeleteConfirm(false);
//                                     setSelectedBillId(null);
//                                 }}
//                                 disabled={deleteLoading}
//                             >
//                                 取消
//                             </button>
//                             <button
//                                 className="confirm-button"
//                                 onClick={async () => {
//                                     setDeleteLoading(true);
//                                     try {
//                                         const response = await deleteBill(selectedBillId);
//                                         if (response.success === 1) {
//                                             // 重新获取账单列表
//                                             const updatedBills = bills.filter(bill => bill.id !== selectedBillId);
//                                             setBills(updatedBills);
//                                             if (onBillsLoaded) {
//                                                 onBillsLoaded(updatedBills);
//                                             }
//                                         } else {
//                                             setError(response.message || '删除账单失败');
//                                         }
//                                     } catch (err) {
//                                         setError('删除账单时发生错误');
//                                         console.error(err);
//                                     } finally {
//                                         setDeleteLoading(false);
//                                         setShowDeleteConfirm(false);
//                                         setSelectedBillId(null);
//                                     }
//                                 }}
//                                 disabled={deleteLoading}
//                             >
//                                 {deleteLoading ? '删除中...' : '确认删除'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BillList;