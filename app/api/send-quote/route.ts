import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, service, budget, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 });
  }

  // TODO: integrare invio email (es. Resend, Nodemailer, SendGrid)
  console.log('Nuova richiesta preventivo:', { name, email, service, budget, message });

  return NextResponse.json({ ok: true });
}
