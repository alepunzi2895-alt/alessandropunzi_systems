import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { translations, isSupportedLang, defaultLang, type Lang } from '@/i18n';

// Simple in-memory sliding-window rate limit, per IP.
// NOTE: resets on cold start and is per serverless instance — a "simple"
// limit as requested, not a durable one. For a hard guarantee across
// instances, back this with Upstash/Vercel KV instead.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

const LANGUAGE_NAMES: Record<Lang, string> = { it: 'Italian', en: 'English', es: 'Spanish' };

function buildSystemPrompt(lang: Lang): string {
  const dict = translations[lang];
  const packagesText = dict.offers.packages
    .map((p) => `- ${p.name}: ${p.forWho} Includes: ${p.includes.join('; ')}.`)
    .join('\n');

  return `You are the AI concierge for AP Systems, a freelance tech studio run by Alessandro Punzi, based in Ibiza, building websites, AI agents and booking systems for hospitality and luxury businesses (villas, hotels, restaurants, clubs, concierge services).

Reply in ${LANGUAGE_NAMES[lang]}. Keep answers short — 2 to 4 sentences, friendly and professional, no markdown formatting.

Services offered:
${packagesText}

Rules:
- Never invent exact prices, discounts, or delivery dates — none have been published yet. If asked for a specific number, say pricing is confirmed personally and suggest WhatsApp or booking a short call.
- Stay focused on AP Systems' services. If asked something unrelated, politely decline and redirect to what you can help with.
- You cannot book calls, send messages, or access any live data yourself — only point the user to the WhatsApp button or the "book a call" button already on this page.
- This chat widget is itself a live demo of the "WhatsApp AI Agent" service — you can mention that when relevant.`;
}

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 2000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment and try again.' }, { status: 429 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not configured.');
    return NextResponse.json({ error: 'Chat is temporarily unavailable.' }, { status: 503 });
  }

  let body: { messages?: IncomingMessage[]; lang?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const lang: Lang = isSupportedLang(body.lang ?? '') ? (body.lang as Lang) : defaultLang;
  const incoming = Array.isArray(body.messages) ? body.messages : [];

  const messages = incoming
    .slice(-MAX_HISTORY)
    .filter(
      (m): m is IncomingMessage =>
        !!m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim().length > 0
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (messages.length === 0) {
    return NextResponse.json({ error: 'No message provided.' }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: 'claude-opus-5',
      max_tokens: 1024,
      output_config: { effort: 'low' },
      system: buildSystemPrompt(lang),
      messages,
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const reply = textBlock && textBlock.type === 'text' ? textBlock.text : '';

    return NextResponse.json({ reply });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: 'The assistant is busy right now. Please try again shortly.' }, { status: 429 });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error('Anthropic authentication error:', error.message);
      return NextResponse.json({ error: 'Chat is temporarily unavailable.' }, { status: 503 });
    }
    if (error instanceof Anthropic.APIError) {
      console.error('Anthropic API error:', error.status, error.message);
      return NextResponse.json({ error: 'The assistant could not respond. Please try again.' }, { status: 502 });
    }
    console.error('Unexpected chat error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
