// Every fact on the page comes from one of these, checked on 2 Nov 2026:
//  - eros-cafe.com: home (featured menu), /shop/ and its product pages, /about-us-3/, /franchise/,
//    /our-branches/ and /contact-us/
//  - the public Google listing "Eros cafe", 51 Wigan Ln (rating, review count, the five reviews quoted)
// Where the site's own text is cut off mid-word, only the complete part is used.

export type Item = { id: string; name: string; desc: string; img?: string; tag?: string };
export type Category = { id: string; label: string; blurb: string; items: Item[] };

const P = (f: string) => `/img/p/${f}.webp`;

export const MENU: Category[] = [
  {
    id: "cookie-dough",
    label: "Hot cookie dough",
    blurb: "Made fresh in-house and served warm, perfect with vanilla gelato or hot custard.",
    items: [
      { id: "eros-special-cookie-dough", name: "Eros Special", tag: "Eros favourite", img: P("eros-special-cookie-dough"), desc: "Decadent cookie dough with melted Ferrero Rocher, topped with rich Nutella and whole Ferrero Rocher." },
      { id: "dubai-classic-cookie-dough", name: "Dubai Classic", img: P("dubai-classic-cookie-dough"), desc: "A Middle Eastern twist: pistachio kunafa and premium pistachio sauce on warm dough." },
      { id: "biscoff-dream-cookie-dough", name: "Biscoff Dream", tag: "Eros favourite", img: P("biscoff-dream-cookie-dough"), desc: "Caramel heaven: warm cookie dough with Biscoff sauce and crunchy Lotus biscuit crumbs." },
      { id: "bueno-bliss-cookie-dough", name: "Bueno Bliss", img: P("bueno-bliss-cookie-dough"), desc: "Warm, gooey cookie dough with Kinder Bueno pieces and premium Kinder sauce." },
      { id: "oreo-delicious-cookie-dough", name: "Oreo-Delicious", tag: "Eros favourite", img: P("oreo-delicious-cookie-dough"), desc: "Warm cookie dough meets crunchy Oreo bits, all drizzled in chocolate sauce." },
      { id: "nutella-spread-cookie-dough", name: "Nutella Spread", img: P("nutella-spread-cookie-dough"), desc: "Soft cookie dough drizzled with Nutella. Add banana or strawberry for an extra treat." },
    ],
  },
  {
    id: "crepes",
    label: "Crêpes",
    blurb: "Thin, golden crêpes filled with rich chocolate, pistachio and premium toppings, crafted fresh every day.",
    items: [
      { id: "dubai-delight-crepe", name: "Dubai Delight", img: P("dubai-delight-crepe"), desc: "Golden crêpe filled with pistachio kunafa and rich pistachio sauce: a luxurious Middle Eastern twist." },
      { id: "eros-special-crepe", name: "Eros Special", img: P("eros-special-crepe"), desc: "A premium crêpe with melted Nutella, Ferrero Rocher and indulgent chocolate layers." },
      { id: "nutella-embrace-crepe", name: "Nutella Embrace", img: P("nutella-embrace-crepe"), desc: "Thin, soft crêpe layered with rich Nutella and your choice of fresh strawberries or banana." },
      { id: "biscoff-dream-crepe", name: "Biscoff Dream", img: P("biscoff-dream-crepe"), desc: "A warm crêpe with creamy Biscoff spread, topped with crunchy Lotus biscuit crumbs." },
      { id: "bueno-bliss-crepe", name: "Bueno Bliss", img: P("bueno-bliss-crepe"), desc: "A delicate golden crêpe filled with Kinder Bueno pieces and smooth chocolate sauce." },
      { id: "oreo-dream-crepe", name: "Oreo Dream", img: P("oreo-dream-crepe"), desc: "Loaded with Oreo crunch and finished with a generous drizzle of chocolate sauce." },
    ],
  },
  {
    id: "waffles",
    label: "Waffles",
    blurb: "Freshly made waffles, from smooth Nutella to pistachio kunafa.",
    items: [
      { id: "dubai-classic-waffle", name: "Dubai Classic", desc: "A local favourite: pistachio kunafa topped with a rich, premium pistachio sauce." },
      { id: "bueno-bliss-waffle", name: "Bueno Bliss", desc: "Freshly made waffle with Kinder Bueno chocolate pieces and a luscious premium Kinder sauce." },
      { id: "biscoff-dream-waffle", name: "Biscoff Dream", desc: "A caramel fantasy: smooth Biscoff sauce with crunchy Lotus biscuit pieces." },
      { id: "oreo-delicious-waffle", name: "Oreo-Delicious", desc: "Nutella meets crunchy Oreo cookies, drizzled in chocolate sauce." },
      { id: "nutella-spread-waffle", name: "Nutella Spread", desc: "A classic with smooth Nutella spread. Add banana or strawberry." },
    ],
  },
  {
    id: "sundaes",
    label: "Sundaes",
    blurb: "Gelato sundaes, from Smarties and bubblegum to Ferrero Rocher and pistachio kunafa.",
    items: [
      { id: "strawberry-delight-sundae", name: "Strawberry Delight", tag: "Kids love", img: P("strawberry-delight-sundae"), desc: "Strawberry gelato with vanilla gelato, fresh strawberry pieces and strawberry sauce." },
      { id: "chocolicious-sundae", name: "Chocolicious", tag: "Kids love", img: P("chocolicious-sundae"), desc: "Rich chocolate gelato with chocolate buttons and milk chocolate sauce." },
      { id: "smarty-sundae", name: "Smarty", tag: "Kids love", img: P("smarty-sundae"), desc: "Strawberry gelato topped with Smarties and a drizzle of chocolate." },
      { id: "bubblicious-sundae", name: "Bubblicious", tag: "Kids love", img: P("bubblicious-sundae"), desc: "Bubblegum gelato with marshmallows and a swirl of bubblegum sauce." },
      { id: "eros-special-sundae", name: "Eros Special", desc: "Vanilla gelato with Ferrero Rocher pieces and Ferrero Rocher gelato." },
      { id: "dubai-oasis-sundae", name: "Dubai Oasis", desc: "Vanilla gelato with pistachio kunafa and Kinder, with pistachio sauce." },
      { id: "biscoff-dream-sundae", name: "Biscoff Dream", desc: "Vanilla gelato and Biscoff gelato with warm, caramelised Biscoff sauce." },
      { id: "bueno-bliss-sundae", name: "Bueno Bliss", desc: "Vanilla gelato with Kinder Bueno crumbs and pieces, drizzled with creamy Kinder sauce." },
      { id: "nutella-dream-sundae", name: "Nutella Dream", desc: "Vanilla gelato swirled with Nutella and Nutella gelato, topped with banana or strawberry." },
      { id: "oreo-dream-sundae", name: "Oreo Dream", desc: "Vanilla gelato layered with Oreo pieces and Oreo gelato, crunchy cereal and banana." },
    ],
  },
  {
    id: "milkshakes",
    label: "Milkshakes",
    blurb: "Blended with vanilla gelato: Bueno, Nutella, Oreo, Biscoff, pistachio and Ferrero Rocher.",
    items: [
      { id: "eros-special-milkshake", name: "Eros Special", img: P("eros-special-milkshake"), desc: "Ferrero Rocher blended with vanilla gelato and a touch of Nutella." },
      { id: "dubai-oasis-milkshake", name: "Dubai Oasis", img: P("dubai-oasis-milkshake"), desc: "Silky vanilla gelato blended with pistachio: an exotic escape in a glass." },
      { id: "biscoff-dream-milkshake", name: "Biscoff Dream", img: P("biscoff-dream-milkshake"), desc: "Caramelised Biscoff swirled into vanilla gelato." },
      { id: "bueno-bliss-milkshake", name: "Bueno Bliss", img: P("bueno-bliss-milkshake"), desc: "Creamy vanilla gelato blended with Kinder Bueno pieces." },
      { id: "nutella-dream-milkshake", name: "Nutella Dream", img: P("nutella-dream-milkshake"), desc: "Rich Nutella meets smooth vanilla gelato. Add banana for an extra twist." },
      { id: "oreo-dream-milkshake", name: "Oreo Dream", img: P("oreo-dream-milkshake"), desc: "Crunchy Oreo cookies blended into creamy vanilla gelato." },
    ],
  },
  {
    id: "gelato",
    label: "Gelato",
    blurb: "Gelato, sorbets and frozen yoghurt, made daily. The counter shows today’s flavours.",
    items: [
      { id: "gelato", name: "Gelato", desc: "Our daily fresh artisan gelato. Please see the counter for today’s flavours." },
      { id: "sorbet", name: "Sorbet", desc: "Made fresh daily with real fruit. Dairy, fat and gluten free." },
      { id: "frozen-yoghurt", name: "Frozen yoghurt", desc: "Frozen to perfection: the best natural yoghurt, fat and gluten free." },
    ],
  },
  {
    id: "coffee",
    label: "Coffee",
    blurb: "Espresso, cappuccino, latte and more, crafted for depth, aroma and balance.",
    items: [
      { id: "cappuccino", name: "Cappuccino", img: P("cappuccino"), desc: "Espresso, steamed milk and froth." },
      { id: "espresso", name: "Espresso", img: P("espresso"), desc: "Rich and intense." },
      { id: "double-espresso", name: "Double espresso", img: P("double-espresso"), desc: "Strong and bold." },
      { id: "flat-white", name: "Flat white", img: P("flat-white"), desc: "Bold espresso with velvety microfoam." },
      { id: "latte", name: "Latte", img: P("latte"), desc: "Smooth espresso with steamed milk." },
      { id: "mocha", name: "Mocha", img: P("mocha"), desc: "Espresso, chocolate and steamed milk." },
      { id: "americano", name: "Americano", img: P("americano"), desc: "Espresso with hot water." },
      { id: "hot-chocolate", name: "Hot chocolate", img: P("hot-chocolate"), desc: "Creamy and indulgent." },
    ],
  },
  {
    id: "tea",
    label: "Tea",
    blurb: "Fine teas, served with the same attention to quality as the coffee.",
    items: [
      { id: "english-breakfast", name: "English breakfast", img: P("english-breakfast"), desc: "Classic black tea." },
      { id: "green-tea", name: "Green tea", img: P("green-tea"), desc: "Refreshing and light." },
      { id: "herbal-tea", name: "Herbal tea", img: P("herbal-tea"), desc: "Various herbal blends." },
    ],
  },
];

