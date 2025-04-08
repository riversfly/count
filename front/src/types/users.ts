// 用户登录请求类型定义
export interface UsersLoginRequest {
    username: string;
    password: string;
}

// 用户注册请求类型定义
export interface UsersRegisterRequest {
    username: string;
    password: string;
}

// 用户信息类型定义
export interface User {
    id: number;
    username: string;
    password?: string; // 通常不会返回密码，但保留字段以匹配后端实体
}

// 后端返回结果类型定义
export interface ResultVo<T> {
    success: number; // 1表示成功，0表示失败
    message: string;
    data: T | null;
}