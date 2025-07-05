import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, Truck, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderCompleted(true);
    clearCart();
    
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
    });
    
    setTimeout(() => {
      setOrderCompleted(false);
      setStep(1);
      onClose();
    }, 3000);
  };

  const steps = [
    { title: "Shipping", icon: Truck },
    { title: "Payment", icon: CreditCard },
    { title: "Review", icon: Check },
  ];

  if (orderCompleted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md glass-morphism border-white/20 text-white">
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-[var(--platinum)]/70">
              Your order has been placed successfully. You'll receive a confirmation email shortly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden glass-morphism border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Checkout</DialogTitle>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 py-4">
            {steps.map((stepItem, index) => (
              <div key={stepItem.title} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step > index + 1 ? 'bg-green-500 border-green-500' :
                  step === index + 1 ? 'border-[var(--electric)] bg-[var(--electric)]' :
                  'border-white/30'
                }`}>
                  {step > index + 1 ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <stepItem.icon className="h-5 w-5" />
                  )}
                </div>
                <span className="ml-2 text-sm font-medium">{stepItem.title}</span>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-white/20 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="flex gap-6 h-[70vh]">
          {/* Form Section */}
          <div className="flex-1 overflow-y-auto pr-4">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="glass-morphism border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="glass-morphism border-white/20 text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="glass-morphism border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="glass-morphism border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="glass-morphism border-white/20 text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="glass-morphism border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="glass-morphism border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="glass-morphism border-white/20 text-white"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Payment Information
                  </h3>
                  
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      className="glass-morphism border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      className="glass-morphism border-white/20 text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className="glass-morphism border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className="glass-morphism border-white/20 text-white"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Review Order</h3>
                  
                  <div className="glass-morphism rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                    <p className="text-sm text-[var(--platinum)]/70">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>
                  
                  <div className="glass-morphism rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Payment Method</h4>
                    <p className="text-sm text-[var(--platinum)]/70">
                      **** **** **** {formData.cardNumber.slice(-4)}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="w-80 glass-morphism rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-[var(--platinum)]/70">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">
                    ${(parseFloat(item.product.price) * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            
            <Separator className="bg-white/20 my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax:</span>
                <span>${(total * 0.08).toLocaleString()}</span>
              </div>
              <Separator className="bg-white/20 my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-[var(--electric)]">${(total * 1.08).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t border-white/20">
          <Button
            variant="outline"
            onClick={step === 1 ? onClose : handleBack}
            className="border-white/20 text-white hover:bg-white/10"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          {step < 3 ? (
            <Button onClick={handleNext} className="btn-gradient">
              Continue
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={isProcessing}
              className="btn-gradient"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}