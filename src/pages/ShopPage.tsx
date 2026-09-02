import React, { useState } from 'react';
import { PageId, ShopProduct, CartItem } from '../types';
import { SHOP_PRODUCTS } from '../data/siteData';
import {
  ShoppingBag,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Upload,
  Plus,
  Minus,
  X,
  FileCheck,
  Truck,
  ShieldCheck,
  Tag,
  MessageCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShopPageProps {
  onNavigate: (page: PageId) => void;
  onAddToCart: (item: CartItem) => void;
  onOpenCart: () => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onNavigate,
  onAddToCart,
  onOpenCart,
  onOpenQuoteModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);

  // Customizer state
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedQty, setSelectedQty] = useState<number>(100);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [needDesignHelp, setNeedDesignHelp] = useState<boolean>(false);
  const [artworkFileName, setArtworkFileName] = useState<string>('');
  const [deliveryRegion, setDeliveryRegion] = useState<string>('Nairobi CBD / Upper Hill');
  const [notes, setNotes] = useState<string>('');

  const categories = [
    'All',
    'Business Printing',
    'Marketing Materials',
    'Branding',
    'Graphic Design',
    'Digital Services',
  ];

  const filteredProducts =
    activeCategory === 'All'
      ? SHOP_PRODUCTS
      : SHOP_PRODUCTS.filter((p) => p.category === activeCategory);

  const handleOpenCustomizer = (prod: ShopProduct) => {
    setSelectedProduct(prod);
    setSelectedSize(prod.options.sizes ? prod.options.sizes[0] : '');
    setSelectedQty(prod.options.quantities ? prod.options.quantities[0] : 1);
    setSelectedMaterial(prod.options.materials ? prod.options.materials[0] : '');
    setSelectedFinish(prod.options.finishes ? prod.options.finishes[0] : '');
    setNeedDesignHelp(false);
    setArtworkFileName('');
    setNotes('');
  };

  const calculateCustomPrice = () => {
    if (!selectedProduct) return 0;
    let base = selectedProduct.basePrice;

    // Unit scaling
    if (selectedProduct.unit.includes('pack of 100')) {
      base = (selectedProduct.basePrice / 100) * selectedQty;
    } else if (selectedProduct.unit.includes('pack of 500')) {
      base = (selectedProduct.basePrice / 500) * selectedQty;
    } else if (selectedProduct.unit.includes('per piece') || selectedProduct.unit.includes('per copy') || selectedProduct.unit.includes('per mug') || selectedProduct.unit.includes('piece')) {
      base = selectedProduct.basePrice * selectedQty;
      // Volume discounts for items over 50 pcs
      if (selectedQty >= 50) base *= 0.92;
      if (selectedQty >= 100) base *= 0.88;
    }

    if (needDesignHelp) {
      base += 1500; // Design prep fee
    }

    return Math.round(base);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const total = calculateCustomPrice();
    const newItem: CartItem = {
      cartId: `item-${Date.now()}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      category: selectedProduct.category,
      size: selectedSize || undefined,
      quantity: selectedQty,
      material: selectedMaterial || undefined,
      finish: selectedFinish || undefined,
      customArtwork: !needDesignHelp,
      artworkFileName: artworkFileName || (needDesignHelp ? 'Requested Nomads Design Team' : undefined),
      deliveryLocation: deliveryRegion,
      unitPrice: Math.round(total / (selectedQty || 1)),
      totalPrice: total,
      notes: notes || undefined,
    };

    onAddToCart(newItem);
    setSelectedProduct(null);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E50914', '#10B981', '#FFFFFF'],
    });
    onOpenCart();
  };

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-800/40 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <ShoppingBag className="w-3.5 h-3.5 text-red-500" />
            ONLINE PRINTING &amp; DESIGN SHOP
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            ORDER PRINTING &amp; BRANDING ONLINE
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Customize specifications, upload artwork, view instant price calculations in KSh, and receive swift delivery anywhere in Kenya.
          </p>
        </div>

        {/* 8-Step Process Bar (Section 7) */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 mb-14 shadow-xl">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
            <span className="text-xs font-extrabold text-red-500 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              ONLINE ORDER PROCESS
            </span>
            <span className="text-xs text-neutral-400">Step 1 to Step 8 Workflow</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
            {[
              { s: '01', title: 'Choose Product', sub: 'Select service' },
              { s: '02', title: 'Specifications', sub: 'Size, Qty, Material' },
              { s: '03', title: 'Upload Artwork', sub: 'Or request design' },
              { s: '04', title: 'Add to Cart', sub: 'Or request quote' },
              { s: '05', title: 'Confirm Order', sub: 'Verify review' },
              { s: '06', title: 'Make Payment', sub: 'M-Pesa / Bank' },
              { s: '07', title: 'Processing', sub: 'Precision printing' },
              { s: '08', title: 'Delivered', sub: 'Doorstep / Pick' },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80 space-y-1"
              >
                <span className="text-red-500 font-heading font-black text-sm block">
                  STEP {step.s}
                </span>
                <p className="font-bold text-xs text-white leading-tight">{step.title}</p>
                <p className="text-[10px] text-neutral-400">{step.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                activeCategory === cat
                  ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-950/60'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-neutral-900 border border-neutral-800 hover:border-red-600/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group shadow-xl hover:shadow-2xl hover:shadow-red-950/40"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-neutral-950">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />
                  {prod.popular && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-md">
                      Best Seller
                    </span>
                  )}
                  <span className="absolute bottom-2.5 left-3 text-red-400 font-heading font-extrabold text-sm bg-neutral-950/80 px-2.5 py-1 rounded-md border border-neutral-800">
                    From KSh {prod.basePrice.toLocaleString()}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-neutral-400">
                    {prod.category}
                  </span>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-red-400 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 mt-auto">
                <button
                  onClick={() => handleOpenCustomizer(prod)}
                  className="w-full bg-neutral-950 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl border border-neutral-800 hover:border-red-600 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-red-500 group-hover:text-white" />
                  <span>Customize &amp; Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PRODUCT CUSTOMIZER MODAL */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
            <div className="relative w-full max-w-2xl bg-neutral-900 border border-red-900/50 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 my-8">
              {/* Header */}
              <div className="bg-neutral-950 p-5 border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">
                    CONFIGURE PRODUCT
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-white">
                    {selectedProduct.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-neutral-400 hover:text-white p-2 rounded-xl bg-neutral-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5 text-xs">
                {/* Quantity */}
                <div>
                  <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Quantity / Volume:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.options.quantities.map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setSelectedQty(qty)}
                        className={`px-3.5 py-2 rounded-lg border font-bold ${
                          selectedQty === qty
                            ? 'bg-red-600 border-red-500 text-white'
                            : 'bg-neutral-950 border-neutral-700 text-neutral-300 hover:text-white'
                        }`}
                      >
                        {qty} {selectedProduct.category.includes('Business') ? 'pcs' : 'units'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                {selectedProduct.options.sizes && (
                  <div>
                    <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Size &amp; Format:
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500"
                    >
                      {selectedProduct.options.sizes.map((sz) => (
                        <option key={sz} value={sz}>
                          {sz}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Materials */}
                {selectedProduct.options.materials && (
                  <div>
                    <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Material / Paper Stock:
                    </label>
                    <select
                      value={selectedMaterial}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500"
                    >
                      {selectedProduct.options.materials.map((mat) => (
                        <option key={mat} value={mat}>
                          {mat}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Finishes */}
                {selectedProduct.options.finishes && (
                  <div>
                    <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Lamination &amp; Finishing:
                    </label>
                    <select
                      value={selectedFinish}
                      onChange={(e) => setSelectedFinish(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500"
                    >
                      {selectedProduct.options.finishes.map((fn) => (
                        <option key={fn} value={fn}>
                          {fn}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Artwork & Design Mode */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Do you have ready print artwork?</span>
                    <button
                      type="button"
                      onClick={() => setNeedDesignHelp(!needDesignHelp)}
                      className={`text-xs px-3 py-1 rounded-full font-bold border transition-colors ${
                        needDesignHelp
                          ? 'bg-red-950 text-red-400 border-red-800'
                          : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      }`}
                    >
                      {needDesignHelp ? 'Need Design (+KSh 1,500)' : 'I Have Artwork'}
                    </button>
                  </div>

                  {!needDesignHelp ? (
                    <label className="border border-dashed border-neutral-700 hover:border-red-500 rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer bg-neutral-900/60">
                      <Upload className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-300">
                        {artworkFileName ? (
                          <span className="text-emerald-400 font-semibold">{artworkFileName}</span>
                        ) : (
                          'Upload Artwork File (PDF, AI, PNG, PSD)'
                        )}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          e.target.files?.[0] && setArtworkFileName(e.target.files[0].name)
                        }
                      />
                    </label>
                  ) : (
                    <p className="text-[11px] text-neutral-400">
                      Our graphic design team will contact you to develop print-ready artwork before production.
                    </p>
                  )}
                </div>

                {/* Delivery location in Kenya */}
                <div>
                  <label className="block font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Delivery Region in Kenya:
                  </label>
                  <select
                    value={deliveryRegion}
                    onChange={(e) => setDeliveryRegion(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Nairobi CBD / Upper Hill">Nairobi CBD &amp; Upper Hill (Fast Delivery)</option>
                    <option value="Nairobi Environs (Thika, Rongai, Kiambu, Kitengela)">Nairobi Environs (Thika, Kiambu, Rongai)</option>
                    <option value="Upcountry Express Courier (Mombasa, Nakuru, Kisumu, Eldoret)">Upcountry Kenya (Express Courier)</option>
                    <option value="Workshop Collection (Nairobi)">Self Pickup at Nairobi Workshop</option>
                  </select>
                </div>
              </div>

              {/* Price & Add to Cart Footer */}
              <div className="p-5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase font-bold">
                    Estimated Total Price:
                  </span>
                  <div className="font-heading font-black text-2xl text-red-500">
                    KSh {calculateCustomPrice().toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const prodName = selectedProduct.name;
                      setSelectedProduct(null);
                      onOpenQuoteModal(prodName);
                    }}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase px-4 py-3 rounded-xl border border-neutral-700"
                  >
                    Get Quotation
                  </button>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