export const MENU_COUNT = MENU.reduce((n, c) => n + c.items.length, 0);

// Three signatures, each told with one of the café's own dark photographs. Section names come from eros-cafe.com.
export const SIGNATURES = [
  {
    id: "crepes",
    menu: "crepes",
    kicker: "Sweet creations",
    title: "Thin, golden crêpes.",
    body: "Crafted fresh every day and filled with rich chocolate, pistachio and premium toppings. The Dubai Delight is filled with pistachio kunafa.",
    note: "Six crêpes on the menu",
    image: "/img/crepe-rolls.webp",
    alt: "Rolled crêpes with chocolate, pistachio and raspberries in a black pan",
  },
  {
    id: "milkshakes",
    menu: "milkshakes",
    kicker: "Cold indulgence",
    title: "Signature milkshakes.",
    body: "Bueno, Nutella, Oreo, Biscoff, pistachio and Ferrero Rocher, each blended with vanilla gelato. Rich and smooth.",
    note: "Six milkshakes on the menu",
    image: "/img/milkshakes-dark.webp",
    alt: "Oreo, Biscoff and strawberry milkshakes with cream on a dark table",
  },
  {
    id: "coffee",
    menu: "coffee",
    kicker: "Signature drinks",
    title: "Indulge in every sip.",
    body: "Espresso, cappuccino, latte and more, crafted for depth, aroma and balance. The cappuccino comes in the gold-rimmed Eros cup.",
    note: "Seven coffees, hot chocolate and three teas",
    image: "/img/three-coffees.webp",
    alt: "An espresso and a latte in glasses beside a cappuccino in the Eros cup",
  },
];

