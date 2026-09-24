'use client';

import { Send } from 'lucide-react';
import type { Dictionary } from '@/i18n';
import { WHATSAPP_OWNER_NUMBER, BOOKING_CALL_URL } from '@/lib/config';

export interface ContactFormData {
  name: string;
  email: string;
  prefix: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

const budgetOptions = [
  { value: '500-2000', label: '€ 500 – € 2.000' },
  { value: '2000-5000', label: '€ 2.000 – € 5.000' },
  { value: '5000-10000', label: '€ 5.000 – € 10.000' },
  { value: '10000+', label: '€ 10.000+' },
];

export default function ContactForm({
  dict,
  formData,
  setFormData,
  submitted,
  onSubmit,
}: {
  dict: Dictionary;
  formData: ContactFormData;
  setFormData: (updater: (data: ContactFormData) => ContactFormData) => void;
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <section
      id="contact"
      className="py-20 px-6 border-t border-green-600/20 bg-gradient-to-b from-transparent via-green-950/5 to-transparent"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <h2 className="section-title text-5xl font-bold mb-4">{dict.contact.title}</h2>
          <p className="text-gray-300 mt-6">{dict.contact.subtitle}</p>
        </div>

        {/* Quick contact */}
        <div className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-widest text-gray-400 mono">{dict.contact.orLabel}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_OWNER_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn flex items-center gap-3 px-5 py-3 rounded-lg border border-[#25D366]/40 bg-[#25D366]/5 text-[#25D366] hover:border-[#25D366]/80 hover:bg-[#25D366]/10 flex-1"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="font-medium text-sm">{dict.contact.whatsapp}</span>
            </a>

            <a
              href={BOOKING_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center justify-center gap-3 px-5 py-3 rounded-lg border border-green-600/50 text-green-500 hover:text-white hover:bg-green-600/10 flex-1"
            >
              <span className="font-medium text-sm">{dict.contact.bookCall}</span>
            </a>
          </div>
          <p className="text-xs text-gray-400 mono">{dict.contact.responsePromise}</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6 bg-green-950/5 border border-green-600/20 p-8 rounded-lg">
          <div>
            <label htmlFor="cf-name" className="block text-sm font-semibold text-gray-200 mb-2">{dict.contact.name}</label>
            <input
              id="cf-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white placeholder-gray-600"
              placeholder={dict.contact.namePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="cf-email" className="block text-sm font-semibold text-gray-200 mb-2">{dict.contact.email}</label>
            <input
              id="cf-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white placeholder-gray-600"
              placeholder={dict.contact.emailPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="cf-phone" className="block text-sm font-semibold text-gray-200 mb-2">{dict.contact.phone}</label>
            <div className="flex gap-2">
              <select
                id="cf-prefix"
                aria-label="Phone prefix"
                value={formData.prefix}
                onChange={(e) => setFormData((f) => ({ ...f, prefix: e.target.value }))}
                className="w-20 px-2 py-3 bg-black border border-green-600/30 rounded text-white shrink-0 text-sm"
              >
                <option value="+39">+39</option>
                <option value="+34">+34</option>
                <option value="+44">+44</option>
                <option value="+33">+33</option>
                <option value="+49">+49</option>
                <option value="+1">+1</option>
                <option value="+31">+31</option>
                <option value="+41">+41</option>
                <option value="+43">+43</option>
                <option value="+351">+351</option>
              </select>
              <input
                id="cf-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                className="flex-1 min-w-0 px-3 py-3 bg-black border border-green-600/30 rounded text-white placeholder-gray-600"
                placeholder={dict.contact.phonePlaceholder}
              />
            </div>
          </div>
          <div>
            <label htmlFor="cf-service" className="block text-sm font-semibold text-gray-200 mb-2">{dict.contact.service}</label>
            <select
              id="cf-service"
              value={formData.service}
              onChange={(e) => setFormData((f) => ({ ...f, service: e.target.value }))}
              className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white"
            >
              <option value="">{dict.contact.servicePlaceholder}</option>
              {dict.contact.serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cf-budget" className="block text-sm font-semibold text-gray-200 mb-2">{dict.contact.budget}</label>
            <select
              id="cf-budget"
              value={formData.budget}
              onChange={(e) => setFormData((f) => ({ ...f, budget: e.target.value }))}
              className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white"
            >
              <option value="">{dict.contact.budgetPlaceholder}</option>
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cf-message" className="block text-sm font-semibold text-gray-200 mb-2">{dict.contact.message}</label>
            <textarea
              id="cf-message"
              value={formData.message}
              onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
              required
              rows={4}
              className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white placeholder-gray-600 resize-none"
              placeholder={dict.contact.messagePlaceholder}
            />
          </div>
          <button
            type="submit"
            className="btn-submit w-full py-3 bg-green-600 hover:bg-green-500 text-black font-semibold rounded flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {dict.contact.submit}
          </button>
          {submitted && (
            <div className="p-4 bg-green-950/30 border border-green-600/50 rounded text-green-400 text-center animate-fade-in">
              {dict.contact.success}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
