import React, { useState } from 'react';
import axios from 'axios';

export default function ChatboxAI() {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState<{ role: string, content: string }[]>([]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setChat([...chat, userMessage]);
        setInput('');

        try {
            const res = await axios.post('/api/openai/chatboxai', {
                message: input,
            });

            const reply = res.data.choices[0].message;
            setChat(prev => [...prev, reply]);
        } catch (err) {
            setChat(prev => [...prev, { role: 'assistant', content: 'Terjadi kesalahan pada server.' }]);
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <div className="border p-4 h-96 overflow-y-auto bg-white rounded shadow">
                {chat.map((msg, i) => (
                    <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className="inline-block bg-gray-200 px-3 py-2 rounded">
                            {msg.content}
                        </span>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex">
                <input
                    className="flex-1 border rounded p-2 mr-2"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Tanyakan sesuatu..."
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Kirim
                </button>
            </div>
        </div>
    );
}

