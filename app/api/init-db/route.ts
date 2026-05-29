import { NextRequest, NextResponse } from 'next/server';
import { initDb } from '@/lib/db';

// Protected by a secret so it can only be triggered intentionally.
// Call once: POST /api/init-db  { "secret": "<INIT_SECRET>" }
export async function POST(req: NextRequest) {
  const { secret } = await req.json();

  if (secret !== process.env.INIT_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await initDb();
  return NextResponse.json({ ok: true, message: 'Database initialized' });
}
