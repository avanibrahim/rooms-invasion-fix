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

    if (product.colors && !selectedColor) {
      toast({
        title: "Please select a color",
        description: "Color selection is required for this product.",
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
      color: selectedColor || 'Default',
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full h-100 bg-white rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className={`w-full h-100 object-cover ${isOutOfStock ? 'grayscale' : ''}`}
              />
              
              {/* Out of Stock Overlay */}
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white px-6 py-3 rounded-lg">
                    <span className="text-gray-900 font-semibold">Out of Stock</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
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
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-full transition-colors ${
                    isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <p className="text-gray-600 mb-2">{product.brand}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.rating || 0}) • {Math.floor(Math.random() * 100) + 10} reviews
                </span>
              </div>
              
              <p className="text-3xl font-bold text-gray-900 mb-4">
                Rp {product.price.toLocaleString('id-ID')}
              </p>

              {/* Stock Status */}
              <div className="mb-4">
                {isOutOfStock ? (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle size={20} className="text-red-500" />
                    <span className="text-red-700 font-medium">Out of Stock</span>
                  </div>
                ) : isLowStock ? (
                  <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertCircle size={20} className="text-orange-500" />
                    <span className="text-orange-700 font-medium">
                      Only {product.stock} items left in stock
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-green-700 font-medium">✓ In Stock ({product.stock} available)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => !isOutOfStock && setSelectedSize(size)}
                      disabled={isOutOfStock}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        isOutOfStock
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
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
            )}

            {/* Quantity */}
            {!isOutOfStock && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
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
            )}

            {/* Add to Cart Button */}
            <div className="space-y-4">
              {isOutOfStock ? (
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-4 px-6 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Out of Stock - Cannot Add to Cart
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => {
                        toast({
                          title: "Added to wishlist!",
                          description: "We'll notify you when this item is back in stock.",
                        });
                        setIsWishlisted(true);
                      }}
                      className="bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Notify When Available
                    </button>
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="border border-gray-300 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
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
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={handleBuyNow}
                      className="bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Buy Now
                    </button>
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="border border-gray-300 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
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
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock:</span>
                  <span className={`font-medium ${isOutOfStock ? 'text-red-500' : isLowStock ? 'text-orange-500' : 'text-green-500'}`}>
                    {isOutOfStock ? 'Out of Stock' : `${product.stock} items`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium">{product.id.toUpperCase()}</span>
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
