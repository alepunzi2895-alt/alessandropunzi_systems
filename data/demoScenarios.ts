// Fictional businesses for the on-site agent demo (#demo). None of these exist:
// names, prices and availability are invented and shown as "demo business".
// UI copy (tab labels, greetings, quick replies) lives in i18n under `demo`.

export const DEMO_SCENARIO_IDS = ['properties', 'support', 'sales'] as const;
export type DemoScenarioId = (typeof DEMO_SCENARIO_IDS)[number];

export function isDemoScenarioId(value: unknown): value is DemoScenarioId {
  return typeof value === 'string' && (DEMO_SCENARIO_IDS as readonly string[]).includes(value);
}

export const DEMO_BUSINESS_NAMES: Record<DemoScenarioId, string> = {
  properties: 'Meridian Stays',
  support: 'Voltara Energy',
  sales: 'Costa Alta Properties',
};

// Facts the assistant may use. Anything not listed here is unknown to it.
export const DEMO_BUSINESS_FACTS: Record<DemoScenarioId, string> = {
  properties: `Business: Meridian Stays, operator of 42 serviced apartments and 6 villas in Milan, Lisbon, Barcelona, Dubai and Ibiza, managed on behalf of private owners from one central control room.
Check-in: self check-in from 15:00. The door code and the digital welcome guide (address, Wi-Fi, house rules) are sent on WhatsApp 24 hours before arrival, after the guest's ID has been uploaded through the link in the booking confirmation. If the code has not arrived, the assistant asks for the booking reference and re-sends it after checking.
Check-out 11:00. Early check-in from 12:00 €30, late check-out until 14:00 €40, both subject to availability.
Issues during the stay: the assistant opens a maintenance ticket (asks booking reference, apartment, short description, photo if useful). Local team on site within 2 hours in Milan, Lisbon, Barcelona and Dubai, within 4 hours for the Ibiza villas. Urgent issues (water leak, no power, locked out, safety) are escalated immediately to the on-call manager, who calls the guest within 15 minutes.
Minimum stay: 2 nights for apartments, 5 nights for villas. Stays of 28 nights or more: 15% discount, cleaning every week included. Companies can open a corporate account with monthly invoicing.
Current availability: Lisbon, two 2-bedroom apartments in Alfama free next weekend (€180/night). Dubai Marina, 1-bedroom apartment free for the whole of next month (€3,900 for 30 nights, weekly cleaning included). Barcelona, Eixample 3-bedroom free from the 20th (€240/night). Milan fully booked during Design Week in April.
Extra services: airport transfer (Milan €70, Lisbon €45, Barcelona €55, Dubai €60, Ibiza €90), extra cleaning €45 apartments / €90 villas, baby cot free on request. Pets allowed in selected apartments, €50 per stay.
Owners: property owners see occupancy, revenue, costs and open tickets in their owner dashboard. The assistant never shares financial or other owners' data in chat and redirects owners to the dashboard or their account manager.`,

  support: `Business: Voltara Energy, energy company serving about 60,000 homes and businesses in Italy and Spain: electricity and gas supply, solar panels with batteries, EV chargers.
Human support: Monday to Friday 8:00–20:00. The assistant answers 24/7 and opens tickets outside those hours.
Identification: for account-specific information the assistant asks for the order or contract number plus the postal code. Never ask for card numbers, passwords or full ID numbers.
Sample orders (fictional): VT-10482 solar + battery installation scheduled on 14 October, morning slot 8:00–12:00, the technician calls the day before. VT-10517 waiting for grid operator approval, usually 3–5 weeks, no action needed from the customer. VT-10533 installed, activation of the energy meter expected within 10 working days. Any other number: the assistant cannot find it and offers to open a ticket.
Solar system not producing: first ask the customer to check the inverter display for an error code and whether the solar breaker in the electrical panel is on. If it is still not working, open a technical ticket. Customers with a maintenance plan get a technician visit within 48 hours, others within 5 working days (visit €90).
Bills: issued monthly, payment by direct debit or card. Late payment: 15-day grace period before any reminder fee. Billing changes (address, IBAN, holder) require a ticket and are confirmed by email.
New solar quote: the assistant collects address, annual electricity consumption (kWh, found on the bill), roof type and whether a battery or EV charger is wanted; an energy consultant calls back within 1 working day with a free inspection date.`,

  sales: `Business: Costa Alta Properties, international real estate agency selling premium homes to international buyers in Ibiza, Marbella, Lisbon and Dubai. Advisors speak Italian, English, Spanish, German and French.
Current listings (fictional):
- Ibiza: 4-bedroom villa in Santa Gertrudis with sea view and pool, 420 m² on 1.2 ha, €3,900,000. 3-bedroom apartment in Marina Botafoch, sea front, €1,650,000.
- Marbella: 5-bedroom villa in Nueva Andalucía, golf view, €4,500,000. 2-bedroom apartment in Puerto Banús, €890,000.
- Lisbon: 3-bedroom penthouse in Príncipe Real with 80 m² terrace, €2,200,000.
- Dubai: 2-bedroom apartment in Dubai Marina, about €950,000 (AED 3.8M), currently rented with 6.5% gross yield. Off-plan 4-bedroom villa on Palm Jebel Ali from about €2,250,000 (AED 9M), handover 2027, payment plan 60% during construction and 40% on handover.
How the agency works: the assistant qualifies the buyer (area, budget, bedrooms, timeline, living or investment, cash or mortgage) and then books a viewing with the local advisor, in person Monday to Saturday or by video call any weekday. A curated selection with floor plans is sent by email after the first call.
Partners: independent lawyers, tax advisors and mortgage brokers in every country, plus rental and property management after purchase.
Rules: the assistant does not give legal, tax or investment advice and does not negotiate prices: it passes these topics to the advisor. Purchase costs and taxes differ by country and are explained by the advisor.`,
};

// Per-session limits, enforced on the client and re-checked by /api/demo-chat.
export const DEMO_MAX_USER_MESSAGES = 12;
export const DEMO_MAX_INPUT_CHARS = 500;
