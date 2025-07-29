// /types/Product.ts
export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category: string;
    brand: string;
    stock: number;
    sizes?: { size: string; stock: number }[];
    // Optional:
    createdAt?: number;
  };
  
