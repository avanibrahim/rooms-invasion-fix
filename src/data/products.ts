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
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "t-shirts",
    brand: "BasicWear",
    rating: 4.5,
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "black", "gray"],
    stock: 25
  },
  {
    id: "2",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "jackets",
    brand: "DenimCo",
    rating: 4.8,
    sizes: ["S", "M", "L", "XL"],
    colors: ["blue", "black"],
    stock: 0 // Out of stock
  },
  {
    id: "3",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "dresses",
    brand: "FloralFashion",
    rating: 4.3,
    sizes: ["XS", "S", "M", "L"],
    colors: ["floral", "navy", "pink"],
    stock: 3 // Low stock
  },
  {
    id: "4",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "shoes",
    brand: "ComfortStep",
    rating: 4.6,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
    colors: ["white", "black", "gray"],
    stock: 15
  },
  {
    id: "5",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "bags",
    brand: "LuxeLeather",
    rating: 4.9,
    colors: ["brown", "black", "tan"],
    stock: 0 // Out of stock
  },
  {
    id: "6",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "sweaters",
    brand: "WarmWear",
    rating: 4.4,
    sizes: ["S", "M", "L", "XL"],
    colors: ["navy", "gray", "burgundy"],
    stock: 8
  },
  {
    id: "7",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "jeans",
    brand: "DenimCo",
    rating: 4.2,
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["dark blue", "light blue", "black"],
    stock: 2 // Low stock
  },
  {
    id: "8",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "activewear",
    brand: "ActiveFit",
    rating: 4.7,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["black", "pink", "purple"],
    stock: 20
  },
  {
    id: "9",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "blazers",
    brand: "ProfessionalWear",
    rating: 4.6,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "navy", "gray"],
    stock: 0 // Out of stock
  },
  {
    id: "10",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "bags",
    brand: "UrbanCarry",
    rating: 4.3,
    colors: ["khaki", "black", "navy"],
    stock: 12
  },
  {
    id: "11",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "accessories",
    brand: "SilkLux",
    rating: 4.8,
    colors: ["floral", "geometric", "solid"],
    stock: 1 // Very low stock
  },
  {
    id: "12",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% cotton. Perfect for casual wear or layering.",
    price: 150000,
    images: [
      "/products/FIRST OF ALL/BLACK 1 JOSHO/FRONT.png",
      "/products/FIRST OF ALL/BLACK 1 JOSHO/BACK.png",
    ],
    category: "shoes",
    brand: "RunTech",
    rating: 4.9,
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    colors: ["black", "white", "blue"],
    stock: 18
  }
];
