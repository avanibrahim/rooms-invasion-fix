import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Star, Plus, Minus, AlertCircle } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { toast } from '../hooks/use-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find(p => p.id === id);

  const uniqueImages = product ? product.images.filter(
    (img, index, self) => self.indexOf(img) === index
  ) : [];
  
  // Normalisasi ukuran agar mendukung struktur lama dan baru
const normalizedSizes = Array.isArray(product.sizes) && typeof product.sizes[0] === 'string'
? product.sizes.map(size => ({ size, stock: product.stock || 0 }))
: product.sizes;

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
            <button
              onClick={() => navigate('/shop')}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Shop
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isOutOfStock = (product.stock || 0) === 0;
  const isLowStock = (product.stock || 0) <= 5 && (product.stock || 0) > 0;
  const maxQuantity = Math.min(quantity, product.stock || 0);

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast({
        title: "Product out of stock",
        description: "This product is currently unavailable.",
        variant: "destructive",
      });
      return;
    }

    if (product.sizes && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "Size selection is required for this product.",
        variant: "destructive",
      });
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize || 'One Size',
      color: selectedColor || 'Colour-Wise',
      quantity: quantity,
      stock: product.stock || 0,
    };

    addItem(cartItem);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    if (isOutOfStock) {
      toast({
        title: "Product out of stock",
        description: "This product is currently unavailable.",
        variant: "destructive",
      });
      return;
    }
    
    handleAddToCart();
    setTimeout(() => {
      navigate('/checkout');
    }, 500);
  };

  const [showSizeChart, setShowSizeChart] = useState(false);


  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/shop')}
          className="text-lg md:text-xl font-semibold flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={24} />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Product Images */}
          <div className="space-y-4">

            {/* Main Image */}
            <div className="relative w-full h-100 bg-white rounded-lg overflow-hidden">
            <img
                src={uniqueImages[selectedImageIndex]}
                alt={product.name}
                className={`w-full h-100 object-cover ${isOutOfStock ? 'grayscale' : ''}`}
              />

              
              {/* Out of Stock Overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-red-700 px-6 py-3 rounded-lg">
                    <span className="text-white font-semibold">OUT OF STOCK</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
              {uniqueImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                 {uniqueImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-gray-900' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className={`w-full h-full object-cover ${isOutOfStock ? 'grayscale' : ''}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

            {/* Product Info */}
             <div className="space-y-2">
             <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
              </div>
              
              <p className="text-gray-600 mb-2">{product.brand}</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-gray-900">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-sm line-through text-gray-500">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">DESCRIPTION :</h3>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-list space-y-2 mb-4">
                {product.description
                  .split("•")
                  .map(item => item.trim())
                  .filter(item => item !== "")
                  .map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
              </ul>
            </div>

            {/* Size Chart Button */}
              {product.category !== "accessories" && (
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-white px-4 py-2 border rounded-lg transition-colors bg-gray-900"
                >
                  SIZE CHART
                </button>
              )}


          {showSizeChart && (
            <div
              onClick={() => setShowSizeChart(false)}
              className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
            >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-lg overflow-hidden shadow-lg animate-slide-up w-full max-w-md sm:max-w-lg"
            >
              {/* Tombol Close */}
              <button
                onClick={() => setShowSizeChart(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold z-10"
              >
                &times;
              </button>

              {/* Gambar Size Chart */}
                <div className="relative">
                  <img
                    src="/sizechart/sc.png"
                    alt="Size Chart"
                    className="w-full h-auto object-contain max-h-[90vh] sm:max-h-[80vh]"
                  />

                {/* Teks di bawah gambar */}
                <p className="text-center text-gray-700 text-sm mt-2 mb-4">
                  *Unit in centimeters
                </p>
                </div>
            </div>
          </div>
        )}


          {/* Size Selection */}
            {product.sizes && (
              <div>
                <div className="flex flex-wrap gap-2 pt-4">
                  {(
                    typeof product.sizes[0] === 'string'
                      ? (product.sizes as string[]).map((s) => ({ size: s, stock: product.stock }))
                      : (product.sizes as { size: string; stock: number }[])
                  ).map(({ size, stock }) => {
                    const isAvailable = stock > 0;

                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          !isAvailable
                            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                            : selectedSize === size
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}


            {/* Color Selection 
            {product.colors && (
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 pt-2">COLOUR :</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => !isOutOfStock && setSelectedColor(color)}
                      disabled={isOutOfStock}
                      className={`px-4 py-2 border rounded-lg transition-colors capitalize ${
                        isOutOfStock
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : selectedColor === color
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}*/}

            {/* Quantity 
            {!isOutOfStock && (
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 pt-2">QUANTITY</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {isLowStock && (
                  <p className="text-sm text-orange-600 mt-2">
                    Maximum quantity available: {product.stock}
                  </p>
                )}
              </div>
            )}*/}

            {/* Add to Cart Button */}
            <div className="space-y-4 pt-2 pb-2">
              {isOutOfStock ? (
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-4 px-6 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Out of Stock - Cannot Add to Cart
                  </button>
                  <div className="grid grid-cols-2 gap-4">          
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart - Rp {(product.price * quantity).toLocaleString('id-ID')}
                  </button>
                </>
              )}
            </div>

            {/* Product Details */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Issue:</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
