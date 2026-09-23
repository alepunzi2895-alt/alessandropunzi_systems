'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import type { Dictionary, Lang } from '@/i18n';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget({ dict, lang }: { dict: Dictionary; lang: Lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, error]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, lang }),
      });
      if (!res.ok) throw new Error('request failed');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || '' }]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      {isOpen ? (
        <div className="w-[min(92vw,360px)] h-[min(70vh,520px)] bg-black border border-green-600/30 rounded-2xl shadow-[0_0_60px_rgba(34,197,94,0.15)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-green-600/20">
            <div>
              <p className="font-semibold text-sm">{dict.chat.title}</p>
              <p className="text-xs text-green-500 mono">{dict.chat.subtitle}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label={dict.chat.closeLabel}
              className="p-1.5 rounded-full hover:bg-green-600/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-green-950/30 border border-green-600/20 px-3 py-2 text-sm text-gray-200">
                {dict.chat.greeting}
              </div>
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'bg-green-600 text-black rounded-tr-sm'
                      : 'bg-green-950/30 border border-green-600/20 text-gray-200 rounded-tl-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-green-950/30 border border-green-600/20 px-3 py-2 text-sm text-gray-400 mono">
                  …
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-red-950/30 border border-red-600/30 px-3 py-2 text-sm text-red-300">
                  {dict.chat.errorMessage}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t border-green-600/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={dict.chat.placeholder}
              className="flex-1 min-w-0 px-3 py-2 bg-black border border-green-600/30 rounded-lg text-sm text-white placeholder-gray-600"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={dict.chat.sendLabel}
              className="p-2 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-black transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          aria-label={dict.chat.openLabel}
          className="btn-primary w-14 h-14 rounded-full bg-green-600 hover:bg-green-500 text-black flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
