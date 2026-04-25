"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredProducts } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    // Hero Animations
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-subtitle", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from(".hero-btn", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.from(".hero-bg", {
        scale: 1.05,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
      });

      // Products Scroll Animation
      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen" ref={heroRef}>
      {/* Hero Section */}
      <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 hero-bg">
          <Image
            src="/image-one.jpeg"
            alt="Outlyn Hero"
            fill
            className="object-cover opacity-80"
            priority
          />
        </div>

        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center mt-20">
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif uppercase tracking-tighter text-white leading-none hero-title font-bold drop-shadow-2xl">
            Feel the <br /> Unreal.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl hero-subtitle font-sans font-medium">
            Meet the next generation of style. Maximum comfort. Maximum impact. Built for the future.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/store"
              className="hero-btn bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="#featured"
              className="hero-btn bg-black/50 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-black/70 transition-colors"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full">
        <div className="mb-10">
          <h2 className="text-3xl md:text-5xl font-serif uppercase font-bold tracking-tight">The Essentials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <Link href="/store" className="relative h-[500px] md:h-[700px] w-full group overflow-hidden bg-muted">
            <Image 
              src="/image-three.jpeg" 
              alt="Men's Collection" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-sans font-bold uppercase tracking-wide">Men's</h3>
              <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
                Shop
              </button>
            </div>
          </Link>
          <Link href="/store" className="relative h-[500px] md:h-[700px] w-full group overflow-hidden bg-muted">
            <Image 
              src="/image-ten.jpeg" 
              alt="Women's Collection" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-sans font-bold uppercase tracking-wide">Women's</h3>
              <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
                Shop
              </button>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full" ref={productsRef}>
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl md:text-5xl font-serif uppercase font-bold tracking-tight">Latest & Greatest</h2>
          <Link href="/store" className="hidden md:block text-lg font-bold hover:underline">
            Shop All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group product-card block">
              <div className="relative aspect-[4/5] bg-[#f6f6f6] dark:bg-zinc-900 overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-muted-foreground">{product.category}</p>
                </div>
                <p className="font-bold">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
