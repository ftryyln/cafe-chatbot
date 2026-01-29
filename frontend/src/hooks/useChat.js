import { useState, useRef, useEffect } from 'react';

export function useChat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]); // For backend context
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Auto-send initial greeting to trigger backend's language selection
    useEffect(() => {
        const initChat = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ conversation: [{ role: 'user', content: 'hi' }] })
                });

                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                const botMsg = { id: Date.now(), role: 'bot', text: data.result };
                const botHistoryMsg = { role: 'model', content: data.result };

                setMessages([botMsg]);
                setHistory([{ role: 'user', content: 'hi' }, botHistoryMsg]);
            } catch (error) {
                console.error('Error:', error);
                setMessages([{ id: Date.now(), role: 'bot', text: "Welcome to Gemini Cafe! Please refresh the page." }]);
            } finally {
                setIsLoading(false);
            }
        };

        initChat();
    }, []);


    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input }; // Backend format
        const uiMsg = { id: Date.now(), role: 'user', text: input }; // UI format

        setMessages(prev => [...prev, uiMsg]);
        setHistory(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Use history + current message for context
            const currentHistory = [...history, userMsg];

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ conversation: currentHistory })
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            const botMsg = { id: Date.now() + 1, role: 'bot', text: data.result };
            const botHistoryMsg = { role: 'model', content: data.result };

            setMessages(prev => [...prev, botMsg]);
            setHistory(prev => [...prev, botHistoryMsg]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: "Sorry, I'm having trouble connecting to the cafe. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        input,
        setInput,
        isLoading,
        sendMessage,
        messagesEndRef
    };
}
