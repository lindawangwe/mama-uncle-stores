import { useState } from "react";
import { ChevronDown, ChevronUp, ShoppingCart, Truck, CreditCard, Package, RefreshCw, User, HelpCircle } from "lucide-react";

const faqSections = [
  {
    section: "Ordering",
    icon: ShoppingCart,
    faqs: [
      {
        q: "How do I place an order on Mama Uncle?",
        a: "Simply browse our products, click on what you need, add it to your cart, and proceed to checkout. You'll need to be logged in to complete your order.",
      },
      {
        q: "Can I change or cancel my order after placing it?",
        a: "You can cancel or change your order within 1 hour of placing it. Contact our support team immediately via WhatsApp or email and we'll sort it out for you.",
      },
      {
        q: "Is there a minimum order amount?",
        a: "There is no minimum order amount. You can order as little or as much as you need.",
      },
    ],
  },
  {
    section: "Delivery",
    icon: Truck,
    faqs: [
      {
        q: "Do you deliver to my area?",
        a: "Yes! We deliver countrywide across Kenya — from Nairobi to Mombasa, Kisumu, Nakuru, Eldoret, and everywhere in between.",
      },
      {
        q: "How long does delivery take?",
        a: "Nairobi orders are delivered same day or next day. Orders outside Nairobi take 2–3 business days depending on your location.",
      },
      {
        q: "How much does delivery cost?",
        a: "Delivery fees vary by location. The exact fee will be shown at checkout before you confirm your order. We offer free delivery on orders above Kshs 2,000 within Nairobi.",
      },
      {
        q: "What happens if I'm not home when my order arrives?",
        a: "Our rider will call you before arriving. If you're unavailable, we'll reschedule delivery for a convenient time at no extra cost.",
      },
    ],
  },
  {
    section: "Payment",
    icon: CreditCard,
    faqs: [
      {
        q: "What payment methods do you accept?",
        a: "We currently accept Visa and Mastercard debit/credit cards via Stripe. M-Pesa support is coming very soon. Cash on delivery is also available.",
      },
      {
        q: "Is it safe to pay online?",
        a: "Absolutely. All online payments are processed through Stripe, a PCI-DSS Level 1 certified provider. Your card details are never stored on our servers.",
      },
      {
        q: "Can I pay on delivery (cash)?",
        a: "Yes! We offer cash on delivery countrywide. Simply select 'Pay on Delivery' at checkout and have the exact amount ready when your order arrives.",
      },
    ],
  },
  {
    section: "Products",
    icon: Package,
    faqs: [
      {
        q: "What if I receive a wrong or damaged product?",
        a: "We're sorry if that happens! Take a photo of the item and contact us within 24 hours. We'll arrange a free replacement or full refund immediately.",
      },
      {
        q: "Do you sell products in bulk?",
        a: "Yes! We offer bulk purchasing for businesses, schools, and institutions. Contact us directly for bulk pricing and special arrangements.",
      },
      {
        q: "How do I know if a product is in stock?",
        a: "Products available for purchase are in stock. If an item is out of stock it will be clearly marked and you won't be able to add it to cart.",
      },
    ],
  },
  {
    section: "Refunds",
    icon: RefreshCw,
    faqs: [
      {
        q: "How long does a refund take?",
        a: "Card refunds are processed within 5–7 business days back to your original payment method. Cash on delivery refunds are handled on the spot during the return pickup.",
      },
    ],
  },
  {
    section: "Account",
    icon: User,
    faqs: [
      {
        q: "Do I need an account to shop?",
        a: "Yes, you need an account to place orders. Signing up is free and takes less than a minute — just your name, email, and a password.",
      },
      {
        q: "I forgot my password, what do I do?",
        a: "Click 'Forgot Password' on the login page and we'll send a reset link to your email. Check your spam folder if you don't see it within a few minutes.",
      },
      {
        q: "How do I track my order?",
        a: "Once your order is dispatched, you'll receive an SMS or email with tracking details. You can also check your order status in your account dashboard.",
      },
    ],
  },
  {
    section: "General",
    icon: HelpCircle,
    faqs: [
      {
        q: "How do I contact customer support?",
        a: "You can reach us via WhatsApp, email, or through our Contact page. We're always happy to help!",
      },
      {
        q: "What are your business hours?",
        a: "We're open every day from 8:00 AM to 8:00 PM. Orders placed outside these hours will be processed the next morning.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer
        ${open ? "border-amber-500/60 bg-teal-800" : "border-teal-700 bg-teal-800/50 hover:border-teal-600"}`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        <span className={`font-medium text-sm md:text-base transition-colors ${open ? "text-amber-300" : "text-white"}`}>
          {q}
        </span>
        <div className={`shrink-0 p-1 rounded-full transition-colors ${open ? "bg-amber-500/20 text-amber-400" : "text-teal-400"}`}>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>
      {open && (
        <div className="px-5 pb-4 text-teal-300 text-sm leading-relaxed border-t border-teal-700/50 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const filteredSections = activeSection
    ? faqSections.filter((s) => s.section === activeSection)
    : faqSections;

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
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">We're here to help</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-teal-300 text-lg max-w-xl mx-auto">
            Everything you need to know about shopping at Mama Uncle.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveSection(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border
              ${!activeSection
                ? "bg-amber-500 border-amber-500 text-teal-900"
                : "border-teal-600 text-teal-300 hover:border-amber-500/50 hover:text-amber-300"
              }`}
          >
            All
          </button>
          {faqSections.map((s) => (
            <button
              key={s.section}
              onClick={() => setActiveSection(activeSection === s.section ? null : s.section)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border
                ${activeSection === s.section
                  ? "bg-amber-500 border-amber-500 text-teal-900"
                  : "border-teal-600 text-teal-300 hover:border-amber-500/50 hover:text-amber-300"
                }`}
            >
              {s.section}
            </button>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-10">
          {filteredSections.map((section) => (
            <div key={section.section}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <section.icon className="w-5 h-5 text-amber-400" />
                </div>
                <h2 className="text-xl font-bold text-amber-400">{section.section}</h2>
              </div>
              <div className="space-y-2">
                {section.faqs.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-teal-800 border border-teal-700 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-amber-300 mb-2">Still have questions?</h3>
          <p className="text-teal-300 text-sm mb-5">
            Our support team is available daily from 8:00 AM to 8:00 PM
          </p>
          <a
            href="/contacts"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-teal-900 font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            Contact Support
          </a>
        </div>

      </div>
    </div>
  );
}