import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, prefix, phone, service, budget, message, lang } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 });
  }

  const fullPhone = phone ? `${prefix ?? ''} ${phone}`.trim() : null;

  // ── 1. Upsert contact ──────────────────────────────────────────────────────
  const existingContact = await db.execute({
    sql: 'SELECT id, total_quotes FROM contacts WHERE email = ?',
    args: [email],
  });

  let contactId: number;

  if (existingContact.rows.length > 0) {
    const row = existingContact.rows[0];
    contactId = row.id as number;
    await db.execute({
      sql: `UPDATE contacts
            SET name = ?, phone = COALESCE(?, phone), preferred_lang = ?,
                total_quotes = total_quotes + 1,
                updated_at = datetime('now'), last_contact_at = datetime('now')
            WHERE id = ?`,
      args: [name, fullPhone, lang ?? 'it', contactId],
    });
  } else {
    const res = await db.execute({
      sql: `INSERT INTO contacts (name, email, phone, preferred_lang, source, total_quotes)
            VALUES (?, ?, ?, ?, 'form', 1)`,
      args: [name, email, fullPhone, lang ?? 'it'],
    });
    contactId = Number(res.lastInsertRowid);
  }

  // ── 2. Insert quote ────────────────────────────────────────────────────────
  await db.execute({
    sql: `INSERT INTO quotes (contact_id, name, email, phone, service, budget, message, lang)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [contactId, name, email, fullPhone, service ?? null, budget ?? null, message, lang ?? 'it'],
  });

  // ── 3. Send email via Resend ───────────────────────────────────────────────
  const { error } = await resend.emails.send({
    from: 'AP Systems <onboarding@resend.dev>',
    to: 'ale.punzi2895@gmail.com',
    replyTo: email,
    subject: `Nuova richiesta preventivo — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#e5e7eb;padding:32px;border-radius:12px;border:1px solid rgba(34,197,94,0.2);">
        <h2 style="color:#22c55e;margin-top:0;">Nuova richiesta preventivo</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;color:#9ca3af;width:140px;font-size:14px;">Nome</td><td style="padding:10px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:10px 0;color:#9ca3af;font-size:14px;">Email</td><td style="padding:10px 0;"><a href="mailto:${email}" style="color:#22c55e;">${email}</a></td></tr>
          <tr><td style="padding:10px 0;color:#9ca3af;font-size:14px;">Telefono</td><td style="padding:10px 0;">${fullPhone ? `<a href="tel:${fullPhone.replace(/\s/g,'')}" style="color:#22c55e;">${fullPhone}</a>` : '—'}</td></tr>
          <tr><td style="padding:10px 0;color:#9ca3af;font-size:14px;">Servizio</td><td style="padding:10px 0;">${service || '—'}</td></tr>
          <tr><td style="padding:10px 0;color:#9ca3af;font-size:14px;">Budget</td><td style="padding:10px 0;">${budget || '—'}</td></tr>
          <tr><td style="padding:10px 0;color:#9ca3af;font-size:14px;">Lingua</td><td style="padding:10px 0;">${(lang ?? 'it').toUpperCase()}</td></tr>
        </table>
        <div style="margin-top:24px;padding:20px;background:rgba(34,197,94,0.05);border-left:3px solid #22c55e;border-radius:4px;">
          <p style="color:#9ca3af;font-size:14px;margin:0 0 8px;">Messaggio</p>
          <p style="margin:0;line-height:1.6;">${message.replace(/\n/g,'<br/>')}</p>
        </div>
        <p style="margin-top:32px;font-size:12px;color:#4b5563;text-align:center;">AP Systems · ale.punzi2895@gmail.com</p>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    // Still return ok — data is already saved in DB
  }

  return NextResponse.json({ ok: true });
}
