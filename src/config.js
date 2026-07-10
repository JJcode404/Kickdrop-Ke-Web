/**
 * The store's WhatsApp number in international format, digits only.
 * All "Order on WhatsApp" actions send the order to this number.
 */
export const WHATSAPP_NUMBER = "254715369733";

/* Contact number, in one place so it never drifts across the site.
   PHONE_TEL is the `tel:` href (tapping it starts a call); PHONE_DISPLAY is
   the human-readable form shown to visitors. */
export const PHONE_TEL = "+254715369733";
export const PHONE_DISPLAY = "+ (254) 715 369 733";

/* Social profiles — used in the footer and in structured-data `sameAs`. */
export const SOCIALS = {
  instagram: "https://www.instagram.com/kickdrop_254?igsh=Zjg5aDkxbGVzMm5s",
  tiktok: "https://www.tiktok.com/@kickdrop_ke?_r=1&_t=ZS-97vYnAiz4k9",
};

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
  phone: PHONE_TEL,
  email: "hello@kickdrop.ke",
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { days: ["Saturday"], opens: "10:00", closes: "16:00" },
  ],
};
