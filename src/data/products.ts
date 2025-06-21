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
    name: "Eternal Tee - White",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 210000,
    images: [
      "/products/HUSTLE & FLOW/ETERNAL TEE/FRONT.png",
      "/products/HUSTLE & FLOW/ETERNAL TEE/BACK.png",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.5,
    sizes: ["S", "M", "L", "XL"],
    colors: ["white"],
    stock: 25
  },
  {
    id: "2",
    name: "Love Mom Tee - Black",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 210000,
    images: [
      "/products/HUSTLE & FLOW/LOVE MOM TEE/FRONT.png",
      "/products/HUSTLE & FLOW/LOVE MOM TEE/BACK.png",
    ],
    category: "t-shirts",
    brand: "HUSTLE  & FLOW",
    rating: 4.8,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
    stock: 25 // Out of stock
  },
  {
    id: "3",
    name: "Mouth Tee - Black",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 210000,
    images: [
      "/products/HUSTLE & FLOW/MOUTH TEE/FRONT.png",
      "/products/HUSTLE & FLOW/MOUTH TEE/BACK.png",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.5,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
    stock: 10 // Low stock
  },
  {
    id: "4",
    name: "Still Tee - Black",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 210000,
    images: [
      "/products/HUSTLE & FLOW/STILL TEE BLACK/FRONT.png",
      "/products/HUSTLE & FLOW/STILL TEE BLACK/BACK.png",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.6,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
    stock: 15
  },
  {
    id: "5",
    name: "Still Tee - Navy",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/HUSTLE & FLOW/STILL TEE NAVY/FRONT.png",
      "/products/HUSTLE & FLOW/STILL TEE NAVY/BACK.png",
    ],
    category: "t-shirts",
    brand: "HUSTLE & FLOW",
    rating: 4.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["navy"],
    stock: 15 // Out of stock
  },
  {
    id: "6",
    name: "T-Shirts - Beige",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 210000,
    images: [
      "/products/FIRST OF ALL/BEIGE/FRONT.png",
      "/products/FIRST OF ALL/BEIGE/BACK.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    colors: ["beige"],
    stock: 8
  },
  {
    id: "7",
    name: "One Josho - Black",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 210000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.2,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
    stock: 2 // Low stock
  },
  {
    id: "8",
    name: "T-Shirt - Green",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 210000,
    images: [
      "/products/FIRST OF ALL/GREEN/FRONT.png",
      "/products/FIRST OF ALL/GREEN/BACK.png",
    ],
    category: "t-shirts",
    brand: "FIRST OF ALL",
    rating: 4.7,
    sizes: ["S", "M", "L", "XL"],
    colors: ["green"],
    stock: 20
  },
  {
    id: "9",
    name: "Long Sleeve - Navy",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 210000,
    images: [
      "/products/FIRST OF ALL/LONG SLEEVE NAVY/FRONT.png",
      "/products/FIRST OF ALL/LONG SLEEVE NAVY/BACK.png",
    ],
    category: "sleeves",
    brand: "FIRST OF ALL",
    rating: 4.6,
    sizes: ["S", "M", "L", "XL"],
    colors: ["navy"],
    stock: 0 // Out of stock
  },
  {
    id: "10",
    name: "Rush Hat - Black",
    description: "A comfortable and versatile black hats made from 100% cotton. Perfect for casual wear or layering.",
    price: 200000,
    images: [
      "/products/DUB NATION/RUSH HAT.png",
      "/products/DUB NATION/RUSH HAT ZOOM.png",
    ],
    category: "hats",
    brand: "DUB NATION",
    rating: 4.3,
    colors: ["black"],
    stock: 12
  },
  {
    id: "11",
    name: "T-Shirt - Yellow",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price:210000,
    images: [
      "/products/DUB NATION/KUNING FRONT.png",
      "/products/DUB NATION/KUNING BACK.png",
    ],
    category: "t-shirts",
    brand: "DUB NATION",
    rating: 4.8,
    colors: ["yellow"],
    stock: 1 // Very low stock
  },
  {
    id: "12",
    name: "Shirt - Black",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 250000,
    images: [
      "/products/DUB NATION/FRONT.png",
      "/products/DUB NATION/FRONT ZOOM.png",
    ],
    category: "shirts",
    brand: "DUB NATION",
    rating: 4.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
    stock: 18
  },
  {
    id: "13",
    name: "Grows Crewneck - Black",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 250000,
    images: [
      "/products/INVASION FROM THE EAST/GROWS CREWNECK/FRONT.png",
      "/products/INVASION FROM THE EAST/GROWS CREWNECK/FRONT.png",
    ],
    category: "crewnecks",
    brand: "INVASION FROM THE EAST",
    rating: 4.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
    stock: 18
  },
  {
    id: "14",
    name: "Inval 0435 Double Layer - Black",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 250000,
    images: [
      "/products/INVASION FROM THE EAST/INVAL 0435 DOUBLE LAYER/FRONT.png",
      "/products/INVASION FROM THE EAST/INVAL 0435 DOUBLE LAYER/BACK.png",
    ],
    category: "sleeves",
    brand: "INVASION FROM THE EAST",
    rating: 4.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
    stock: 18
  },
  {
    id: "15",
    name: "Hoodie - Black",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 250000,
    images: [
      "/products/REMARKS 0.1/ASET HOODIE/FRONT.png",
      "/products/REMARKS 0.1/ASET HOODIE/BACK.png",
    ],
    category: "hoodies",
    brand: "REMARKS 0.1",
    rating: 4.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
    stock: 0
  },
  {
    id: "16",
    name: "Nuovo Light - Grey",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 210000,
    images: [
      "/products/REMARKS 0.1/NUOVO LIGHT GREY/FRONT.png",
      "/products/REMARKS 0.1/NUOVO LIGHT GREY/BACK.png",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.1",
    rating: 4.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
    stock: 18
  },
  {
    id: "17",
    name: "Vyand Tee - Black",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 210000,
    images: [
      "/products/REMARKS 0.1/VYAND TEE/FRONT.png",
      "/products/REMARKS 0.1/VYAND TEE/BACK.png",
    ],
    category: "t-shirts",
    brand: "REMARKS 0.1",
    rating: 4.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
    stock: 18
  },

  
];
