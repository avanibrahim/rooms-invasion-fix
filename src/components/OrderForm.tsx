
import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { useOrderStore, OrderFormData } from '../store/orderStore';
import { useCartStore } from '../store/cartStore';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const OrderForm = () => {
  const { isOrderFormOpen, closeOrderForm, setOrderData } = useOrderStore();
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  const form = useForm<OrderFormData>({
    defaultValues: {
      customerName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      notes: '',
    },
  });

  const onSubmit = (data: OrderFormData) => {
    setOrderData(data);
    
    // Generate WhatsApp message with order form data
    const message = `*PESANAN BARU - RoomsInvasion*

*Data Pelanggan:*
Nama: ${data.customerName}
Telepon: ${data.phone}
Email: ${data.email}
Alamat: ${data.address}, ${data.city} ${data.postalCode}

*Detail Pesanan:*
${items.map(item => 
  `• ${item.name}\n  Size: ${item.size} | Color: ${item.color}\n  Qty: ${item.quantity} × Rp ${item.price.toLocaleString('id-ID')}\n  Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`
).join('\n\n')}

*Total: Rp ${getTotalPrice().toLocaleString('id-ID')}*

${data.notes ? `*Catatan:* ${data.notes}` : ''}

*Waktu Order:* ${new Date().toLocaleString('id-ID')}

Mohon konfirmasi pesanan ini. Terima kasih!`;

    const whatsappNumber = '62895712166699';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and close form after successful order
    clearCart();
    closeOrderForm();
    form.reset();
  };

  if (!isOrderFormOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={closeOrderForm}
      />
      
      {/* Form Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Form Pesanan</h2>
            <button
              onClick={closeOrderForm}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
              <FormField
                control={form.control}
                name="customerName"
                rules={{ required: "Nama wajib diisi" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap *</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                rules={{ 
                  required: "Nomor telepon wajib diisi",
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Format nomor telepon tidak valid"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon *</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: 08123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                rules={{ 
                  required: "Email wajib diisi",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Format email tidak valid"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="contoh@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                rules={{ required: "Alamat wajib diisi" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Lengkap *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Masukkan alamat lengkap untuk pengiriman" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  rules={{ required: "Kota wajib diisi" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kota *</FormLabel>
                      <FormControl>
                        <Input placeholder="Kota" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  rules={{ required: "Kode pos wajib diisi" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Pos *</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catatan (Opsional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tambahkan catatan khusus untuk pesanan Anda" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Order Summary */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Ringkasan Pesanan:</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                      <span>{item.name} ({item.size}, {item.color}) x{item.quantity}</span>
                      <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-semibold flex justify-between">
                    <span>Total:</span>
                    <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Pesan via WhatsApp
              </button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default OrderForm;