export type Branch = {
  key: string;
  town: string;
  note?: string;
  address: string;
  postcode?: string;
  phone: string;
  tel: string;
  lat: number;
  lng: number;
};

// Addresses and phone numbers as printed on /our-branches/. Postcodes are only shown where the site's
// postcode matches public records (see OVERVIEW.md, facts left out).
export const BRANCHES: Branch[] = [
  { key: "wigan", town: "Wigan", note: "4.7 on Google", address: "51 Wigan Lane", postcode: "WN1 1XS", phone: "07438 777 777", tel: "+447438777777", lat: 53.5536, lng: -2.6283 },
  { key: "manchester", town: "Manchester", note: "Head office", address: "3 Hardman Street", postcode: "M3 3HF", phone: "07342 999 999", tel: "+447342999999", lat: 53.4797, lng: -2.2517 },
  { key: "urmston", town: "Urmston", address: "Unit 4, Woodsend Circle", phone: "07479 353 535", tel: "+447479353535", lat: 53.4432, lng: -2.3897 },
  { key: "st-helens", town: "St Helens", address: "2 McCormack Avenue", phone: "07479 353 535", tel: "+447479353535", lat: 53.4396, lng: -2.7322 },
];

export const ABROAD = [
  { town: "Tripoli", country: "Libya", address: "47 Galleria De Bono, 24 December Street", phone: "+218 91 472 4949", tel: "+218914724949" },
  { town: "Cairo", country: "Egypt", address: "Mamsha El Zamalek" },
];
export const SOON = ["Saudi Arabia", "Syria"];

