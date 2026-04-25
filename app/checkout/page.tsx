"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { Minus, Plus, Trash2, ArrowRight, Lock } from "lucide-react";

export default function Checkout() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) return;

    let message = `*NEW OUTLYN ORDER*\n\n*Customer:*\n${name}\n${address}\n\n*Items:*\n`;
    
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} ($${item.price.toFixed(2)})\n`;
    });
    
    message += `\n*Total: $${getTotalPrice().toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/94775311359?text=${encodedMessage}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif uppercase font-bold mb-4">Your Bag is Empty</h1>
        <p className="text-muted-foreground mb-8">Once you add something to your bag, it will appear here.</p>
        <Link href="/store" className="bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-foreground/90 transition-colors">
          Get Started
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-serif uppercase font-bold mb-12">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Cart Items */}
        <div className="lg:col-span-7">
          <h2 className="text-2xl font-bold mb-6">Bag</h2>
          <div className="space-y-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 border-b border-border pb-8">
                <div className="relative w-32 h-40 bg-[#f6f6f6] dark:bg-zinc-900 overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-muted-foreground mb-auto">{item.category}</p>
                  
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Quantity</span>
                      <div className="flex items-center border border-border rounded-full">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1 text-sm"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-5">
          <div className="bg-muted/30 p-8 border border-border">
            <h2 className="text-2xl font-bold mb-6">Summary</h2>
            
            <div className="space-y-4 mb-6 text-lg">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery & Handling</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t border-border pt-4 font-bold text-xl">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="space-y-6 border-t border-border pt-8 mt-8">
              <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
              <div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-4 border border-input bg-background focus:outline-none focus:border-foreground transition-colors"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-4 border border-input bg-background focus:outline-none focus:border-foreground transition-colors resize-none"
                  placeholder="Delivery Address"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-foreground text-background py-5 font-bold uppercase tracking-wider text-lg flex justify-center items-center gap-2 hover:bg-foreground/90 transition-colors mt-4"
              >
                Checkout via WhatsApp
              </button>
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mt-4">
                <Lock size={14} /> Secure Checkout
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
