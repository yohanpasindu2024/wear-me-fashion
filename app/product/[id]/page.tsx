"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products } from "@/lib/data";
import { useCartStore } from "@/store/cartStore";
import { ArrowLeft, Check } from "lucide-react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link href="/store" className="text-primary hover:underline">
          Return to Store
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({ ...product, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/5] w-full bg-[#f6f6f6] dark:bg-zinc-900 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-lg font-bold text-muted-foreground mb-2">{product.category}</h2>
          <h1 className="text-4xl md:text-5xl font-serif uppercase font-bold tracking-tight mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-bold mb-8">${product.price.toFixed(2)}</p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-md">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            className={`w-full md:w-auto px-12 py-5 rounded-full font-bold uppercase tracking-wider text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              added 
                ? "bg-green-600 text-white" 
                : "bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            {added ? (
              <>
                <Check size={24} /> Added to Cart
              </>
            ) : (
              "Add to Bag"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
