// products.js – mirrors the frontend data/products.js so the backend
// is the single source of truth that the frontend can fetch from.

export const PRODUCTS = [
  {
    id: "velvet-amber-oudh",
    name: "Velvet Amber & Oudh",
    tagline: "The Essence of Midnight",
    subtitle: "Extrait de Parfum",
    description:
      "A striking, high-contrast composition evoking midnight mystery. Warm amber fuses with rare Cambodian oudh, veiled in smoky incense and creamy Madagascar vanilla.",
    price: 185,
    sizes: [
      { size: "50ml", price: 185 },
      { size: "100ml", price: 285 },
    ],
    rating: 4.9,
    reviewsCount: 128,
    category: "ORIENTAL",
    chips: ["WOODY", "AMBER", "EXCLUSIVE"],
    notes: {
      top: ["Smoked Bergamot", "Pink Pepper", "Cardamom"],
      heart: ["Amber Resin", "Damask Rose", "Labdanum"],
      base: ["Cambodian Oudh", "Madagascar Vanilla", "Dark Cedar"],
    },
    accentNotes: "Warm Amber, Smoked Oudh, Madagascar Vanilla",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEHhUjVKZryH428kWV4Qkv5_riO_95H4zywAdRgC3oyj0QkL1lNMGjXIejVMPcwNd3G7uNXTJmDaQKSslAV8AUyLY38rieeaaB2XwfP9YFsTgZxB07CO5NzG3IbG9b2-XMydJO6eC8WkG-OaSZsa1V7mGWTlNgo417ZAAo1t2ufIu2ph4Uuvt14Sf6QylRZ2CFTXOoB_v5nm2zTH3w0ZpkrZqC4omb3ionFkKRYBmctP7XZ7p6RwAlPw",
    featured: true,
    isNew: true,
    stock: 42,
  },
  {
    id: "santal-noir",
    name: "Santal Noir",
    tagline: "Shadows in the Wood",
    subtitle: "Eau de Parfum",
    description:
      "A minimalist, high-end editorial fragrance with Australian sandalwood, cardamom, and soft leather. An intimate aura that lingers with quiet luxury.",
    price: 185,
    sizes: [
      { size: "50ml", price: 185 },
      { size: "100ml", price: 260 },
    ],
    rating: 4.8,
    reviewsCount: 94,
    category: "WOODY",
    chips: ["WOODY", "SPICY"],
    notes: {
      top: ["Green Cardamom", "Violet Leaf", "Coriander"],
      heart: ["Tuscan Iris", "Cedarwood", "Papyrus"],
      base: ["Australian Sandalwood", "Soft Leather", "Amber"],
    },
    accentNotes: "Sandalwood, Cardamom, Leather",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1_pHNygUuxUQDKWwc9khCgYBdM20ugrut73F9Ce7bYsEzVT0nxHFEU3vZn-x6nVjCNo6wAcmhWmNsOCvlm86EzTiIwNOHq_-l1E1vlQm9QcUXHvIYveBetQrlH3q3I6xoK6EWMS1Fq2gqIluKSru3xsKxPpAD-yuojn_seyvaihYyZ4ag66INrCY-Ifs_7YUeiub8dMF6ADwV-8L29zjFJ9tZb2OvCND-2t3gqhhWH-Qx6sBTKL2zcA",
    featured: true,
    isNew: false,
    stock: 30,
  },
  {
    id: "rose-enigma",
    name: "Rose Enigma",
    tagline: "Velvet Petals at Dawn",
    subtitle: "Eau de Parfum",
    description:
      "Delicate yet intensely sophisticated. Damask rose unfurls across sharp pink pepper and warm white musk, resting on a plinth of delicate cashmere wood.",
    price: 190,
    sizes: [
      { size: "50ml", price: 190 },
      { size: "100ml", price: 275 },
    ],
    rating: 4.9,
    reviewsCount: 110,
    category: "FLORAL",
    chips: ["FLORAL", "MUSK"],
    notes: {
      top: ["Pink Pepper", "Mandarin Zest", "Blackcurrant"],
      heart: ["Damask Rose Absolu", "Peony", "Jasmine Sambac"],
      base: ["White Musk", "Cashmere Wood", "Golden Amber"],
    },
    accentNotes: "Damask Rose, Pink Pepper, Musk",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZZ0YsauVNLgjGxDaYosJu_CDIEH-rOsCXxBNmLlcfHRfs_CWpXHEaBj64qZwnMnr1Z-a4Z3_5Ay9qViXNmB87SgWUI5W6J7uqMtD_-vZT5U9PgDYdBoZLn94ogwan3B3-zZLxQW1pSIz92MbEBxlE3WGrKYTtZS1AV-OtmOgo-LogpCDO6_OcXRDS-HVqARiBY5TuWkWu3w_RRrpKd7kXbnHM1wXVfzHgV--kyVBe0F4kSVLtGX2zxA",
    featured: true,
    isNew: false,
    stock: 25,
  },
  {
    id: "santal-mystique",
    name: "Santal Mystique",
    tagline: "Sacred Forest Solitude",
    subtitle: "Extrait de Parfum",
    description:
      "A sanctuary of Mysore sandalwood enveloped by cardamom, leather accents, and aged balsamic resins. Meticulously distilled for connoisseurs.",
    price: 240,
    sizes: [
      { size: "50ml", price: 240 },
      { size: "100ml", price: 340 },
    ],
    rating: 4.7,
    reviewsCount: 76,
    category: "WOODY",
    chips: ["WOODY", "SMOKY", "BOUTIQUE"],
    notes: {
      top: ["Nutmeg", "Cardamom Seed", "Elemi"],
      heart: ["Mysore Sandalwood", "Guaiac Wood", "Incense"],
      base: ["Balsam Peru", "Leather", "Vetiver Root"],
    },
    accentNotes: "Sandalwood, Cardamom, Leather",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTJp1uqw5-LVaBy8gqYuFjG463S1cpquqn-aoWclQRWNHeRN342ROzCnskM-XJODnX8Q7bDhdJVP4wIe8P2-4fMmRGoJi-HNWpwzCJe6rbCMZjR_o07G3odg0qXaf4MMIOKh9LOOTghwv9uiHKKNkWP0nh7Sn7PpAIly2mzwPBmTJ6VggWVKF9E-EuXNOfjZHDETBqIP_Py3gSXLumTwz7UFsjS0hhPKbgZSbx7FBnKx81uoqPwPdi1A",
    featured: false,
    isNew: false,
    stock: 18,
  },
  {
    id: "rose-noir",
    name: "Rose Noir",
    tagline: "Dark Romance & Dark Earth",
    subtitle: "Extrait de Parfum",
    description:
      "Deep, gothic floral elegance. Midnight black rose petals married to dark Indonesian patchouli and aged agarwood for an intoxicating presence.",
    price: 280,
    sizes: [
      { size: "50ml", price: 280 },
      { size: "100ml", price: 395 },
    ],
    rating: 5.0,
    reviewsCount: 88,
    category: "FLORAL",
    chips: ["FLORAL", "DARK", "OUD"],
    notes: {
      top: ["Saffron", "Grapefruit", "Plum"],
      heart: ["Black Rose", "Orris Root", "Patchouli"],
      base: ["Laotian Oud", "Ambergris", "Smoky Birch"],
    },
    accentNotes: "Black Rose, Patchouli, Oud",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtBN_m7-U1GjF16AfCCZkdzCNsj4XHVOBHINeS_MGbf3OO5oPQ2KZrnGWD4yZxYhxmXSKRkowp9MUXFxeajzkPeko1NayodQFK-62P-LOb0Ma6_vBwC1N4jVcw0xlgx2fvXxx0jY-Ju4_HvMSjaJL7Y8PCKqu1YqNc5HJe-jL0Ff950EJrEgAJmoaOZnsqxZT8D_vaT8OlruAW6pFzRKCQqg23Q1T6LeTXw8JHmWMdXZgBS99jDK_xyQ",
    featured: false,
    isNew: false,
    stock: 12,
  },
  {
    id: "aqua-vitae",
    name: "Aqua Vitae",
    tagline: "Luminous Mediterranean Light",
    subtitle: "Eau de Toilette",
    description:
      "A crystal-clear rush of sunlit Italian bergamot, crystalline sea salt, and clean Haitian vetiver. Pure energy captured in blown crystal.",
    price: 195,
    sizes: [
      { size: "50ml", price: 195 },
      { size: "100ml", price: 270 },
    ],
    rating: 4.2,
    reviewsCount: 52,
    category: "FRESH",
    chips: ["FRESH", "AQUATIC", "CITRUS"],
    notes: {
      top: ["Calabrian Bergamot", "Sea Breeze", "Lemon Caviar"],
      heart: ["Neroli Blossom", "Sage Leaf", "Water Lily"],
      base: ["Haitian Vetiver", "Clean Amber", "Driftwood"],
    },
    accentNotes: "Bergamot, Sea Salt, Vetiver",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAX4OEZVZI3EDgfEXii_96HOcAzw2oe_ag1udaLYWGfM_vIYoHDAgdNJwnOVtH6OMgSt_AhM-HXy5peXv07CpAaa92_G-AVyu4L6kbEQ8bUqtTqbdeR_wbw7Rc7oj-1rGrT_82G4WAPXHNt_doqoSE_9C4TiOUXZpRsDYxYO6JhCbzACK8M6S4AvmNIttIg3rHLY2mwVJtMP-X53rZPA807oVbIq7o_dAk9EC0p7VEURGHjxlYFCA",
    featured: false,
    isNew: false,
    stock: 50,
  },
  {
    id: "amber-haze",
    name: "Amber Haze",
    tagline: "Golden Hour Reverie",
    subtitle: "Eau de Parfum",
    description:
      "An intoxicating golden glow of warm Bourbon vanilla, liquid amber, and sensual skin musk. Warm, cozy, and unmistakably lavish.",
    price: 220,
    sizes: [
      { size: "50ml", price: 220 },
      { size: "100ml", price: 310 },
    ],
    rating: 4.7,
    reviewsCount: 64,
    category: "ORIENTAL",
    chips: ["ORIENTAL", "WARM", "VANILLA"],
    notes: {
      top: ["Almond Blossom", "Golden Peach", "Cinnamon Bark"],
      heart: ["Bourbon Vanilla", "Tonka Bean", "Heliotrope"],
      base: ["Golden Amber", "White Musk", "Benzoin"],
    },
    accentNotes: "Vanilla, Amber, Musk",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwdwwyCUIUSI00gC5l0jG4cv6oaLJW-O2_pVQ6tm4yN4W4S_wUw7-6opZEUTKLVsNttgk5zLlspJ8mWSiCSQAiIBa5OKS8EzOf6MxF7LdmhfiVmwl_n-Q1OXAtYbbvP27nuUvbZ_ODjocrra4A1ptEwfp0vzCr8veidoWK8Roj2RFxfrjiW5oB_f3wJgSVh89kYC7u-iBCoRxBISlos39n7MyPdh6T0nBalnnneqhIyje1tGv4clyh4w",
    featured: false,
    isNew: false,
    stock: 35,
  },
  {
    id: "midnight-fig-vetiver",
    name: "Midnight Fig & Vetiver",
    tagline: "Nocturnal Flora",
    subtitle: "Eau de Parfum",
    description:
      "Lush green wild fig leaves steeped in deep nocturnal vetiver and smoky cedar. A sophisticated and enigmatic scent for the evening.",
    price: 140,
    sizes: [
      { size: "50ml", price: 140 },
      { size: "100ml", price: 210 },
    ],
    rating: 4.6,
    reviewsCount: 47,
    category: "WOODY",
    chips: ["WOODY", "GREEN", "FIG"],
    notes: {
      top: ["Wild Fig Leaf", "Bitter Orange", "Cardamom"],
      heart: ["Ripe Black Fig", "Orris", "Coconut Water"],
      base: ["Bourbon Vetiver", "Atlas Cedar", "Oakmoss"],
    },
    accentNotes: "Wild Fig, Bourbon Vetiver, Atlas Cedar",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDRk3aTpaX5pWBi6Lnc43bk7T810XobTo0pckf11wejI4LRzyiQwVg-ZRFD_BCYtqwq7bQ1UroFfJRjlkESvaNvgvaWLEzdecJKD7KkUblr-4xT0YmY7Kgd4DNzs1MS_wuhw8r3dz5ly-KuCE7vdxzzvfIMYAbKWb7-fniYWxsPhCoY49UvHoknvnJsE8ahfrKIfotfAhPeUr8NAY8fpfhQm88fLs8F4bprwsxccOweU6VkSh246LLprQ",
    featured: false,
    isNew: false,
    stock: 20,
  },
];

export const CATEGORIES = ["ALL", "FLORAL", "WOODY", "ORIENTAL", "FRESH"];

// Valid promo codes
export const PROMO_CODES = {
  LUXURY10: { discount: 10, label: "10% Luxury Discount" },
  WELCOME10: { discount: 10, label: "10% Welcome Discount" },
  GOLD20: { discount: 20, label: "20% Gold Member Discount" },
  VIP20: { discount: 20, label: "20% VIP Discount" },
};

export const FREE_SHIPPING_THRESHOLD = 200;
export const SHIPPING_FEE = 15;

