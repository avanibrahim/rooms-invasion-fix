export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  rating?: number;
  sizes?: string[];
  colors?: string[];
  stock?: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Elevar Tee - Coffee",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products/NEVER ENOUGH/F ELEVAR TEE.png",
      "/products/NEVER ENOUGH/B ELEVAR TEE.png",
    ],
    category: "t-shirts",
    brand: "NEVER ENOUGH",
    rating: 4.5,
    sizes: ["S", "M", "L", "XL"],
    stock: 25
  },
  {
    id: "2",
    name: "Never Enough Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products/NEVER ENOUGH/F NEVER ENOUGH.png",
      "/products/NEVER ENOUGH/B NEVER ENOUGH.png",
    ],
    category: "t-shirts",
    brand: "NEVER ENOUGH",
    rating: 4.8,
    sizes: ["S", "M", "L", "XL"],
    stock: 25 // Out of stock
  },
  {
    id: "3",
    name: "Asteria Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products/NEVER ENOUGH/ASTERIA.png",
      "/products/NEVER ENOUGH/ASTERIA.png",
    ],
    category: "t-shirts",
    brand: "NEVER ENOUGH",
    rating: 4.5,
    sizes: ["S", "M", "L", "XL"],
    stock: 10 // Low stock
  },
  {
    id: "4",
    name: "Still Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products/HUSTLE & FLOW/STILL TEE BLACK/FRONT.png",
      "/products/HUSTLE & FLOW/STILL TEE BLACK/BACK.png",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.6,
    sizes: ["S", "M", "L", "XL"],
    stock: 2
  },
  {
    id: "5",
    name: "Still Tee - Navy",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products/HUSTLE & FLOW/STILL TEE NAVY/FRONT.png",
      "/products/HUSTLE & FLOW/STILL TEE NAVY/BACK.png",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.9,
    sizes: ["S", "M", "L", "XL"],
    stock: 5 // Out of stock
  },
  {
    id: "6",
    name: "Eternal Tee - White",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products/HUSTLE & FLOW/ETERNAL TEE/FRONT.png",
      "/products/HUSTLE & FLOW/ETERNAL TEE/BACK.png",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 5
  },
  {
    id: "7",
    name: "Love Mom Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products/HUSTLE & FLOW/LOVE MOM TEE/FRONT.png",
      "/products/HUSTLE & FLOW/LOVE MOM TEE/BACK.png",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 2
  },
  {
    id: "8",
    name: "Mouth Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products/HUSTLE & FLOW/MOUTH TEE/FRONT.png",
      "/products/HUSTLE & FLOW/MOUTH TEE/BACK.png",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 5
  },
  {
    id: "9",
    name: "Rythem Tee - Benhur",
    description: "•⁠ ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/DUB NATION/F BLUE.PNG",
      "/products/DUB NATION/B BLUE.PNG",
    ],
    category: "t-shirts",
    brand: "DUB NATION",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "10",
    name: "Grens Workshirt - Black",
    description: "•⁠ ⁠100% Drill cotton ⁠ • ⁠⁠Boxy Fit • Embroidered Logo on Front and Back⁠ • ⁠⁠Rooms Woven & Rubber Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 299000,
    images: [
      "/products/DUB NATION/FRONT.png",
      "/products/DUB NATION/FRONT ZOOM.png",
    ],
    category: "shirts",
    brand: "DUB NATION",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "11",
    name: "Vrede Tee - Black",
    description: "•⁠ ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/DUB NATION/F PEACE.PNG",
      "/products/DUB NATION/B PEACE.PNG",
    ],
    category: "t-shirts",
    brand: "DUB NATION",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "12",
    name: "Kersie Tee - Rotten Yellow",
    description: "•⁠ ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/DUB NATION/KUNING FRONT.png",
      "/products/DUB NATION/KUNING BACK.png",
    ],
    category: "t-shirts",
    brand: "DUB NATION",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "13",
    name: "Streek Tee - White",
    description: "•⁠ ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/DUB NATION/F AFRIKA.PNG",
      "/products/DUB NATION/B AFRIKA.PNG",
    ],
    category: "t-shirts",
    brand: "DUB NATION",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "14",
    name: "Grows Crewnecks - Black",
    description: "•⁠  ⁠100% Cotton Fleece • 280 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven & Rubber Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 299000,
    images: [
      "/products/INVASION FROM THE EAST/GROWS CREWNECK/FRONT.png",
      "/products/INVASION FROM THE EAST/GROWS CREWNECK/FRONT.png",
    ],
    category: "outerwear",
    brand: "INVASION FROM THE EAST",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "15",
    name: "Inval 0435 Double Layer - Black/White",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 215000,
    images: [
      "/products/INVASION FROM THE EAST/INVAL 0435 DOUBLE LAYER/FRONT.png",
      "/products/INVASION FROM THE EAST/INVAL 0435 DOUBLE LAYER/BACK.png",
    ],
    category: "t-shirts",
    brand: "INVASION FROM THE EAST",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "16",
    name: "Bad Alies Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/INVASION FROM THE EAST/F BAD ALIES.PNG",
      "/products/INVASION FROM THE EAST/B BAD ALIES.PNG",
    ],
    category: "t-shirts",
    brand: "INVASION FROM THE EAST",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "17",
    name: "From East Tee - Dark Grey",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/INVASION FROM THE EAST/F GREY.PNG",
      "/products/INVASION FROM THE EAST/B GREY.PNG",
    ],
    category: "t-shirts",
    brand: "INVASION FROM THE EAST",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "18",
    name: "Circles Tee - Medieval Blue",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/INVASION FROM THE EAST/F MEDIA FILE.PNG",
      "/products/INVASION FROM THE EAST/B MEDIA FILE.PNG",
    ],
    category: "t-shirts",
    brand: "INVASION FROM THE EAST",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "19",
    name: "Rush Hat - Black",
    description: "Snapback Classic •⁠  ⁠100% Cotton Twill • Embroidered Graphics Logo • ⁠Adjustable Back Strap • Visor 6cm⁠ • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 125000,
    images: [
      "/products/INVASION FROM THE EAST/RUSH HAT.png",
      "/products/INVASION FROM THE EAST/RUSH HAT ZOOM.png",
    ],
    category: "accessories",
    brand: "INVASION FROM THE EAST",
    rating: 4.4,
    stock: 10
  },
  {
    id: "20",
    name: "Pester Tee - Gucci Green",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/REMARKS 0.2/F GREEN.png",
      "/products/REMARKS 0.2/B GREEN.PNG",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.2",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "21",
    name: "Mondai Tee - Red",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/REMARKS 0.2/F RED SHIRT.png",
      "/products/REMARKS 0.2/B RED SHIRT.png",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.2",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "22",
    name: "Nuovo Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/REMARKS 0.2/F NUOVO.png",
      "/products/REMARKS 0.2/F NUOVO.png",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.2",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "23",
    name: "Dicta Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/REMARKS 0.2/B BLACK.PNG",
      "/products/REMARKS 0.2/F BLACK.PNG",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.2",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "24",
    name: "Nuovo Tee - Purple",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/REMARKS 1/F NUOVO.png",
      "/products/REMARKS 1/B NUOVO.png",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.1",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "25",
    name: "Nuovo Tee - Light Grey",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/REMARKS 0.1/NUOVO LIGHT GREY/FRONT.png",
      "/products/REMARKS 0.1/NUOVO LIGHT GREY/BACK.png",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.1",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "26",
    name: "Vyand Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/REMARKS 0.1/VYAND TEE/FRONT.png",
      "/products/REMARKS 0.1/VYAND TEE/BACK.png",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.1",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
 
    stock: 0
  },
  {
    id: "27",
    name: "Aset Pullover Hoodie - Black",
    description: "•⁠  ⁠100% Cotton Fleece • 330 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 350000,
    images: [
      "/products/REMARKS 0.1/ASET HOODIE/FRONT.png",
      "/products/REMARKS 0.1/ASET HOODIE/BACK.png",
    ],
    category: "outerwear",
    brand: "REMARKS 0.1",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
  
    stock: 2
  },
  {
    id: "28",
    name: "Raam Tee - Turquiese",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products/REMARKS 1/F RAAM.png",
      "/products/REMARKS 1/B RAAM.png",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.1",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "29",
    name: "Zuerst Shorts - Black",
    description: " •⁠Teslan • Oil Based (HDC) Screen Print Decoration⁠ • ⁠⁠Rooms Rubber Patch • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 179000,
    images: [
      "/products/REMARKS 1/F SHORT PANTS.png",
      "/products/REMARKS 1/B SHORT PANTS.png",
    ],
    category: "shorts",
    brand: "REMARKS 0.1",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    
    stock: 0
  },
  {
    id: "30",
    name: "Fuf Tee - White",
    description: "•⁠  ⁠100% Cotton 20s • 190 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 185000,
    images: [
      "/products/FIRST OF ALL 2/F FUF TEE.png",
      "/products/FIRST OF ALL 2/B FUF TEE.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
  
    stock: 0
  },
  {
    id: "31",
    name: "Denken Tee - Beige",
    description: "•⁠  ⁠100% Cotton 20s • 190 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 185000,
    images: [
      "/products/FIRST OF ALL/BEIGE/FRONT.png",
      "/products/FIRST OF ALL/BEIGE/BACK.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
   
    stock: 0
  },
  {
    id: "32",
    name: "Klube Tee - Sage",
    description: "•⁠  ⁠100% Cotton 20s • 190 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 185000,
    images: [
      "/products/FIRST OF ALL/GREEN/FRONT.png",
      "/products/FIRST OF ALL/GREEN/BACK.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
 
    stock: 0
  },
  {
    id: "33",
    name: "Shine Tee - Dark Grey",
    description: "•⁠  ⁠100% Cotton 20s • 190 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 185000,
    images: [
      "/products/FIRST OF ALL 2/F SHINE TEE.png",
      "/products/FIRST OF ALL 2/B SHINE TEE.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
   
    stock: 0
  },
  {
    id: "34",
    name: "Native Tee - White",
    description: "•⁠  ⁠100% Cotton 20s • 190 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 185000,
    images: [
      "/products/FIRST OF ALL 2/F NATIVE TEE.png",
      "/products/FIRST OF ALL 2/B NATIVE TEE.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
  
    stock: 0
  },
  {
    id: "35",
    name: "Bad Luck L/S - Navy",
    description: "•⁠  ⁠100% Cotton 24s • 170 GSM⁠ • ⁠⁠Reguler Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 189000,
    images: [
      "/products/FIRST OF ALL/LONG SLEEVE NAVY/FRONT.png",
      "/products/FIRST OF ALL/LONG SLEEVE NAVY/BACK.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],

    stock: 0
  },
  {
    id: "36",
    name: "Zuerts L/S - Black",
    description: "•⁠  ⁠100% Cotton 24s • 170 GSM⁠ • ⁠⁠Reguler Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 189000,
    images: [
      "/products/FIRST OF ALL 2/F ZUERST LS.png",
      "/products/FIRST OF ALL 2/B ZUERST LS.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
 
    stock: 0
  },
  {
    id: "37",
    name: "Josho Tee - Black",
    description: "•⁠  ⁠100% Cotton 24s • 170 GSM⁠ • ⁠⁠Reguler Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 155000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
  
    stock: 0
  },
  {
    id: "38",
    name: "Zuerst Tee - Benhur",
    description: "•⁠  ⁠100% Cotton 24s • 170 GSM⁠ • ⁠⁠Reguler Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 155000,
    images: [
      "/products/FIRST OF ALL 2/F ZUERST SS.png",
      "/products/FIRST OF ALL 2/B ZUERST SS.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],

    stock: 0
  },
  {
    id: "39",
    name: "Seva Tee - Black",
    description: "•⁠  ⁠100% Cotton 24s • 170 GSM⁠ • ⁠⁠Reguler Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 155000,
    images: [
      "/products/FIRST OF ALL 2/F SEVA TEE.png",
      "/products/FIRST OF ALL 2/B SEVA TEE.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],

    stock: 0
  },
  
];
