// 账单类型定义
export interface Bill {
    id: number;
    user_id: number;
    type: 'pay' | 'income'; // 支出或收入
    money: number;
    date: string; // ISO格式的日期字符串
    note?: string; // 备注/用途说明
    useFor?: string; // 用途分类
}

// 创建账单请求类型定义
export interface CreateBillRequest {
    type: 'pay' | 'income';
    money: number;
    date: string;
    note?: string;
    useFor?: string;
}

// 查询账单请求类型定义
export interface QueryBillsRequest {
    startDate?: string;
    endDate?: string;
    type?: 'pay' | 'income';
    useFor?: string;
}

// 账单统计类型定义
export interface BillSummary {
    totalIncome: number;
    totalExpense: number;
    balance: number; // 收入 - 支出
}