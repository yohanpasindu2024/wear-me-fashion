"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { gsap } from "gsap";

export default function Store() {
  const storeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".store-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".store-product", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, storeRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20" ref={storeRef}>
      <div className="mb-16 border-b pb-8 store-header">
        <h1 className="text-4xl md:text-6xl font-serif uppercase font-bold tracking-tight mb-4">
          All Products
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl font-medium">
          The complete Outlyn collection.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col store-product">
            <div className="relative aspect-[4/5] bg-[#f6f6f6] dark:bg-zinc-900 overflow-hidden mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex justify-between items-start mt-2">
              <div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-muted-foreground">{product.category}</p>
              </div>
              <p className="font-bold">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
