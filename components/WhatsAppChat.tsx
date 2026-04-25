"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppChat() {
  const handleChat = () => {
    const phoneNumber = "94775311359";
    const message = encodeURIComponent("Hello! I'm interested in your products and have a question.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleChat}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebd5a] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out pl-0 group-hover:pl-2 font-medium">
        Chat with us
      </span>
    </button>
  );
}
