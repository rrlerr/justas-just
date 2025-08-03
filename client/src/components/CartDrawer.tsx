import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { motion } from "framer-motion";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const { items, isOpen, total, itemCount, removeFromCart, updateQuantity, clearCart, openCart, closeCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (itemCount === 0 && isOpen) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => open ? openCart() : closeCart()}>
        <SheetContent className="glass-morphism border-white/20 text-white">
          <SheetHeader>
            <SheetTitle className="text-white">Your Cart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ShoppingCart className="h-16 w-16 text-[var(--platinum)]/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-[var(--platinum)]/70 mb-4">Add some amazing printers to get started!</p>
            <Button onClick={closeCart} className="btn-gradient">
              Continue Shopping
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => open ? openCart() : closeCart()}>
      <SheetContent className="glass-morphism border-white/20 text-white flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center justify-between">
            Your Cart ({itemCount} items)
            {items.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-morphism rounded-lg p-4"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm">{item.product.name}</h4>
                  <p className="text-[var(--platinum)]/70 text-xs mb-2">{item.product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--electric)] font-bold">
                      ${parseFloat(item.product.price).toLocaleString()}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0 hover:bg-white/20"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0 hover:bg-white/20"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/20 pt-4 space-y-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-[var(--electric)]">${total.toLocaleString()}</span>
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full btn-gradient" 
                size="lg"
                onClick={() => {
                  setIsCheckoutOpen(true);
                  closeCart();
                }}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-white/20 text-white hover:bg-white/10" 
                onClick={closeCart}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
        
        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}