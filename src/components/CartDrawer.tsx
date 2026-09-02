import React, { useState } from 'react';
import { CartItem } from '../types';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  CheckCircle,
  Truck,
  CreditCard,
  Phone,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/siteData';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onOpenQuoteModal: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('Nairobi CBD / Upper Hill');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'bank' | 'invoice'>('mpesa');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderReference, setOrderReference] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee =
    deliveryLocation.includes('Nairobi CBD')
      ? 200
      : deliveryLocation.includes('Environs')
      ? 450
      : 700;
  const grandTotal = subtotal + (items.length > 0 ? deliveryFee : 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const ref = `NF-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderReference(ref);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E50914', '#000000', '#FFFFFF', '#10B981'],
      });
    }, 1200);
  };

  const generateWhatsAppOrderText = () => {
    const lines = [
      `*NEW ORDER - NOMADS FOOTPRINTS TECHNOLOGY*`,
      `Order Ref: ${orderReference || 'NEW-ORDER'}`,
      `Customer: ${customerName || 'Customer'}`,
      `Phone: ${customerPhone || mpesaNumber || 'N/A'}`,
      `Delivery: ${deliveryLocation}`,
      `Payment Mode: ${paymentMethod.toUpperCase()}`,
      `--------------------------------`,
      `*ORDERED ITEMS:*`,
    ];

    items.forEach((item, idx) => {
      lines.push(
        `${idx + 1}. ${item.productName} (Qty: ${item.quantity})` +
          (item.size ? ` | Size: ${item.size}` : '') +
          (item.material ? ` | Mat: ${item.material}` : '') +
          (item.finish ? ` | Finish: ${item.finish}` : '') +
          ` => KSh ${item.totalPrice.toLocaleString()}`
      );
    });

    lines.push(`--------------------------------`);
    lines.push(`Subtotal: KSh ${subtotal.toLocaleString()}`);
    lines.push(`Delivery Fee: KSh ${deliveryFee.toLocaleString()}`);
    lines.push(`*GRAND TOTAL: KSh ${grandTotal.toLocaleString()}*`);
    lines.push(
      `\nPlease confirm artwork upload and order scheduling. Thank you!`
    );

    return encodeURIComponent(lines.join('\n'));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-white/10 text-neutral-100 shadow-2xl flex flex-col rounded-none">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 bg-black flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-neutral-900 border border-white/10 flex items-center justify-center text-red-600 rounded-none">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white">
                  {step === 'cart'
                    ? 'Your Cart'
                    : step === 'checkout'
                    ? 'Complete Order'
                    : 'Order Confirmed'}
                </h3>
                <p className="text-[11px] text-neutral-400 uppercase tracking-wider">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your bag
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1.5 bg-neutral-900 border border-white/10 rounded-none"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-neutral-950">
            {step === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto text-neutral-500 rounded-none">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-heading font-black text-base text-white uppercase tracking-wider">
                        Your cart is empty
                      </h4>
                      <p className="text-xs text-neutral-400 max-w-xs mx-auto mt-1">
                        Explore our printing, branding, and digital design catalog to customize your order.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-none"
                    >
                      <span>Explore Shop</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.cartId}
                        className="bg-black border border-white/10 p-3.5 space-y-2 relative group hover:border-red-600 transition-colors rounded-none"
                      >
                        <div className="flex justify-between items-start pr-6">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold">
                              {item.category}
                            </span>
                            <h5 className="font-heading font-black text-xs uppercase tracking-wider text-white">
                              {item.productName}
                            </h5>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.cartId)}
                            className="text-neutral-500 hover:text-red-500 p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Specs summary */}
                        <div className="text-[11px] text-neutral-400 space-y-0.5 bg-neutral-900 p-2 border border-white/10 rounded-none">
                          {item.size && <div>Size: <span className="text-neutral-200">{item.size}</span></div>}
                          {item.material && <div>Material: <span className="text-neutral-200">{item.material}</span></div>}
                          {item.finish && <div>Finish: <span className="text-neutral-200">{item.finish}</span></div>}
                          {item.artworkFileName && (
                            <div className="text-emerald-400">Artwork: {item.artworkFileName}</div>
                          )}
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center border border-white/10 rounded-none overflow-hidden bg-neutral-900">
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.cartId,
                                  Math.max(1, item.quantity - (item.category.includes('Business') ? 50 : 1))
                                )
                              }
                              className="px-2.5 py-1 text-neutral-400 hover:text-white hover:bg-neutral-800"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.cartId,
                                  item.quantity + (item.category.includes('Business') ? 50 : 1)
                                )
                              }
                              className="px-2.5 py-1 text-neutral-400 hover:text-white hover:bg-neutral-800"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-red-500 font-heading">
                              KSh {item.totalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={onClearCart}
                        className="text-xs text-neutral-500 hover:text-red-500 uppercase tracking-wider"
                      >
                        Clear all items
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 'checkout' && (
              <form id="cart-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="bg-black p-3.5 border border-white/10 text-xs space-y-1 rounded-none">
                  <div className="flex justify-between text-neutral-400">
                    <span>Items Subtotal:</span>
                    <span className="text-white font-semibold">KSh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Delivery ({deliveryLocation}):</span>
                    <span className="text-white font-semibold">KSh {deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/10 pt-1.5 flex justify-between text-sm font-bold text-red-500">
                    <span>Grand Total:</span>
                    <span>KSh {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Samuel Kiprotich"
                      className="w-full bg-black border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600 rounded-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                        Phone (M-Pesa) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0752 634 016"
                        className="w-full bg-black border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600 rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="name@business.co.ke"
                        className="w-full bg-black border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600 rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Delivery Region in Kenya *
                    </label>
                    <select
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      className="w-full bg-black border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600 rounded-none"
                    >
                      <option value="Nairobi CBD / Upper Hill / Westlands">Nairobi CBD / Westlands / Upper Hill (KSh 200)</option>
                      <option value="Nairobi Environs (Thika, Rongai, Kitengela, Kiambu)">Nairobi Environs (Thika, Kiambu, Rongai) (KSh 450)</option>
                      <option value="Upcountry Express Courier (Mombasa, Nakuru, Kisumu, Eldoret)">Upcountry Express Courier (Coast, Rift Valley, Western) (KSh 700)</option>
                      <option value="Self Pickup at Nairobi Workshop">Self Pickup at Nairobi Workshop (Free)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Payment Preference *
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('mpesa')}
                        className={`p-2 border text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1 rounded-none ${
                          paymentMethod === 'mpesa'
                            ? 'bg-red-600 border-red-600 text-white'
                            : 'bg-black border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Phone className="w-4 h-4" />
                        <span>M-Pesa</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bank')}
                        className={`p-2 border text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1 rounded-none ${
                          paymentMethod === 'bank'
                            ? 'bg-red-600 border-red-600 text-white'
                            : 'bg-black border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Card/Bank</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('invoice')}
                        className={`p-2 border text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1 rounded-none ${
                          paymentMethod === 'invoice'
                            ? 'bg-red-600 border-red-600 text-white'
                            : 'bg-black border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Truck className="w-4 h-4" />
                        <span>Corporate PO</span>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'mpesa' && (
                    <div className="bg-black border border-white/10 p-3 text-xs space-y-1 rounded-none">
                      <p className="font-bold text-red-500 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                        <Sparkles className="w-3.5 h-3.5" />
                        Instant M-Pesa STK Prompt
                      </p>
                      <p className="text-neutral-400 text-xs">
                        An M-Pesa PIN prompt will be sent to your phone upon order confirmation.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="w-1/3 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 text-xs font-bold uppercase tracking-wider py-2.5 rounded-none"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-2/3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest py-2.5 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 rounded-none"
                  >
                    {isProcessing ? 'Processing...' : 'Confirm Order'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {step === 'success' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-neutral-900 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 rounded-none">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs bg-neutral-900 text-red-500 px-3 py-1 border border-white/10 font-mono font-bold uppercase tracking-wider inline-block">
                    REF: {orderReference}
                  </span>
                  <h4 className="font-heading font-black text-lg text-white mt-3 uppercase tracking-wider">
                    Order Received Successfully!
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto mt-1 leading-relaxed">
                    Thank you {customerName}! Nomads Footprints Technology production team has logged your order.
                  </p>
                </div>

                {/* Direct WhatsApp Action */}
                <div className="p-4 bg-black border border-white/10 space-y-3 text-left text-xs rounded-none">
                  <p className="font-bold text-white uppercase tracking-wider text-[11px]">Instant WhatsApp Confirmation:</p>
                  <p className="text-neutral-400">
                    Send this order directly to our WhatsApp queue (+254 752 634 016) for instant artwork verification:
                  </p>
                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${generateWhatsAppOrderText()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 uppercase tracking-widest shadow-md text-xs rounded-none"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order to WhatsApp</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    onClearCart();
                    setStep('cart');
                    onClose();
                  }}
                  className="text-xs text-neutral-400 hover:text-white uppercase tracking-widest pt-2 block mx-auto"
                >
                  Close &amp; Continue Browsing
                </button>
              </div>
            )}
          </div>

          {/* Footer (Cart Step only) */}
          {step === 'cart' && items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-white/10 bg-black space-y-3 rounded-none">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal:</span>
                  <span className="text-white font-semibold">
                    KSh {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Est. Delivery:</span>
                  <span className="text-white font-semibold">
                    KSh {deliveryFee.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-1.5 flex justify-between text-base font-black text-red-500 font-heading">
                  <span>Total:</span>
                  <span>KSh {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                id="cart-proceed-checkout"
                onClick={() => setStep('checkout')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 uppercase text-xs tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all rounded-none"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
