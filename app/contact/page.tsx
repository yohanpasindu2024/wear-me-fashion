import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Have a question or need assistance? We're here to help. Reach out to us through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="flex flex-col items-center text-center p-8 bg-muted/30 rounded-3xl border border-border">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <Phone size={24} />
          </div>
          <h3 className="font-semibold text-xl mb-2">Phone</h3>
          <p className="text-muted-foreground">+94 77 531 1359</p>
        </div>

        <div className="flex flex-col items-center text-center p-8 bg-muted/30 rounded-3xl border border-border">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <Mail size={24} />
          </div>
          <h3 className="font-semibold text-xl mb-2">Email</h3>
          <p className="text-muted-foreground">hello@wearme.com</p>
        </div>

        <div className="flex flex-col items-center text-center p-8 bg-muted/30 rounded-3xl border border-border">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <MapPin size={24} />
          </div>
          <h3 className="font-semibold text-xl mb-2">Location</h3>
          <p className="text-muted-foreground">Colombo, Sri Lanka</p>
        </div>

        <div className="flex flex-col items-center text-center p-8 bg-muted/30 rounded-3xl border border-border">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <Clock size={24} />
          </div>
          <h3 className="font-semibold text-xl mb-2">Hours</h3>
          <p className="text-muted-foreground">Mon-Sat: 9AM - 8PM</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-muted/50 p-8 md:p-12 rounded-3xl border border-border text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Direct Support</h2>
        <p className="text-muted-foreground mb-8">
          The fastest way to reach us is through WhatsApp. Our team is ready to assist you with orders, sizing, or any other inquiries.
        </p>
        <a
          href="https://wa.me/94775311359?text=Hello%20Wear%20ME!%20I%20have%20an%20inquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex bg-[#25D366] hover:bg-[#1ebd5a] text-white px-8 py-4 rounded-full font-bold text-lg items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
