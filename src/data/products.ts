export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  stock: number;
  sizes?: string[] | { size: string; stock: number }[];
  colors?: string[];
};


export const products: Product[] = [
  {
    id: "1",
    name: "Elevar Tee - Coffee",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products_optimized/NEVER ENOUGH/F ELEVAR TEE.webp",
      "/products_optimized/NEVER ENOUGH/B ELEVAR TEE.webp",
    ],
    category: "t-shirts",
    brand: "NEVER ENOUGH",
    rating: 4.5,
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
  },
  {
    id: "2",
    name: "Never Enough Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products_optimized/NEVER ENOUGH/F NEVER ENOUGH.webp",
      "/products_optimized/NEVER ENOUGH/B NEVER ENOUGH.webp",
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
      "/products_optimized/NEVER ENOUGH/ASTERIA.webp",
      "/products_optimized/NEVER ENOUGH/ASTERIA.webp",
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
      "/products_optimized/HUSTLE & FLOW/STILL TEE BLACK/FRONT.webp",
      "/products_optimized/HUSTLE & FLOW/STILL TEE BLACK/BACK.webp",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.6,
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 1 },
      { size: "XL", stock: 0 } //CONTOH: Example of sizes with stock
    ],    
    stock: 1
  },
  {
    id: "5",
    name: "Still Tee - Navy",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products_optimized/HUSTLE & FLOW/STILL TEE NAVY/FRONT.webp",
      "/products_optimized/HUSTLE & FLOW/STILL TEE NAVY/BACK.webp",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.9,
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 1 },
      { size: "XL", stock: 2 }
    ],
    stock: 3 // Out of stock
  },
  {
    id: "6",
    name: "Eternal Tee - White",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products_optimized/HUSTLE & FLOW/ETERNAL TEE/FRONT.webp",
      "/products_optimized/HUSTLE & FLOW/ETERNAL TEE/BACK.webp",
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
      "/products_optimized/HUSTLE & FLOW/LOVE MOM TEE/FRONT.webp",
      "/products_optimized/HUSTLE & FLOW/LOVE MOM TEE/BACK.webp",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.4,
    sizes: [
      { size: "S", stock: 1 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 2 }
    ],
    stock: 3
  },
  {
    id: "8",
    name: "Mouth Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 205000,
    images: [
      "/products_optimized/HUSTLE & FLOW/MOUTH TEE/FRONT.webp",
      "/products_optimized/HUSTLE & FLOW/MOUTH TEE/BACK.webp",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.4,
    sizes: [
      { size: "S", stock: 1 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 1 }
    ],
    stock: 2
  },
  {
    id: "9",
    name: "Rythem Tee - Benhur",
    description: "•⁠ ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products_optimized/DUB NATION/F BLUE.PNG.webp",
      "/products_optimized/DUB NATION/B BLUE.PNG.webp",
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
    originalPrice: 350000,
    images: [
      "/products_optimized/DUB NATION/FRONT.webp",
      "/products_optimized/DUB NATION/FRONT ZOOM.webp",
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
      "/products_optimized/DUB NATION/F PEACE.PNG.webp",
      "/products_optimized/DUB NATION/B PEACE.PNG.webp",
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
      "/products_optimized/DUB NATION/KUNING FRONT.webp",
      "/products_optimized/DUB NATION/KUNING BACK.webp",
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
      "/products_optimized/DUB NATION/F AFRIKA.PNG.webp",
      "/products_optimized/DUB NATION/B AFRIKA.PNG.webp",
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
      "/products_optimized/INVASION FROM THE EAST/GROWS CREWNECK/FRONT.webp",
      "/products_optimized/INVASION FROM THE EAST/GROWS CREWNECK/FRONT.webp",
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
      "/products_optimized/INVASION FROM THE EAST/INVAL 0435 DOUBLE LAYER/FRONT.webp",
      "/products_optimized/INVASION FROM THE EAST/INVAL 0435 DOUBLE LAYER/BACK.webp",
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
      "/products_optimized/INVASION FROM THE EAST/F BAD ALIES.PNG.webp",
      "/products_optimized/INVASION FROM THE EAST/B BAD ALIES.PNG.webp",
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
      "/products_optimized/INVASION FROM THE EAST/F GREY.PNG.webp",
      "/products_optimized/INVASION FROM THE EAST/B GREY.PNG.webp",
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
      "/products_optimized/INVASION FROM THE EAST/F MEDIA FILE.PNG.webp",
      "/products_optimized/INVASION FROM THE EAST/B MEDIA FILE.PNG.webp",
    ],
    category: "t-shirts",
    brand: "INVASION FROM THE EAST",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "19",
    name: "Eastodoor Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 250 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products_optimized/INVASION FROM THE EAST/F EAST DOOR.PNG.webp",
      "/products_optimized/INVASION FROM THE EAST/F EAST DOOR.PNG.webp",
    ],
    category: "t-shirts",
    brand: "INVASION FROM THE EAST",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.4,
    stock: 0
  },
  {
    id: "20",
    name: "Rush Hat - Black",
    description: "Snapback Classic •⁠  ⁠100% Cotton Twill • Embroidered Graphics Logo • ⁠Adjustable Back Strap • Visor 6cm⁠ • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 125000,
    originalPrice: 165000,
    images: [
      "/products_optimized/INVASION FROM THE EAST/RUSH HAT.webp",
      "/products_optimized/INVASION FROM THE EAST/RUSH HAT ZOOM.webp",
    ],
    category: "accessories",
    brand: "INVASION FROM THE EAST",
    rating: 4.4,
    stock: 10
  },
  {
    id: "21",
    name: "Pester Tee - Gucci Green",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products_optimized/REMARKS 0.2/F GREEN.webp",
      "/products_optimized/REMARKS 0.2/B GREEN.PNG.webp",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.2",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "22",
    name: "Mondai Tee - Red",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products_optimized/REMARKS 0.2/F RED SHIRT.webp",
      "/products_optimized/REMARKS 0.2/B RED SHIRT.webp",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.2",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "23",
    name: "Nuovo Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products_optimized/REMARKS 0.2/F NUOVO.webp",
      "/products_optimized/REMARKS 0.2/F NUOVO.webp",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.2",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "24",
    name: "Dicta Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products_optimized/REMARKS 0.2/B BLACK.PNG.webp",
      "/products_optimized/REMARKS 0.2/F BLACK.PNG.webp",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.2",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "25",
    name: "Nuovo Tee - Purple",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products_optimized/REMARKS 1/F NUOVO.webp",
      "/products_optimized/REMARKS 1/B NUOVO.webp",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.1",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "26",
    name: "Nuovo Tee - Light Grey",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products_optimized/REMARKS 0.1/NUOVO LIGHT GREY/FRONT.webp",
      "/products_optimized/REMARKS 0.1/NUOVO LIGHT GREY/BACK.webp",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.1",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "27",
    name: "Vyand Tee - Black",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products_optimized/REMARKS 0.1/VYAND TEE/FRONT.webp",
      "/products_optimized/REMARKS 0.1/VYAND TEE/BACK.webp",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.1",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
 
    stock: 0
  },
  {
    id: "28",
    name: "Aset Pullover Hoodie - Black",
    description: "•⁠  ⁠100% Cotton Fleece • 330 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 350000,
    images: [
      "/products_optimized/REMARKS 0.1/ASET HOODIE/FRONT.webp",
      "/products_optimized/REMARKS 0.1/ASET HOODIE/BACK.webp",
    ],
    category: "outerwear",
    brand: "REMARKS 0.1",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
  
    stock: 2
  },
  {
    id: "29",
    name: "Raam Tee - Turquiese",
    description: "•⁠  ⁠100% Australian cotton • 235 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 199000,
    images: [
      "/products_optimized/REMARKS 1/F RAAM.webp",
      "/products_optimized/REMARKS 1/B RAAM.webp",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.1",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    stock: 0
  },
  {
    id: "30",
    name: "Zuerst Shorts - Black",
    description: " •⁠Teslan • Oil Based (HDC) Screen Print Decoration⁠ • ⁠⁠Rooms Rubber Patch • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 179000,
    images: [
      "/products_optimized/REMARKS 1/F SHORT PANTS.webp",
      "/products_optimized/REMARKS 1/B SHORT PANTS.webp",
    ],
    category: "shorts",
    brand: "REMARKS 0.1",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    
    stock: 0
  },
  {
    id: "31",
    name: "Fuf Tee - White",
    description: "•⁠  ⁠100% Cotton 20s • 190 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 185000,
    images: [
      "/products_optimized/FIRST OF ALL 2/F FUF TEE.webp",
      "/products_optimized/FIRST OF ALL 2/B FUF TEE.webp",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
  
    stock: 0
  },
  {
    id: "32",
    name: "Denken Tee - Beige",
    description: "•⁠  ⁠100% Cotton 20s • 190 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 185000,
    images: [
      "/products_optimized/FIRST OF ALL/BEIGE/FRONT.webp",
      "/products_optimized/FIRST OF ALL/BEIGE/BACK.webp",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
   
    stock: 0
  },
  {
    id: "33",
    name: "Klube Tee - Sage",
    description: "•⁠  ⁠100% Cotton 20s • 190 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 185000,
    images: [
      "/products_optimized/FIRST OF ALL/GREEN/FRONT.webp",
      "/products_optimized/FIRST OF ALL/GREEN/BACK.webp",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
 
    stock: 0
  },
  {
    id: "34",
    name: "Shine Tee - Dark Grey",
    description: "•⁠  ⁠100% Cotton 20s • 190 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 185000,
    images: [
      "/products_optimized/FIRST OF ALL 2/F SHINE TEE.webp",
      "/products_optimized/FIRST OF ALL 2/B SHINE TEE.webp",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
   
    stock: 0
  },
  {
    id: "35",
    name: "Native Tee - White",
    description: "•⁠  ⁠100% Cotton 20s • 190 GSM⁠ • ⁠⁠Boxy Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 185000,
    images: [
      "/products_optimized/FIRST OF ALL 2/F NATIVE TEE.webp",
      "/products_optimized/FIRST OF ALL 2/B NATIVE TEE.webp",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
  
    stock: 0
  },
  {
    id: "36",
    name: "Bad Luck L/S - Navy",
    description: "•⁠  ⁠100% Cotton 24s • 170 GSM⁠ • ⁠⁠Reguler Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 189000,
    images: [
      "/products_optimized/FIRST OF ALL/LONG SLEEVE NAVY/FRONT.webp",
      "/products_optimized/FIRST OF ALL/LONG SLEEVE NAVY/BACK.webp",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],

    stock: 0
  },
  {
    id: "37",
    name: "Zuerts L/S - Black",
    description: "•⁠  ⁠100% Cotton 24s • 170 GSM⁠ • ⁠⁠Reguler Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 189000,
    images: [
      "/products_optimized/FIRST OF ALL 2/F ZUERST LS.webp",
      "/products_optimized/FIRST OF ALL 2/B ZUERST LS.webp",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
 
    stock: 0
  },
  {
    id: "38",
    name: "Josho Tee - Black",
    description: "•⁠  ⁠100% Cotton 24s • 170 GSM⁠ • ⁠⁠Reguler Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 155000,
    images: [
      "/products_optimized/FIRST OF ALL/BLACK 1 JOSHO/FRONT.webp",
      "/products_optimized/FIRST OF ALL/BLACK 1 JOSHO/BACK.webp",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
  
    stock: 0
  },
  {
    id: "39",
    name: "Zuerst Tee - Benhur",
    description: "•⁠  ⁠100% Cotton 24s • 170 GSM⁠ • ⁠⁠Reguler Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 155000,
    images: [
      "/products_optimized/FIRST OF ALL 2/F ZUERST SS.webp",
      "/products_optimized/FIRST OF ALL 2/B ZUERST SS.webp",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],

    stock: 0
  },
  {
    id: "40",
    name: "Seva Tee - Black",
    description: "•⁠  ⁠100% Cotton 24s • 170 GSM⁠ • ⁠⁠Reguler Fit • Oil Based Screen Print Decoration⁠ • ⁠⁠Rooms Woven Label • ⁠⁠Finest Quality • ⁠⁠Made in Indonesia",
    price: 155000,
    images: [
      "/products_optimized/FIRST OF ALL 2/F SEVA TEE.webp",
      "/products_optimized/FIRST OF ALL 2/B SEVA TEE.webp",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],

    stock: 0
  },
  
];