export const CONTACT = {
  email: "info@eros-cafe.com",
  franchiseEmail: "franchise@eros-cafe.com",
  franchisePhone: "+44 7479 353535",
  franchiseTel: "+447479353535",
  facebook: "https://www.facebook.com/eroscafe0",
  tiktok: "https://www.tiktok.com/@eroscafe00",
};

// Opening hours. Only Eros Wigan has hours of its own on Google (checked 2 Nov 2026); they differ from the
// website's "Mon to Sun, 8am to 11pm", so Wigan follows Google and the other cafés get neutral wording.
// Days: 0 = Sunday. Times are in minutes after midnight, London time.
export const WIGAN_HOURS: Record<number, [number, number]> = {
  0: [600, 1320],
  1: [480, 1020],
  2: [480, 1020],
  3: [480, 1020],
  4: [480, 1020],
  5: [480, 1320],
  6: [480, 1320],
};
export const WIGAN_HOURS_ROWS = [
  { days: "Mon to Thu", time: "8am to 5pm" },
  { days: "Fri to Sat", time: "8am to 10pm" },
  { days: "Sun", time: "10am to 10pm" },
];
// The website's own hours for every café, used only to keep booking times sensible where no other source exists.
export const LISTED_HOURS: [number, number] = [480, 1380];

export const HOURS = {
  neutral: "Call ahead for today’s hours",
  caveat: "Hours may vary by café, so please call ahead to confirm.",
  wiganSource: "Wigan hours as listed on Google.",
};

// The only Google listing under the Eros name. Always shown with its café, never as a figure for the group.
export const RATING = { score: "4.7", count: 20, where: "Eros Wigan, 51 Wigan Lane", short: "Eros Wigan" };

// Quoted as written on Google (emoji removed). Names shortened to first name and initial.
export const REVIEWS = [
  {
    who: "Mafek F.",
    meta: "Local Guide",
    text: "The café has a beautiful interior, a really welcoming atmosphere and the staff were friendly from the moment I walked in. You can tell they genuinely care about their customers and take pride in what they’re creating. I ordered the Dubai waffles and they were absolutely incredible.",
    big: true,
  },
  {
    who: "Sara Y.",
    meta: "Google review",
    text: "Such a lovely little café! The staff are so sweet, friendly, and welcoming! The food is absolutely delicious, and the whole experience was wonderful.",
  },
  {
    who: "Janet M.",
    meta: "Google review",
    text: "Visited this cafe today and it was an outstanding experience. The quality of food is excellent and the staff are so helpful and professional. Their prices are very reasonable and I would recommend trying it out with friends and family.",
  },
  {
    who: "Morrell J.",
    meta: "Google review",
    text: "A great little cafe for breakfast or afternoon lunch! We arrived at 2 o’clock and still got served breakfast. The two ladies working were very accommodating and nothing was an issue with them.",
  },
  {
    who: "Rachael W.",
    meta: "Local Guide",
    text: "Brilliant service, quick coffee stop before hospital appointment. Nice little Croissant on the side.",
  },
];

export const PULL_QUOTE = {
  text: "It’s great to see something different come to Wigan.",
  who: "Mafek F., Google review",
};

export const STORY_FACTS = [
  { big: "2016", small: "Established in Manchester" },
  { big: "6", small: "Cafés across the UK, Libya and Egypt" },
  { big: "47", small: "Desserts and drinks on the menu" },
  { big: "2", small: "Openings ahead, in Saudi Arabia and Syria" },
];
