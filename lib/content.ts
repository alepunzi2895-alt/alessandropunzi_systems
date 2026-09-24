// Copy that is still a placeholder (e.g. "[[TODO: ...]]") or empty must never reach the page.
export function isRenderable(text: string | null | undefined): text is string {
  return !!text && text.trim().length > 0 && !text.includes('[[TODO');
}
