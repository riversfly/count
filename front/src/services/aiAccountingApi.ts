export interface AiAccountingResponse {
  success: number;
  message?: string;
  data?: string | {
    date: string;
    money: number;
    note: string;
    type: 'pay' | 'income';
    useFor: string;
    userId: number;
  }[];
}

export const saveAccountingData = async (
  userId: number,
  type: string,
  money: number,
  date: string,
  note: string,
  useFor: string
): Promise<{ success: boolean; message?: string }> => {
  // 数据验证
  if (!userId || !type || !money || !date) {
    return {
      success: false,
      message: '缺少必要参数: userId, type, money或date'
    };
  }

  try {
    const billData = {
      userId,
      type,
      money,
      date,
      note: note || '',
      useFor: useFor || '',
    };

    // 调用后端API保存数据
    const response = await fetch('http://localhost:8080/bills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(billData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '保存账单失败');
    }

    return {
      success: true,
      message: '账单保存成功'
    };
  } catch (error) {
    console.error('保存账单数据失败:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '保存账单数据失败，请重试'
    };
  }
};

export const parseAccountingData = async (
  textDescription: string,
  onStream?: (chunk: string) => void
): Promise<AiAccountingResponse> => {
  try {
    const userJSON = localStorage.getItem('user');
    let userParsed = undefined;
    if (userJSON) {
      userParsed = JSON.parse(userJSON);
    }

    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-d06eacdcaec74d8d9b32bb6a9e7fb604',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-r1',
        messages: [{
          role: 'user',
          content: `请将以下账单信息解析为包含date、money、note、type、useFor和${userParsed.id}字段的纯净JSON:\n${textDescription}\n \n返回格式示例:{"date":"2023-01-01","money":100.0,"note":"备注","type":"pay","useFor":"用途","userId":1},type字段只能为'pay'或'income'，支出(pay)用途只包括以下选项: '餐饮', '交通', '购物', '娱乐', '居家', '医疗', '教育', '其他'，收入(income)用途只包括以下选项: '工资', '奖金', '投资', '兼职', '礼金', '其他'\n注意有可能有多条账单信息，返回的JSON数组中每个元素都是一条账单信息。`
        }],
        stream: true,
        stream_options: {
          include_usage: true
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to get reader from response');
    }

    let accountingContent = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.substring(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.choices?.[0]?.delta?.content) {
              const content = parsed.choices[0].delta.content;
              accountingContent += content;
              if (onStream) {
                onStream(content);
              }
            }
          } catch (e) {
            console.error('Failed to parse chunk:', e);
          }
        }
      }
    }

    let cleanContent = accountingContent.replace(/^```json\n|```$/g, '').trim();
    return {
      success: 1,
      data: cleanContent
    };
  } catch (error) {
    console.error('解析账单数据失败:', error);
    return {
      success: 0,
      message: '解析账单数据失败，请检查输入格式'
    };
  }
};