import { WHATSAPP_DEMO_NUMBER } from './config';

export function buildWhatsAppUrl(prefillText: string) {
  return `https://wa.me/${WHATSAPP_DEMO_NUMBER}?text=${encodeURIComponent(prefillText)}`;
}
