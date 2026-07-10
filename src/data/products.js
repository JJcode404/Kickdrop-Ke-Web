const img = (file) => `/images/products/${file}.webp`;

export const collections = [
  {
    id: "runway",
    name: "The Runway Series",
    tagline: "Statement silhouettes for the front row",
    count: 12,
    image: img("jordan-1-low-travis-scott"),
    alt: "Jordan 1 Low OG Travis Scott in black phantom",
  },
  {
    id: "heritage",
    name: "Heritage Court",
    tagline: "Timeless terrace classics, reimagined",
    count: 8,
    image: img("adidas-samba-og"),
    alt: "Adidas Samba OG in cloud white with black stripes",
  },
  {
    id: "midnight",
    name: "Midnight Edition",
    tagline: "All black. All intent.",
    count: 6,
    image: img("nike-air-force-1-black"),
    alt: "Nike Air Force 1 '07 in triple black",
  },
];

export const products = [
  {
    id: "nike-air-force-1-07",
    name: "Nike Air Force 1 '07",
    category: "Lifestyle",
    price: 2500,
    badge: "Icon",
  },
  {
    id: "nike-dunk-low-panda",
    name: "Nike Dunk Low Panda",
    category: "Lifestyle",
    price: 3800,
    badge: "Best Seller",
  },
  {
    id: "adidas-samba-og",
    name: "Adidas Samba OG",
    category: "Terrace",
    price: 3800,
    badge: "Best Seller",
  },
  {
    id: "adidas-gazelle-indoor",
    name: "Adidas Gazelle Indoor",
    category: "Terrace",
    price: 4000,
  },
  {
    id: "adidas-campus-00s",
    name: "Adidas Campus 00s",
    category: "Skate Heritage",
    price: 3800,
  },
  {
    id: "new-balance-9060",
    name: "New Balance 9060",
    category: "Lifestyle Running",
    price: 4000,
  },
  {
    id: "asics-gel-kayano-14",
    name: "ASICS GEL-Kayano 14",
    category: "Retro Running",
    price: 4000,
    badge: "Trending",
  },
  {
    id: "asics-gel-1130",
    name: "ASICS GEL-1130",
    category: "Retro Running",
    price: 4000,
  },
  {
    id: "vans-knu-skool",
    name: "Vans Knu Skool",
    category: "Skate",
    price: 4000,
    badge: "New",
  },
  {
    id: "nike-air-force-1-black",
    name: "Nike Air Force 1 '07 Black",
    category: "Lifestyle",
    price: 2500,
  },
  {
    id: "asics-gel-kayano-14-arctic-sky",
    name: "ASICS GEL-Kayano 14 “Arctic Sky”",
    category: "Retro Running",
    price: 4000,
    badge: "New",
  },
  {
    id: "asics-gel-kayano-14-pink-glow",
    name: "ASICS GEL-Kayano 14 Pink Glow",
    category: "Retro Running",
    price: 4000,
    badge: "New",
  },
  {
    id: "new-balance-530-pink",
    name: "New Balance 530 Pink",
    category: "Retro Running",
    price: 4000,
  },
  {
    id: "new-balance-530",
    name: "New Balance 530",
    category: "Retro Running",
    price: 4000,
  },
  {
    id: "new-balance-1000-pink",
    name: "New Balance 1000 Real Pink",
    category: "Retro Running",
    price: 4000,
    badge: "New",
  },
  {
    id: "new-balance-9060-shadow-grey",
    name: "New Balance 9060 Shadow Grey",
    category: "Lifestyle Running",
    price: 4000,
  },
  {
    id: "jordan-1-low-travis-scott",
    name: "Jordan 1 Low OG Travis Scott Black Phantom",
    category: "Retro Basketball",
    price: 4500,
    badge: "Coveted",
  },
  {
    id: "jordan-4-white-oreo",
    name: "Air Jordan 4 Retro “White Oreo”",
    category: "Retro Basketball",
    price: 4500,
  },
  {
    id: "puma-speedcat-og-red",
    name: "PUMA Speedcat OG",
    category: "Motorsport",
    price: 4200,
    badge: "New",
  },
].map((p) => ({ ...p, image: img(p.id), alt: `${p.name}, side profile` }));

export const showcase = {
  id: "jordan-1-low-travis-scott",
  name: "Jordan 1 Low OG Travis Scott",
  edition: "Coveted Series — Black Phantom",
  description:
    "The most sought-after collaboration in sneakers, in its stealthiest form. Premium leather, the signature reversed Swoosh, and Cactus Jack detailing — a grail that speaks for itself.",
  price: 4500,
  image: img("jordan-1-low-travis-scott"),
  alt: "Jordan 1 Low OG Travis Scott in black phantom with reversed Swoosh",
  details: [
    "Premium leather upper",
    "Signature reversed Swoosh",
    "Cactus Jack branding",
    "StockX-verified authentic pairs",
  ],
};

export const benefits = [
  {
    id: "shipping",
    title: "Complimentary Delivery",
    body: "Free express shipping across Kenya, with worldwide delivery in 3–5 days.",
  },
  {
    id: "returns",
    title: "30-Day Returns",
    body: "Change your mind, not your standards. Effortless returns, no questions.",
  },
  {
    id: "craft",
    title: "Curated Selection",
    body: "Every silhouette is hand-picked — only icons and future classics make the cut.",
  },
  {
    id: "authenticity",
    title: "Certified Authentic",
    body: "Each pair is verified before it ships, with lifetime authenticity support.",
  },
];

export const reviews = [
  {
    id: 1,
    quote:
      "The craftsmanship is on another level. I've owned designer pairs from Milan and Paris — these hold their own effortlessly.",
    name: "Wanjiru K.",
    title: "Creative Director, Nairobi",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Ordered on Tuesday, wore them to a gallery opening on Friday. The packaging alone felt like a gift to myself.",
    name: "David O.",
    title: "Architect",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Minimal, precise, quietly luxurious. KICKDROP is the only store I've trusted twice in one month — once for me, once as a gift.",
    name: "Amara N.",
    title: "Fashion Editor",
    rating: 5,
  },
];

export const formatPrice = (amount) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
