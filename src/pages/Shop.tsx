import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Filter, Search, ChevronLeft, ChevronRight, Plus, Minus, X, CreditCard, Wallet } from 'lucide-react';

interface ShopProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
}

interface CartItem extends ShopProduct {
  quantity: number;
}

const PRODUCTS: ShopProduct[] = [
  {
    id: 1,
    name: "Buso Oficial",
    price: 130000,
    category: "Ropa",
    images: [
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/buso_front.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/buso_diagonal.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/buso_back.png"
    ]
  },
  {
    id: 2,
    name: "Gorra Infernal",
    price: 45000,
    category: "Accesorios",
    images: [
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/gorra_front.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/gorra_diagonal.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/gorra_back.png"
    ]
  },
  {
    id: 3,
    name: "Pasamontañas Táctico",
    price: 25000,
    category: "Accesorios",
    images: [
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/pasamonta_front.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/pasamonta_diagonal.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/pasamonta_back.png"
    ]
  },
  {
    id: 4,
    name: "Piernero Biker",
    price: 100000,
    category: "Equipo",
    images: [
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/piernero_front.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/piernero_diagonal.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/piernero_back.png"
    ]
  },
  {
    id: 5,
    name: "Llaveros Colección",
    price: 15000,
    category: "Accesorios",
    images: [
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/llavero_full.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/llavero_leon.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/llavero_name.png"
    ]
  },
  {
    id: 6,
    name: "Enterizo Licrado",
    price: 100000,
    category: "Ropa",
    images: [
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/enterizo_front.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/enterizo_diagonal.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/enterizo_back.png"
    ]
  },
  {
    id: 7,
    name: "Camisa Polo",
    price: 70000,
    category: "Ropa",
    images: [
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/polo_front.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/polo_diagonal.png",
      "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/shop/catalogo/polo_back.png"
    ]
  }
];

interface ProductCardProps {
  key?: React.Key;
  product: ShopProduct;
  index: number;
  onAddToCart: (product: ShopProduct, quantity: number) => void;
}

const ProductCard = ({ product, index, onAddToCart }: ProductCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col h-full"
    >
      {/* Glow Effect behind card */}
      <div className="absolute inset-0 bg-biker-red/0 group-hover:bg-biker-red/10 blur-[40px] transition-all duration-500 rounded-2xl" />
      
      <div className="relative z-10 h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-500 group-hover:scale-[1.05] group-hover:border-biker-red/50 overflow-hidden flex flex-col">
        {/* Fire border effect on hover */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="aspect-[4/5] relative overflow-hidden bg-biker-black shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={product.images[currentImage]}
              alt={`${product.name} - ${currentImage + 1}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain p-4"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {/* Slider Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={prevImage}
              className="p-1.5 rounded-full bg-black/50 text-white hover:bg-biker-red transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className="p-1.5 rounded-full bg-black/50 text-white hover:bg-biker-red transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
            {product.images.map((_, i) => (
              <div 
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === currentImage ? 'bg-biker-red' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-display group-hover:text-biker-red transition-colors leading-tight">{product.name}</h3>
            <div className="text-right">
              <span className="text-biker-red font-mono font-bold block">
                ${product.price.toLocaleString('es-CO')}
              </span>
              <span className="text-[10px] text-gray-500 font-mono">COP</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs uppercase tracking-widest font-mono mb-6">{product.category}</p>
          
          <div className="mt-auto space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-1">
              <button 
                onClick={decrement}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono text-sm">{quantity}</span>
              <button 
                onClick={increment}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={() => onAddToCart(product, quantity)}
              className="biker-btn biker-btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" /> Agregar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Shop = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addToCart = (product: ShopProduct, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-biker-red font-mono text-sm tracking-[0.3em] uppercase mb-2 block italic"
          >
            Mercancía Oficial
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-display italic tracking-tighter"
          >
            LA <span className="text-biker-red">ARMERÍA</span>
          </motion.h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar equipo..." 
              className="bg-biker-gray border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-biker-red w-64 transition-all focus:w-80"
            />
          </div>
          <button className="p-3 bg-biker-gray border border-white/10 rounded-lg hover:text-biker-red transition-all hover:border-biker-red/50">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} onAddToCart={addToCart} />
        ))}
      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDrawerOpen(true)}
            className="fixed bottom-8 right-8 z-50 p-4 bg-biker-red text-white rounded-full shadow-[0_0_20px_rgba(255,0,0,0.4)] flex items-center justify-center group"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-white text-biker-red text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {totalItems}
            </span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-biker-black border-l border-white/10 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-2xl font-display italic">TU <span className="text-biker-red">CARRITO</span></h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:text-biker-red transition-colors"><X className="w-6 h-6" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                    <ShoppingCart className="w-12 h-12 opacity-20" />
                    <p className="font-mono text-sm uppercase tracking-widest">El carrito está vacío</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden shrink-0 border border-white/10">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain p-2" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold truncate text-sm uppercase">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-biker-red transition-colors"><X className="w-4 h-4" /></button>
                          </div>
                          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2">{item.category}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 bg-white/5 rounded-md p-1 border border-white/5">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-biker-red transition-colors"><Minus className="w-3 h-3" /></button>
                              <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-biker-red transition-colors"><Plus className="w-3 h-3" /></button>
                            </div>
                            <span className="text-biker-red font-mono text-xs font-bold">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 bg-white/[0.02] border-t border-white/10 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-mono">${totalPrice.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>TOTAL</span>
                    <span className="text-biker-red font-mono">${totalPrice.toLocaleString('es-CO')} COP</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest text-center">Métodos de Pago Aceptados</p>
                  <div className="flex justify-center gap-4 text-gray-400">
                    <div className="flex flex-col items-center gap-1">
                      <Wallet className="w-5 h-5" />
                      <span className="text-[8px] uppercase">Nequi/Daviplata</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <CreditCard className="w-5 h-5" />
                      <span className="text-[8px] uppercase">Transferencia</span>
                    </div>
                  </div>
                </div>

                <button className="biker-btn biker-btn-primary w-full py-4 text-lg shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                  PAGAR AHORA
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Info Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 p-12 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 text-center"
      >
        <h2 className="text-3xl font-display mb-6">Envíos a Todo el País</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Porta los colores de la manada con orgullo. Todos nuestros productos son de alta calidad, diseñados por y para bikers.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-gray-500">
            <div className="w-2 h-2 rounded-full bg-biker-red" />
            Pago Seguro
          </div>
          <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-gray-500">
            <div className="w-2 h-2 rounded-full bg-biker-red" />
            Calidad Premium
          </div>
          <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-gray-500">
            <div className="w-2 h-2 rounded-full bg-biker-red" />
            Soporte 24/7
          </div>
        </div>
      </motion.div>
    </div>
  );
};
