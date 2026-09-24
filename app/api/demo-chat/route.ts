import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { isSupportedLang, defaultLang, type Lang } from '@/i18n';
import {
  DEMO_BUSINESS_FACTS,
  DEMO_MAX_INPUT_CHARS,
  DEMO_MAX_USER_MESSAGES,
  isDemoScenarioId,
  type DemoScenarioId,
} from '@/data/demoScenarios';

// Simple in-memory sliding-window rate limit, per IP.
// NOTE: resets on cold start and is per serverless instance — good enough to
// stop casual abuse of the demo, not a durable guarantee.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

const LANGUAGE_NAMES: Record<Lang, string> = { it: 'Italian', en: 'English', es: 'Spanish' };

function buildSystemPrompt(scenario: DemoScenarioId, lang: Lang): string {
  return `You are the WhatsApp assistant of the business described below, answering its customers. You speak on behalf of the business, in first person plural ("we").

${DEMO_BUSINESS_FACTS[scenario]}

How to reply:
- Maximum 3 short sentences. Plain text, no markdown, no lists, at most one emoji.
- Reply in the language the customer writes in. If unclear, use ${LANGUAGE_NAMES[lang]}.
- Warm, professional tone, like the best member of the customer team.
- Use only the facts above. If something is not covered, say you will check with the team and offer a concrete next step. Never invent prices, availability, orders, services or policies.
- Whenever it makes sense, move towards a concrete action: a booking, a ticket, a viewing, a callback. Ask for the one missing detail you need, then confirm the next step.
- If the customer provides all the details needed, confirm the request as received and say the team will follow up on WhatsApp.
- Stay in character. If asked about unrelated topics, politely bring the conversation back to the business. If asked whether you are an AI, say yes, you are the business's AI assistant.`;
}

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not configured.');
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }

  let body: { scenario?: unknown; messages?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  if (!isDemoScenarioId(body.scenario)) {
    return NextResponse.json({ error: 'invalid_scenario' }, { status: 400 });
  }
  const scenario = body.scenario;
  const lang: Lang = typeof body.lang === 'string' && isSupportedLang(body.lang) ? body.lang : defaultLang;

  const incoming = Array.isArray(body.messages) ? (body.messages as unknown[]) : [];
  const messages = incoming.filter(
    (m): m is IncomingMessage =>
      !!m &&
      typeof m === 'object' &&
      ((m as IncomingMessage).role === 'user' || (m as IncomingMessage).role === 'assistant') &&
      typeof (m as IncomingMessage).content === 'string' &&
      (m as IncomingMessage).content.trim().length > 0
  );

  const userMessages = messages.filter((m) => m.role === 'user');
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'no_message' }, { status: 400 });
  }
  if (userMessages.length > DEMO_MAX_USER_MESSAGES) {
    return NextResponse.json({ error: 'limit_reached' }, { status: 429 });
  }
  if (userMessages.some((m) => m.content.length > DEMO_MAX_INPUT_CHARS)) {
    return NextResponse.json({ error: 'message_too_long' }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: buildSystemPrompt(scenario, lang),
      messages: messages.map((m) => ({ role: m.role, content: m.content.slice(0, 2000) })),
    });

    const reply = response.content
      .filter((b) => b.type === 'text')
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join('')
      .trim();

    if (!reply) {
      return NextResponse.json({ error: 'empty_reply' }, { status: 502 });
    }
    return NextResponse.json({ reply });
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error('Anthropic API error (demo-chat):', error.status, error.message);
      return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
    }
    console.error('Unexpected demo-chat error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
