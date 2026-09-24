'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Send, RotateCcw, CalendarDays } from 'lucide-react';
import type { Dictionary, Lang } from '@/i18n';
import { BOOKING_CALL_URL } from '@/lib/config';
import {
  DEMO_BUSINESS_NAMES,
  DEMO_MAX_INPUT_CHARS,
  DEMO_MAX_USER_MESSAGES,
  DEMO_SCENARIO_IDS,
  type DemoScenarioId,
} from '@/data/demoScenarios';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

type ErrorKind = 'generic' | 'rate_limited' | null;

const emptyConversations = (): Record<DemoScenarioId, ChatMessage[]> => ({ restaurant: [], villa: [], club: [] });

export default function DemoChat({ dict, lang }: { dict: Dictionary; lang: Lang }) {
  const t = dict.demo;
  const [scenario, setScenario] = useState<DemoScenarioId>('restaurant');
  const [conversations, setConversations] = useState(emptyConversations);
  // Session-wide count across all scenarios, so switching tab doesn't reset the limit.
  const [sentCount, setSentCount] = useState(0);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorKind>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = conversations[scenario];
  const scenarioCopy = t.scenarios[scenario];
  const businessName = DEMO_BUSINESS_NAMES[scenario];
  const limitReached = sentCount >= DEMO_MAX_USER_MESSAGES;
  const remaining = DEMO_MAX_USER_MESSAGES - sentCount;
  const usedQuickReplies = new Set(messages.filter((m) => m.role === 'user').map((m) => m.content));
  const quickReplies = scenarioCopy.quickReplies.filter((q) => !usedQuickReplies.has(q));

  useEffect(() => {
    // Scroll only the chat pane, never the page.
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, error, limitReached]);

  const switchScenario = (id: DemoScenarioId) => {
    if (loading || id === scenario) return;
    setScenario(id);
    setError(null);
    setInput('');
  };

  const restart = () => {
    if (loading) return;
    setConversations((prev) => ({ ...prev, [scenario]: [] }));
    setError(null);
  };

  const send = async (raw: string) => {
    const text = raw.trim().slice(0, DEMO_MAX_INPUT_CHARS);
    if (!text || loading || limitReached) return;

    const activeScenario = scenario;
    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setConversations((prev) => ({ ...prev, [activeScenario]: nextMessages }));
    setSentCount((n) => n + 1);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: activeScenario, messages: nextMessages, lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || typeof data.reply !== 'string') {
        if (data.error === 'limit_reached') setSentCount(DEMO_MAX_USER_MESSAGES);
        setError(res.status === 429 && data.error === 'rate_limited' ? 'rate_limited' : 'generic');
        return;
      }
      setConversations((prev) => ({
        ...prev,
        [activeScenario]: [...prev[activeScenario], { role: 'assistant', content: data.reply }],
      }));
    } catch {
      setError('generic');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <section id="demo" className="py-20 px-6 border-t border-green-600/20 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-title text-5xl font-bold mb-4">{t.title}</h2>
          <p className="text-gray-300 text-lg mt-6">{t.subtitle}</p>
        </div>

        {/* Scenario selector */}
        <div role="tablist" aria-label={t.demoBadge} className="grid grid-cols-3 gap-2 mb-4">
          {DEMO_SCENARIO_IDS.map((id) => (
            <button
              key={id}
              role="tab"
              aria-selected={scenario === id}
              onClick={() => switchScenario(id)}
              disabled={loading && scenario !== id}
              className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors disabled:opacity-50 ${
                scenario === id
                  ? 'border-green-500 bg-green-600/15 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
                  : 'border-green-600/20 text-gray-400 hover:text-green-400 hover:border-green-600/50'
              }`}
            >
              {t.scenarios[id].label}
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mono mb-4">
          <span className="text-green-500/90 uppercase tracking-widest">{t.demoBadge}</span>
          <span className="mx-2 text-green-900">·</span>
          <span className="text-gray-300">{businessName}</span>
          <span className="block mt-1 normal-case tracking-normal">{t.demoNote}</span>
        </p>

        {/* Chat window */}
        <div className="h-[min(72vh,560px)] flex flex-col rounded-2xl border border-green-600/30 bg-black overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.12)]">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-green-600/20 bg-green-950/20">
            <div className="relative shrink-0">
              <Image
                src="/favicon.png"
                alt=""
                width={80}
                height={80}
                sizes="40px"
                className="w-10 h-10 rounded-full object-contain bg-black border border-green-600/40"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{t.assistantName}</p>
              <p className="text-xs text-green-500 mono" aria-live="polite">
                {loading ? t.typing : t.status}
              </p>
            </div>
            <button
              type="button"
              onClick={restart}
              disabled={loading || messages.length === 0}
              aria-label={t.restart}
              title={t.restart}
              className="p-2 rounded-full text-gray-400 hover:text-green-400 hover:bg-green-600/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" aria-live="polite">
            <AssistantBubble>{scenarioCopy.greeting.replace('{business}', businessName)}</AssistantBubble>

            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-green-600 text-black px-3.5 py-2 text-sm whitespace-pre-wrap break-words">
                    {m.content}
                  </div>
                </div>
              ) : (
                <AssistantBubble key={i}>{m.content}</AssistantBubble>
              )
            )}

            {loading && (
              <div className="flex justify-start" aria-label={t.typing}>
                <div className="rounded-2xl rounded-bl-sm bg-green-950/40 border border-green-600/20 px-4 py-3 flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-bounce"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-amber-950/30 border border-amber-600/30 px-3.5 py-2 text-sm text-amber-200">
                  {error === 'rate_limited' ? t.rateLimitedMessage : t.errorMessage}
                </div>
              </div>
            )}

            {limitReached && !loading && (
              <div className="mt-4 p-4 rounded-xl border border-green-600/40 bg-green-950/20 text-center space-y-3 animate-fade-in">
                <p className="font-semibold text-gray-100">{t.limitTitle}</p>
                <a
                  href={BOOKING_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-black font-semibold rounded text-sm"
                >
                  <CalendarDays className="w-4 h-4" /> {t.limitCta}
                </a>
              </div>
            )}
          </div>

          {!limitReached && quickReplies.length > 0 && (
            <div className="flex gap-2 overflow-x-auto px-4 pt-3 pb-1 border-t border-green-600/10">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  disabled={loading}
                  className="shrink-0 px-3 py-1.5 rounded-full border border-green-600/40 text-green-400 text-xs hover:bg-green-600/10 disabled:opacity-40 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-green-600/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={DEMO_MAX_INPUT_CHARS}
              disabled={limitReached}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              className="flex-1 min-w-0 px-4 py-2.5 bg-black border border-green-600/30 rounded-full text-sm text-white placeholder-gray-600 disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={loading || limitReached || !input.trim()}
              aria-label={t.sendLabel}
              className="p-2.5 rounded-full bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-black transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {!limitReached && remaining <= 3 && (
          <p className="text-center text-xs text-gray-400 mono mt-3">
            {t.remainingTemplate.replace('{n}', String(remaining))}
          </p>
        )}
      </div>
    </section>
  );
}

function AssistantBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-green-950/40 border border-green-600/20 px-3.5 py-2 text-sm text-gray-200 whitespace-pre-wrap break-words">
        {children}
      </div>
    </div>
  );
}
