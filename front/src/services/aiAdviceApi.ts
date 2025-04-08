export interface AiAdviceResponse {
  success: number;
  message?: string;
  data?: string;
}

export interface AiAdviceStreamResponse {
  success: number;
  message?: string;
  data?: string;
  isStream?: boolean;
}

export const getAiAdvice = async (
  textDescription: string,
  onStream?: (chunk: string) => void
): Promise<AiAdviceStreamResponse> => {
  try {
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
          content: `请根据以下收支数据给出财务建议:\n${textDescription}`
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

    let adviceContent = '';
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
              adviceContent += content;
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

    return {
      success: 1,
      data: adviceContent
    };
  } catch (error) {
    console.error('获取AI建议失败:', error);
    return {
      success: 0,
      message: '获取AI建议失败，请稍后重试'
    };
  }
};