import { createClient } from '@libsql/client';

export const db = createClient({
  url: process.env.TURSO_URL!,
  authToken: process.env.TURSO_TOKEN!,
});

export async function initDb() {
  await db.batch(
    [
      // ── Contacts ────────────────────────────────────────────────────────────
      // One record per unique person (email as key).
      // Automatically upserted whenever a new quote arrives.
      `CREATE TABLE IF NOT EXISTS contacts (
        id               INTEGER PRIMARY KEY AUTOINCREMENT,
        name             TEXT    NOT NULL,
        email            TEXT    UNIQUE NOT NULL,
        phone            TEXT,
        preferred_lang   TEXT    DEFAULT 'it',
        source           TEXT    DEFAULT 'form',
        total_quotes     INTEGER DEFAULT 0,
        notes            TEXT,
        created_at       TEXT    DEFAULT (datetime('now')),
        updated_at       TEXT    DEFAULT (datetime('now')),
        last_contact_at  TEXT    DEFAULT (datetime('now'))
      )`,

      // ── Quotes / Preventivi ─────────────────────────────────────────────────
      // Every form submission. Linked to contacts via contact_id.
      `CREATE TABLE IF NOT EXISTS quotes (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        contact_id  INTEGER REFERENCES contacts(id),
        name        TEXT    NOT NULL,
        email       TEXT    NOT NULL,
        phone       TEXT,
        service     TEXT,
        budget      TEXT,
        message     TEXT    NOT NULL,
        lang        TEXT    DEFAULT 'it',
        status      TEXT    DEFAULT 'new',
        notes       TEXT,
        created_at  TEXT    DEFAULT (datetime('now')),
        updated_at  TEXT    DEFAULT (datetime('now'))
      )`,

      // ── Translations ────────────────────────────────────────────────────────
      // Reserved for future CMS-driven content editing.
      // Keys use dot notation: section.key (e.g. 'hero.tag', 'nav.contact').
      `CREATE TABLE IF NOT EXISTS translations (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        lang       TEXT NOT NULL,
        section    TEXT NOT NULL,
        key        TEXT NOT NULL,
        value      TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        UNIQUE(lang, section, key)
      )`,
    ],
    'write'
  );
}
