import axios from 'axios';
import { CreateBillRequest, QueryBillsRequest, Bill, BillSummary } from '../types/bills';

const API_URL = 'http://localhost:8080'; // 与现有API保持一致

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 获取用户的所有账单
export const getUserBills = async (userId: number, query?: QueryBillsRequest) => {
    try {
        const response = await api.get(`/bills`, {
            params: {
                userId,
                type: query?.type,
                useFor: query?.use_for,
                begin: query?.startDate,
                end: query?.endDate
            }
        });
        return response.data;
    } catch (error) {
        console.error('获取账单失败:', error);
        return {
            success: 0,
            data: [],
            message: '获取账单失败'
        };
    }
};

// 获取月度账单统计 - 直接使用后端API获取数据并在前端计算统计结果
export const getMonthSummary = async (userId: number, year: number, month: number) => {
    try {
        // 构建日期范围 - 从当月1号到当月最后一天
        const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
        // 获取月份的最后一天 - 使用JavaScript Date对象
        // 注意：new Date(year, month, 0)会返回month月的前一天，即month-1月的最后一天
        // 这里month是从1开始的（1表示1月），所以可以直接用于计算当月最后一天
        const lastDay = new Date(year, month, 0).getDate();
        const endDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;

        console.log(`获取账单统计 - 日期范围: ${startDate} 到 ${endDate}`);

        // 直接调用后端Bills API获取指定日期范围内的账单数据
        // 使用与后端BillsController.getBills方法匹配的参数
        const response = await api.get(`/bills`, {
            params: {
                userId,  // 用户ID
                begin: startDate,  // 开始日期 - 确保与后端参数名称匹配
                end: endDate,      // 结束日期 - 确保与后端参数名称匹配
                // 不指定type和useFor，获取所有类型的账单
            }
        });

        // 调试输出响应数据
        console.log('后端响应数据:', response.data);

        // 如果API调用失败，直接返回错误信息
        if (response.data.success !== 1) {
            return response.data;
        }

        // 从后端获取的账单数据列表
        const bills = response.data.data || [];
        let totalIncome = 0;
        let totalExpense = 0;

        // 遍历账单数据计算总收入和总支出
        bills.forEach((bill: any) => {
            // 确保金额是数字类型
            const amount = typeof bill.money === 'number' ? bill.money : parseFloat(bill.money) || 0;

            if (bill.type === 'income') {
                totalIncome += amount;
            } else if (bill.type === 'pay') {
                totalExpense += amount;
            } else {
                console.warn('未知的账单类型:', bill.type, '账单ID:', bill.id);
            }
        });

        console.log(`月度统计 - ${year}年${month}月: 收入=${totalIncome}, 支出=${totalExpense}, 账单数量=${bills.length}`);

        // 返回计算后的月度统计结果
        return {
            success: response.data.success,
            data: {
                totalIncome,
                totalExpense,
                balance: totalIncome - totalExpense
            },
            message: response.data.message || '获取月度统计成功'
        };
    } catch (error) {
        console.error('获取月度统计失败:', error);
        return {
            success: 0,
            data: {
                totalIncome: 0,
                totalExpense: 0,
                balance: 0
            },
            message: '获取月度统计失败'
        };
    }
};

// 创建新账单
export const createBill = async (userId: number, billData: CreateBillRequest) => {
    try {
        // 使用正确的API路径和参数格式
        const requestData = {
            userId,
            type: billData.type,
            money: billData.money,
            date: billData.date,
            note: billData.note,
            useFor: billData.use_for
        };

        const response = await api.post(`/bills`, requestData);
        return response.data;
    } catch (error) {
        console.error('创建账单失败:', error);
        return {
            success: 0,
            message: '创建账单失败'
        };
    }
};

// 更新账单 - 后端暂未实现此接口
export const updateBill = async (billId: number, billData: Partial<CreateBillRequest>) => {
    console.warn('更新账单接口尚未在后端实现');
    return {
        success: 0,
        message: '更新账单接口尚未在后端实现'
    };
    // 当后端实现此接口时，可以使用以下代码
    // try {
    //     const response = await api.put(`/bills/${billId}`, billData);
    //     return response.data;
    // } catch (error) {
    //     console.error('更新账单失败:', error);
    //     return {
    //         success: 0,
    //         message: '更新账单失败'
    //     };
    // }
};

// 删除账单 - 后端暂未实现此接口
export const deleteBill = async (billId: number) => {
    console.warn('删除账单接口尚未在后端实现');
    return {
        success: 0,
        message: '删除账单接口尚未在后端实现'
    };
    // 当后端实现此接口时，可以使用以下代码
    // try {
    //     const response = await api.delete(`/bills/${billId}`);
    //     return response.data;
    // } catch (error) {
    //     console.error('删除账单失败:', error);
    //     return {
    //         success: 0,
    //         message: '删除账单失败'
    //     };
    // }
};