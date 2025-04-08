import React from 'react';
import { User } from '../types/users';
import BottomNav from '../components/BottomNav';
import './AIAccounting.css';
import { parseAccountingData } from '../services/aiAccountingApi';
import { saveAccountingData } from '../services/aiAccountingApi';

const AIAccounting: React.FC = () => {
    const [user, setUser] = React.useState<User | null>(null);
    const [inputText, setInputText] = React.useState('');
    const [response, setResponse] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse user data:', error);
            }
        }
    }, []);

    if (!user) {
        return <div className="loading">加载中...</div>;
    }

    return (
        <div className="ai-accounting-container">
            <div className="ai-accounting-header">
                <h1>AI智能记账</h1>
            </div>

            <div className="ai-accounting-content">
                <form className="ai-accounting-form">
                    <textarea
                        className="ai-input"
                        placeholder="请输入您的消费事项..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="ai-submit-button"
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                        onClick={async (e) => {
                            e.preventDefault();
                            if (!inputText.trim()) {
                                alert('请输入消费事项');
                                return;
                            }
                            setIsLoading(true);
                            setResponse(null);
                            try {
                                const result = await parseAccountingData(inputText);
                                if (result && result.success) {
                                    setResponse(result);
                                } else {
                                    alert(result?.message || '解析失败，请重试');
                                }
                            } catch (error) {
                                console.error('Error:', error);
                                alert('请求失败，请检查网络后重试');
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? '处理中...' : '智能记账'}
                    </button>
                </form>
            </div>

            {response && (
                <div>

                <div className="response-container">
                    <h3>解析结果:</h3>
                    <div className="parsed-results">
                        {typeof response.data === 'string' ? (
                            (() => {
                                try {
                                    const parsedData = JSON.parse(response.data);
                                    const items = Array.isArray(parsedData) ? parsedData : [parsedData];
                                    return (
                                        <div>
                                            {items.map((item, index) => (
                                                <div key={index} style={{marginBottom: '20px'}}>
                                                    <p>日期: {item.date}</p>
                                                    <p>金额: {item.money}</p>
                                                    <p>类型: {item.type}</p>
                                                    <p>用途: {item.useFor}</p>
                                                    <p>备注: {item.note}</p>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                } catch (e) {
                                    return <pre>{response.data}</pre>;
                                }
                            })()
                        ) : (
                            <pre>{response.data}</pre>
                        )}
                    </div>
                </div>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button
                        className="ai-submit-button"
                        onClick={async () => {
                            try {
                                if (!response || !response.data) {
                                    alert('没有可保存的数据');
                                    return;
                                }

                                let parsedData;
                                if (typeof response.data === 'string') {
                                    try {
                                        parsedData = JSON.parse(response.data);
                                    } catch (e) {
                                        alert('解析结果格式不正确，无法保存');
                                        return;
                                    }
                                } else {
                                    parsedData = response.data;
                                }

                                const items = Array.isArray(parsedData) ? parsedData : [parsedData];
                                
                                let successCount = 0;
                                for (const item of items) {
                                    const saveResult = await saveAccountingData(
                                        item.userId,
                                        item.type,
                                        item.money,
                                        item.date,
                                        item.note,
                                        item.useFor,
                                    );
                                    if (saveResult.success) {
                                        successCount++;
                                    }
                                }
                                const message = `成功保存${successCount}条记录${successCount < items.length ? `，失败${items.length - successCount}条` : ''}`;
                                alert(message);
                                
                            } catch (error) {
                                console.error('保存失败:', error);
                                alert('保存失败，请重试');
                            }
                        }}
                    >
                        保存结果
                    </button>
                </div>
                </div>
            )}
            <div style={{ marginBottom: '80px' }} />
            <BottomNav />
        </div>
    );
};

export default AIAccounting;