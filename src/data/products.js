const img = (file) => `/images/products/${file}.webp`;

export const collections = [
  {
    id: "runway",
    name: "The Runway Series",
    tagline: "Statement silhouettes for the front row",
    count: 12,
    image: img("jordan-1-retro-high-og"),
    alt: "Jordan 1 Retro High OG in yellow ochre and black",
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
    image: img("adidas-ultraboost-light"),
    alt: "Adidas Ultraboost Light in triple black",
  },
];

export const products = [
  {
    id: "nike-air-force-1-07",
    name: "Nike Air Force 1 '07",
    category: "Lifestyle",
    price: 14500,
    badge: "Icon",
  },
  {
    id: "nike-dunk-low-panda",
    name: "Nike Dunk Low Panda",
    category: "Lifestyle",
    price: 16800,
    badge: "Best Seller",
  },
  {
    id: "nike-air-max-90",
    name: "Nike Air Max 90",
    category: "Running Heritage",
    price: 18500,
  },
  {
    id: "nike-air-max-270",
    name: "Nike Air Max 270",
    category: "Lifestyle Running",
    price: 21000,
  },
  {
    id: "nike-zoom-vomero-5",
    name: "Nike Zoom Vomero 5",
    category: "Retro Running",
    price: 24500,
    badge: "Trending",
  },
  {
    id: "adidas-samba-og",
    name: "Adidas Samba OG",
    category: "Terrace",
    price: 13500,
    badge: "Best Seller",
  },
  {
    id: "adidas-gazelle-indoor",
    name: "Adidas Gazelle Indoor",
    category: "Terrace",
    price: 14000,
  },
  {
    id: "adidas-campus-00s",
    name: "Adidas Campus 00s",
    category: "Skate Heritage",
    price: 15500,
  },
  {
    id: "adidas-ultraboost-light",
    name: "Adidas Ultraboost Light",
    category: "Performance Running",
    price: 26000,
  },
  {
    id: "new-balance-550",
    name: "New Balance 550",
    category: "Retro Basketball",
    price: 17500,
    badge: "Best Seller",
  },
  {
    id: "new-balance-9060",
    name: "New Balance 9060",
    category: "Lifestyle Running",
    price: 22500,
  },
  {
    id: "new-balance-2002r",
    name: "New Balance 2002R",
    category: "Retro Running",
    price: 19800,
  },
  {
    id: "asics-gel-kayano-14",
    name: "ASICS GEL-Kayano 14",
    category: "Retro Running",
    price: 23000,
    badge: "Trending",
  },
  {
    id: "asics-gel-1130",
    name: "ASICS GEL-1130",
    category: "Retro Running",
    price: 15800,
  },
  {
    id: "puma-palermo",
    name: "PUMA Palermo",
    category: "Terrace",
    price: 12500,
  },
  {
    id: "puma-suede-classic-xxi",
    name: "PUMA Suede Classic XXI",
    category: "Lifestyle",
    price: 11000,
  },
  {
    id: "converse-chuck-taylor-high",
    name: "Converse Chuck Taylor All Star High Top",
    category: "Canvas Classic",
    price: 8500,
  },
  {
    id: "vans-knu-skool",
    name: "Vans Knu Skool",
    category: "Skate",
    price: 10500,
    badge: "New",
  },
  {
    id: "jordan-1-retro-high-og",
    name: "Jordan 1 Retro High OG",
    category: "Retro Basketball",
    price: 28500,
    badge: "Coveted",
  },
  {
    id: "on-cloud-5",
    name: "On Cloud 5",
    category: "Performance Running",
    price: 25000,
  },
].map((p) => ({ ...p, image: img(p.id), alt: `${p.name}, side profile` }));

export const showcase = {
  id: "jordan-1-retro-high-og",
  name: "Jordan 1 Retro High OG",
  edition: "Icon Series — Yellow Ochre",
  description:
    "The silhouette that started sneaker culture, in a colorway that ends conversations. Full-grain leather, Nike Air cushioning, and a presence that needs no introduction.",
  price: 28500,
  image: img("jordan-1-retro-high-og"),
  alt: "Jordan 1 Retro High OG in yellow ochre, black and sail",
  details: [
    "Full-grain leather upper",
    "Encapsulated Nike Air cushioning",
    "OG high-cut collar with wings logo",
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
