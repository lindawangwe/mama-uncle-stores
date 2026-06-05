import { Phone, Mail, MapPin, Clock, Instagram, Twitter, MessageCircle, Send, ExternalLink } from "lucide-react";

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+254 711 268 173",
    sub: "Available 8:00 AM – 8:00 PM daily",
    action: "tel:+254711268173",
    actionLabel: "Call Now",
    color: "amber",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+254 711 268 173",
    sub: "Chat with us instantly",
    action: "https://wa.me/254711268173",
    actionLabel: "Open WhatsApp",
    color: "green",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "mamaunclestores@gmail.com",
    sub: "We reply within a few hours",
    action: "mailto:mamaunclestores@gmail.com",
    actionLabel: "Send Email",
    color: "amber",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Umoja 1, Nairobi",
    sub: "Kenya",
    action: "https://maps.google.com/?q=Umoja+1+Nairobi+Kenya",
    actionLabel: "View on Map",
    color: "teal",
  },
];

const socials = [
  {
    name: "Instagram",
    handle: "@mamaunclestores",
    icon: Instagram,
    url: "https://instagram.com/mamaunclestores",
    color: "from-pink-500 to-amber-500",
    bg: "bg-pink-500/10 border-pink-500/30 hover:border-pink-400",
    text: "text-pink-400",
  },
  {
    name: "TikTok",
    handle: "@mamaunclestores",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
      </svg>
    ),
    url: "https://tiktok.com/@mamaunclestores",
    color: "from-white to-teal-400",
    bg: "bg-teal-500/10 border-teal-500/30 hover:border-teal-400",
    text: "text-teal-400",
  },
  {
    name: "WhatsApp",
    handle: "+254 711 268 173",
    icon: MessageCircle,
    url: "https://wa.me/254711268173",
    color: "from-green-400 to-green-600",
    bg: "bg-green-500/10 border-green-500/30 hover:border-green-400",
    text: "text-green-400",
  },
  {
    name: "Twitter / X",
    handle: "@mamaunclestores",
    icon: Twitter,
    url: "https://twitter.com/mamaunclestores",
    color: "from-sky-400 to-blue-500",
    bg: "bg-sky-500/10 border-sky-500/30 hover:border-sky-400",
    text: "text-sky-400",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-teal-900 text-white">

      {/* Hero */}
      <div className="relative overflow-hidden bg-teal-800 border-b border-teal-700">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 50%, #0d9488 0%, transparent 50%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6">
            <Send className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">Always here for you</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">
            Contact Us
          </h1>
          <p className="text-teal-300 text-lg max-w-xl mx-auto">
            Have a question or need help? Reach out — we're available every day from 8 AM to 8 PM.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">

        {/* Contact Cards */}
        <section>
          <h2 className="text-2xl font-bold text-amber-400 mb-6">Get in Touch</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {contactCards.map((card) => (
              <a
                key={card.title}
                href={card.action}
                target={card.action.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group bg-teal-800 border border-teal-700 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/15 rounded-xl group-hover:bg-amber-500/25 transition-colors shrink-0">
                    <card.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-teal-400 text-xs font-medium uppercase tracking-wider mb-1">{card.title}</p>
                    <p className="text-white font-semibold text-sm md:text-base truncate">{card.value}</p>
                    <p className="text-teal-400 text-xs mt-1">{card.sub}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-teal-600 group-hover:text-amber-400 transition-colors shrink-0 mt-1" />
                </div>
                <div className="mt-4 pt-4 border-t border-teal-700/50">
                  <span className="text-amber-400 text-sm font-medium group-hover:text-amber-300 transition-colors">
                    {card.actionLabel} →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Business Hours */}
        <section className="bg-gradient-to-r from-amber-500/10 to-teal-700/20 border border-amber-500/20 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-amber-500/20 rounded-2xl shrink-0">
              <Clock className="w-10 h-10 text-amber-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-amber-300 mb-1">Business Hours</h3>
              <p className="text-teal-300 text-sm">We're open every day of the week</p>
            </div>
            <div className="bg-teal-800/60 border border-teal-700 rounded-xl px-8 py-4 text-center shrink-0">
              <p className="text-amber-400 text-2xl font-bold">8:00 AM</p>
              <p className="text-teal-400 text-sm my-1">to</p>
              <p className="text-amber-400 text-2xl font-bold">8:00 PM</p>
              <p className="text-teal-400 text-xs mt-2">Mon – Sun</p>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section>
          <h2 className="text-2xl font-bold text-amber-400 mb-2">Follow Us</h2>
          <p className="text-teal-400 text-sm mb-6">Stay updated with new products, offers and more</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className={`group flex items-center gap-4 border rounded-2xl p-5 transition-all duration-300 ${social.bg}`}
              >
                <div className={`p-2.5 rounded-xl bg-teal-800/80`}>
                  <social.icon className={`w-5 h-5 ${social.text}`} />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{social.name}</p>
                  <p className={`text-xs ${social.text}`}>{social.handle}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-teal-600 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* Map placeholder */}
        <section>
          <h2 className="text-2xl font-bold text-amber-400 mb-6">Our Location</h2>
          <a
            href="https://maps.google.com/?q=Umoja+1+Nairobi+Kenya"
            target="_blank"
            rel="noreferrer"
            className="group block bg-teal-800 border border-teal-700 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all"
          >
            <div className="h-48 bg-teal-700/50 flex flex-col items-center justify-center gap-3 relative">
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, #0d9488 30px, #0d9488 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, #0d9488 30px, #0d9488 31px)" }}
              />
              <MapPin className="w-10 h-10 text-amber-400 relative z-10" />
              <p className="text-amber-300 font-semibold relative z-10">Umoja 1, Nairobi, Kenya</p>
              <p className="text-teal-400 text-sm relative z-10 group-hover:text-amber-300 transition-colors">
                Click to open in Google Maps →
              </p>
            </div>
          </a>
        </section>

      </div>
    </div>
  );
}