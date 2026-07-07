/**
 * The store's WhatsApp number in international format, digits only.
 * All "Order on WhatsApp" actions send the order to this number.
 */
export const WHATSAPP_NUMBER = "254700456789"; // TODO: replace with your number

/* Site identity — used for canonical URLs, Open Graph, and structured data.
   Set SITE_URL to the real production domain before launch. */
export const SITE_URL = "https://kickdrop.ke";
export const SITE_NAME = "KICKDROP KE";
export const SITE_TAGLINE =
  "Authentic sneakers in Nairobi, Kenya — Nike, Jordan, Adidas, New Balance & more, verified and delivered.";
export const BUSINESS = {
  legalName: "KICKDROP KE",
  street: "123 Kimathi Street",
  city: "Nairobi",
  country: "KE",
  phone: "+254700456789",
  email: "hello@kickdrop.ke",
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { days: ["Saturday"], opens: "10:00", closes: "16:00" },
  ],
};
