import React from 'react';
import { useChat } from '../hooks/useChat';
import { Send, Coffee, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatInterface() {
    const { messages, input, setInput, isLoading, sendMessage, messagesEndRef } = useChat();

    return (
        <div className="flex flex-col h-full bg-bg">
            {/* Header */}
            <header className="bg-primary text-white p-5 flex items-center gap-4 shadow-md z-10">
                <div className="bg-secondary/20 p-2 rounded-full">
                    <Coffee className="w-8 h-8 text-secondary" />
                </div>
                <div>
                    <h1 className="font-serif text-xl font-bold tracking-wide">Gemini Cafe</h1>
                    <p className="text-xs uppercase tracking-wider opacity-80">Virtual Barista</p>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[radial-gradient(#e0d4c8_1px,transparent_1px)] [background-size:20px_20px]">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm md:text-base whitespace-pre-line leading-relaxed ${msg.role === 'user'
                                        ? 'bg-user-msg text-primary rounded-br-sm'
                                        : 'bg-bot-msg text-text border border-gray-100 rounded-bl-sm'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-bot-msg text-text p-4 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                            <span className="text-sm text-gray-400 italic">Brewing response...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-card p-4 border-t border-gray-100">
                <form onSubmit={sendMessage} className="flex gap-2 max-w-3xl mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your order or question..."
                        className="flex-1 p-3 px-5 rounded-full border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-sm shadow-inner bg-gray-50"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="p-3 bg-primary text-white rounded-full hover:bg-[#2b1b18] hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        <Send className="w-5 h-5 ml-0.5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
