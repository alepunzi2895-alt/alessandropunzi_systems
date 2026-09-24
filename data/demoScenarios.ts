// Fictional businesses for the on-site agent demo (#demo). None of these exist:
// names, prices and availability are invented and shown as "demo business".
// UI copy (tab labels, greetings, quick replies) lives in i18n under `demo`.

export const DEMO_SCENARIO_IDS = ['restaurant', 'villa', 'club'] as const;
export type DemoScenarioId = (typeof DEMO_SCENARIO_IDS)[number];

export function isDemoScenarioId(value: unknown): value is DemoScenarioId {
  return typeof value === 'string' && (DEMO_SCENARIO_IDS as readonly string[]).includes(value);
}

export const DEMO_BUSINESS_NAMES: Record<DemoScenarioId, string> = {
  restaurant: 'Can Olivera',
  villa: 'Villa Sa Talaia',
  club: 'Nautilo Club',
};

// Facts the assistant may use. Anything not listed here is unknown to it.
export const DEMO_BUSINESS_FACTS: Record<DemoScenarioId, string> = {
  restaurant: `Business: Can Olivera, Mediterranean restaurant with a garden terrace in Santa Eulària des Riu, Ibiza.
Opening hours: dinner Tuesday to Sunday 19:30–23:30 (last seating 22:30). Lunch only Saturday and Sunday 13:00–16:00. Closed on Mondays.
Tonight's availability: tables for up to 4 people at 20:00 and 22:00; table for up to 6 people at 21:30. Terrace fully booked tonight, indoor tables only.
Groups larger than 8 people: private garden area, requires a €20/person deposit.
Menu: à la carte, starters €12–18, mains €22–34. Tasting menu (6 courses) €65, wine pairing +€35.
Vegetarian: dedicated vegetarian section (4 starters, 3 mains) and a vegetarian tasting menu €58. Vegan options on request. Gluten-free pasta available.
Signature dishes: rice with red prawns from Formentera, slow-cooked lamb, local fish of the day.
Other: free parking for guests, dogs allowed on the terrace, children's menu €15.
Booking: the assistant can take a booking by collecting name, number of people, time and a phone number; a confirmation is then sent on WhatsApp.`,

  villa: `Business: Villa Sa Talaia, private holiday villa near Sant Josep de sa Talaia, Ibiza, 10 minutes by car from Cala Tarida.
Capacity: 5 bedrooms, 5 bathrooms, up to 10 guests (no extra beds).
Features: 12 m infinity pool, sea and sunset view, outdoor kitchen with barbecue, air conditioning, Wi-Fi, private parking.
Prices per night: April–May and October €1,100; June and September €1,700; July–August €2,400. Cleaning fee €350 per stay. Refundable security deposit €3,000.
Minimum stay: 7 nights July–August (Saturday to Saturday), 4 nights in the other months.
Availability: July and August fully booked. Free in September from the 13th to the 30th. October fully free. June free only 1–12.
Check-in 16:00, check-out 11:00.
Extra services on request: airport transfer €90 each way (up to 7 people), private chef from €120/person per dinner, daily cleaning €60/day, boat day trips from €900.
Rules: no parties or events, pets not allowed, tourist licence available.
Booking: the assistant can place a booking request by collecting dates, number of guests, name and email; the owner confirms within 24 hours and a 30% deposit secures the dates.`,

  club: `Business: Nautilo Club, nightclub in Platja d'en Bossa, Ibiza. Season from May to mid-October.
Opening: Thursday to Sunday, doors 23:30, closing 06:00. Closed Monday to Wednesday.
This week's line-up (fictional artists): Thursday "Deep Tides" with Mira Solen; Friday "Nautilo Presents" with Kaspar Veld and Lune Ortega; Saturday "Sunset to Sunrise" with Teo Marlow (extended 6-hour set); Sunday "Latin Nights" with DJ Coralía.
Tickets: online from €40 (Thursday and Sunday) and €55 (Friday and Saturday). At the door +€15, subject to availability.
Guest list: free entry before 00:30 on Thursday and Sunday only, name must be sent by 20:00 the same day.
VIP tables: from €800 for up to 6 people (Thursday/Sunday) and from €1,500 for up to 8 people (Friday/Saturday), amount is minimum spend on drinks. Bottle service included.
Entry: 18+, ID required. Smart casual dress code, no beachwear.
Getting there: free shuttle bus from Ibiza Town port every 30 minutes from 23:00.
Booking: the assistant can reserve tickets, guest list or a VIP table by collecting night, number of people and a name; a payment link is then sent on WhatsApp.`,
};

// Per-session limits, enforced on the client and re-checked by /api/demo-chat.
export const DEMO_MAX_USER_MESSAGES = 12;
export const DEMO_MAX_INPUT_CHARS = 500;
