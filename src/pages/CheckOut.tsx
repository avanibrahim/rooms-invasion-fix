import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, Plus, Minus, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { toast } from '../hooks/use-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();
  
  const [formData, setFormData] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Shipping Address
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Indonesia',
    // Payment
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const [shippingOption, setShippingOption] = useState<'pickup' | 'flat'>('pickup');
  const shippingCost = shippingOption === 'flat' ? 20000 : 0;

  const tax = 0; // kalau kamu belum pakai tax, biarkan nol
  const totalAmount = getTotalPrice() + shippingCost + tax;


  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Review



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (id: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id, size, color);
    } else {
      updateQuantity(id, size, color, newQuantity);
    }
  };

  const validateStep1 = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'province', 'postalCode'];
    return required.every(field => formData[field as keyof typeof formData].trim() !== '');
  };

  const validateStep2 = () => {
    if (formData.paymentMethod === 'credit-card') {
      return formData.cardNumber && formData.expiryDate && formData.cvv && formData.cardName;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) {
      toast({
        title: "Please fill all required fields",
        description: "All shipping information is required.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && !validateStep2()) {
      toast({
        title: "Please complete payment information",
        description: "All payment fields are required.",
        variant: "destructive",
      });
      return;
    }
    
    setStep(step + 1);
  };

  const generateOrderNumber = () => {
    return 'TZ-' + Date.now().toString().slice(-8);
  };

  const formatOrderMessage = (orderNumber: string) => {
    const itemsList = items.map(item => 
      `• ${item.name} (${item.size}, ${item.color}) x${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`
    ).join('\n');

    const paymentMethodText = {
      'qris': 'QRIS',
      'bank-transfer': 'Bank Transfer', 
      'cod': 'Cash on Delivery'
    }[formData.paymentMethod];

    const shippingMethodText = shippingOption === 'pickup' ? 'Pick Up in Store (Gratis)' : 'Flat Rate (Rp20.000)';
    

    return `*PESANAN BARU*

    *Order Number:* ${orderNumber}
    
    *Informasi Customer:*
    Nama: ${formData.firstName} ${formData.lastName}
    Email: ${formData.email}
    Phone: ${formData.phone}
    
    *Alamat Pengiriman:*
    ${formData.address}
    ${formData.city}, ${formData.province} ${formData.postalCode}
    ${formData.country}
    
    *Item Pesanan:*
    ${itemsList}
    
    *Ringkasan Pembayaran:*
    Metode Pengiriman: ${shippingMethodText}
    Subtotal: Rp ${getTotalPrice().toLocaleString('id-ID')}
    Ongkir: Rp ${shippingCost.toLocaleString('id-ID')}
    Pajak (10%): Rp ${tax.toLocaleString('id-ID')}
    *Total: Rp ${totalAmount.toLocaleString('id-ID')}*
    
    *Metode Pembayaran:* ${paymentMethodText}
    
    Mohon konfirmasi pesanan ini. Terima kasih!`;
    
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Check for out of stock items
      const outOfStockItems = items.filter(item => item.stock === 0);
      if (outOfStockItems.length > 0) {
        toast({
          title: "Cannot place order",
          description: "Please remove out of stock items from your cart.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Generate order number
      const orderNumber = generateOrderNumber();
      const whatsappMessage = formatOrderMessage(orderNumber);
      
      // WhatsApp admin number
      const whatsappNumber = "6281355062230";
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Clear cart first
      clearCart();
      
      // Show success notification
      toast({
        title: "Pesanan berhasil dibuat! ✅",
        description: "Anda akan diarahkan ke WhatsApp untuk konfirmasi dengan admin.",
        variant: "success",
      });
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Wait a bit then redirect to home
      setTimeout(() => {
        navigate('/');
        
        // Show final success notification
        toast({
          title: "Terima kasih!",
          description: "Pesanan Anda telah dikirim ke admin. Silakan cek WhatsApp untuk konfirmasi.",
          variant: "success",
        });
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Order failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);


  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Add some items to your cart to proceed with checkout.</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-8 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
          Back to Shop
        </button>

        {/* Progress Steps - Responsive */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between sm:justify-center sm:space-x-8 overflow-x-auto pb-2">
            {[
              { number: 1, title: 'Shipping', fullTitle: 'Shipping Info' },
              { number: 2, title: 'Payment', fullTitle: 'Payment' },
              { number: 3, title: 'Review', fullTitle: 'Review Order' }
            ].map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center flex-shrink-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                  step >= stepItem.number 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepItem.number}
                </div>
                <span className={`ml-2 font-medium text-xs sm:text-base ${
                  step >= stepItem.number ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  <span className="sm:hidden">{stepItem.title}</span>
                  <span className="hidden sm:inline">{stepItem.fullTitle}</span>
                </span>
                {index < 2 && (
                  <div className={`w-8 sm:w-16 h-0.5 ml-2 sm:ml-4 ${
                    step > stepItem.number ? 'bg-gray-900' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              
              {/* Step 1: Shipping Information */}
              {step === 1 && (
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Shipping Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-base sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-base sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-base sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-base sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-base sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-base sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province *
                    </label>
                    <input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-base sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-base sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>
            )}


              {/* Step 2: Payment Information */}
              {step === 2 && (
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Payment Information</h2>
                  
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Payment Method
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="qris"
                          checked={formData.paymentMethod === 'qris'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <CreditCard size={18} className="mr-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base">QRIS</span>
                      </label>
                      
                      <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank-transfer"
                          checked={formData.paymentMethod === 'bank-transfer'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <Truck size={18} className="mr-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Bank Transfer</span>
                      </label>

                      
                    </div>
                  </div>

                  {formData.paymentMethod === 'qris' && (
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-black mb-2 text-sm sm:text-base">Scan QRIS</h4>
                      <p className="text-black text-xs sm:text-sm mb-4">
                      Please transfer the total amount:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                          <img
                            src="/image/qris.JPG" // ganti path sesuai file kamu
                            alt="QRIS"
                            className="h-40 w-40 object-contain mb-3"
                          />
                          <div className="text-center">
                            <div className="font-bold text-base text-gray-900">SCAN ME!</div>
                            <div className="text-sm font-mono tracking-wider text-gray-700">LITTLE YARD</div>
                            <div className="text-xs text-gray-500">NMID : ID1024310154884</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'bank-transfer' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-black mb-2 text-sm sm:text-base">Bank Transfer Instructions</h4>
                      <p className="text-black text-xs sm:text-sm mb-4">
                        Please transfer the total amount to one of the following bank accounts:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* BCA */}
                        <div className="flex items-center bg-white rounded-xl shadow p-3">
                          <div className="flex-shrink-0 bg-white rounded-full p-2">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1280px-Bank_Central_Asia.svg.png"
                              alt="BCA"
                              className="h-10 w-10 object-contain"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-bold text-base text-gray-900">BCA</div>
                            <div className="text-sm font-mono tracking-wider text-gray-700">7975354822</div>
                            <div className="text-xs text-gray-500">a.n. Dwi Nanda Mulia</div>
                          </div>
                        </div>
                        {/* BNI */}
                        <div className="flex items-center bg-white rounded-xl shadow p-3">
                          <div className="flex-shrink-0 bg-white rounded-full p-2">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png"
                              alt="BNI"
                              className="h-10 w-10 object-contain"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-bold text-base text-gray-900">BNI</div>
                            <div className="text-sm font-mono tracking-wider text-gray-700">1886334981</div>
                            <div className="text-xs text-gray-500">a.n. Dwi Nanda Mulia</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}


                  {formData.paymentMethod === 'cod' && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">Cash on Delivery</h4>
                      <p className="text-green-800 text-xs sm:text-sm">
                        You will pay when the order is delivered to your address. 
                        Please prepare the exact amount: <strong>Rp {totalAmount.toLocaleString('id-ID')}</strong>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review Order */}
              {step === 3 && (
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Review Your Order</h2>
                  
                  {/* Shipping Information Review */}
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Shipping Information</h3>
                    <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Phone:</strong> {formData.phone}</p>
                      <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.province} {formData.postalCode}</p>
                    </div>
                  </div>

                  {/* Payment Method Review */}
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Payment Method</h3>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {formData.paymentMethod === 'credit-card' && (
                        <p>Credit Card ending in {formData.cardNumber.slice(-4)}</p>
                      )}
                      {formData.paymentMethod === 'bank-transfer' && (
                        <p>Bank Transfer</p>
                      )}
                      {formData.paymentMethod === 'cod' && (
                        <p>Cash on Delivery</p>
                      )}
                    </div>
                  </div>

                  {/* Order Items Review */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Order Items</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2">{item.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">
                              Size: {item.size} | Color: {item.color}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">
                              Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Confirmation Notice */}
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Order Confirmation</h3>
                    <div className="text-xs sm:text-sm text-gray-600">
                      <p className="mb-2">
                        Setelah menekan tombol "Place Order", Anda akan diarahkan ke WhatsApp untuk konfirmasi pesanan dengan admin kami, Sertakan bukti pembayaran.
                      </p>
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                      <img
                          src="https://cdn4.iconfinder.com/data/icons/picons-social/57/23-whatsapp-2-512.png"
                          alt="WhatsApp"
                          className="h-4 w-4 sm:h-6 sm:w-6 object-contain"
                        />
                        WhatsApp Admin: +6285166369467
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 sm:pt-6 border-t">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  >
                                     Previous
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="w-full sm:w-auto sm:ml-auto px-4 sm:px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || items.some(item => item.stock === 0)}
                    className="w-full sm:w-auto sm:ml-auto px-4 sm:px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        
                        Place Order
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              {/* Cart Items - Mobile Optimized */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 max-h-60 sm:max-h-80 overflow-y-auto">
                {items.map((item) => {
                  const isOutOfStock = item.stock === 0;
                  const isLowStock = item.stock <= 5 && item.stock > 0;
                  
                  return (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border border-gray-100 rounded-lg">
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className={`w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg ${isOutOfStock ? 'grayscale' : ''}`}
                        />
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                            <span className="text-red-600 text-xs font-bold">OUT</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium text-xs sm:text-sm line-clamp-2 ${isOutOfStock ? 'text-gray-500' : 'text-gray-900'}`}>
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.size} | {item.color}
                        </p>
                        
                        {/* Stock Status */}
                        {isOutOfStock ? (
                          <p className="text-xs text-red-500 font-medium mt-1">Out of Stock</p>
                        ) : isLowStock ? (
                          <p className="text-xs text-orange-500 font-medium mt-1">Low Stock ({item.stock} left)</p>
                        ) : (
                          <p className="text-xs text-green-500 font-medium mt-1">In Stock</p>
                        )}
                        
                        {/* Quantity Controls - Mobile Optimized */}
                        <div className="flex items-center gap-1 sm:gap-2 mt-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity - 1)}
                            disabled={isOutOfStock}
                            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus size={10} className="sm:w-3 sm:h-3" />
                          </button>
                          <span className="text-xs sm:text-sm font-medium w-6 sm:w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity + 1)}
                            disabled={isOutOfStock || item.quantity >= item.stock}
                            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus size={10} className="sm:w-3 sm:h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id, item.size, item.color)}
                            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-red-500 hover:bg-red-50 rounded ml-1 sm:ml-2"
                          >
                            <X size={10} className="sm:w-3 sm:h-3" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <p className={`font-semibold text-xs sm:text-sm ${isOutOfStock ? 'text-gray-500' : 'text-gray-900'}`}>
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Check for out of stock items */}
              {items.some(item => item.stock === 0) && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-xs sm:text-sm font-medium">
                    ⚠️ Some items in your cart are out of stock. Please remove them to continue.
                  </p>
                </div>
              )}

              {/* Shipping Method Selection */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Select shipping method:</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShippingOption('pickup')}
                      className={`px-3 py-1 rounded-full border text-xs sm:text-sm transition ${
                        shippingOption === 'pickup'
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      Pick Up in Store
                    </button>
                    <button
                      onClick={() => setShippingOption('flat')}
                      className={`px-3 py-1 rounded-full border text-xs sm:text-sm transition ${
                        shippingOption === 'flat'
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      Flat Rate Rp20.000
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                  </div>

                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingOption === 'pickup'
                        ? 'Rp 0'
                        : `Rp ${shippingCost.toLocaleString('id-ID')}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium">Rp {tax.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">Total</span>
                      <span className="font-bold text-base sm:text-lg text-gray-900">
                        Rp {totalAmount.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>


              {/* Security Badge */}
              <div className="mt-4 sm:mt-6 p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="sm:w-4 sm:h-4 text-black flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-800 font-medium">
                    Secure Checkout
                  </span>
                </div>
                <p className="text-xs text-gray-700 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>

              {/* Shipping Info */}
              <div className="mt-3 sm:mt-4 p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <Truck size={14} className="sm:w-4 sm:h-4 text-black flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-800 font-medium">
                    Free Returns
                  </span>
                </div>
                <p className="text-xs text-gray-700 mt-1">
                  30-day return policy on all items
                </p>
              </div>

              {/* WhatsApp Contact Info */}
              <div className="mt-3 sm:mt-4 p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/picons-social/57/23-whatsapp-2-512.png"
                    alt="WhatsApp"
                    className="h-4 w-4 sm:h-6 sm:w-6 object-contain"
                  />
                  <span className="text-xs sm:text-sm text-gray-800 font-medium">
                    WhatsApp Support
                  </span>
                </div>
                <p className="text-xs text-gray-700 mt-1">
                  Need help? Contact us via WhatsApp for instant support
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
