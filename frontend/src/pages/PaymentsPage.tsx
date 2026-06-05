import { Shield, CreditCard, Smartphone, Lock, CheckCircle, ChevronRight } from "lucide-react";

const paymentMethods = [
  {
    icon: CreditCard,
    name: "Visa / Mastercard",
    description: "Pay securely with your debit or credit card",
    badge: "Most Popular",
    badgeColor: "bg-amber-500",
    details: ["Instant payment", "All major cards accepted", "3D Secure protected"],
  },
  {
    icon: Smartphone,
    name: "M-Pesa",
    description: "Coming soon — pay directly from your M-Pesa wallet",
    badge: "Coming Soon",
    badgeColor: "bg-teal-500",
    details: ["Safaricom M-Pesa", "STK Push", "No card needed"],
    disabled: true,
  },
];

const steps = [
  { number: "01", title: "Add to Cart", description: "Browse and add your items to the cart" },
  { number: "02", title: "Checkout", description: "Click checkout and review your order" },
  { number: "03", title: "Pay Securely", description: "Enter your card details on Stripe's secure page" },
  { number: "04", title: "Confirmation", description: "Receive instant order confirmation" },
];

const faqs = [
  { q: "Is my card information safe?", a: "Yes. We use Stripe, a PCI-DSS Level 1 certified payment processor. We never store your card details." },
  { q: "What currencies are accepted?", a: "We accept both KES (Kenyan Shilling) and USD. Stripe automatically converts at the current rate." },
  { q: "Can I get a refund?", a: "Yes. Contact us within 48 hours of purchase for a full refund on eligible items." },
];

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-teal-900 text-white">

      {/* Hero */}
      <div className="relative overflow-hidden bg-teal-800 border-b border-teal-700">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 50%, #0d9488 0%, transparent 50%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">Secured by Stripe</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">
            Payments
          </h1>
          <p className="text-teal-300 text-lg max-w-xl mx-auto">
            Fast, secure, and flexible payment options for your everyday shopping needs.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">

        {/* Payment Methods */}
        <section>
          <h2 className="text-2xl font-bold text-amber-400 mb-6">Payment Methods</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className={`relative rounded-2xl border p-6 transition-all duration-300
                  ${method.disabled
                    ? "border-teal-700 bg-teal-800/40 opacity-70"
                    : "border-amber-500/40 bg-teal-800 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10"
                  }`}
              >
                {/* Badge */}
                <span className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full text-white ${method.badgeColor}`}>
                  {method.badge}
                </span>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${method.disabled ? "bg-teal-700" : "bg-amber-500/20"}`}>
                    <method.icon className={`w-6 h-6 ${method.disabled ? "text-teal-400" : "text-amber-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{method.name}</h3>
                    <p className="text-teal-300 text-sm mb-4">{method.description}</p>
                    <ul className="space-y-1.5">
                      {method.details.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-sm text-teal-200">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Pay */}
        <section>
          <h2 className="text-2xl font-bold text-amber-400 mb-6">How to Pay</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                <div className="bg-teal-800 border border-teal-700 rounded-2xl p-5 h-full hover:border-amber-500/40 transition-colors">
                  <div className="text-3xl font-bold text-amber-500/30 mb-3">{step.number}</div>
                  <h3 className="font-semibold text-amber-300 mb-2">{step.title}</h3>
                  <p className="text-teal-300 text-sm">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600 z-10" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Security Banner */}
        <section className="bg-gradient-to-r from-amber-500/10 to-teal-700/30 border border-amber-500/20 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-amber-500/20 rounded-2xl shrink-0">
              <Shield className="w-10 h-10 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-300 mb-2">Your Security is Our Priority</h3>
              <p className="text-teal-300 text-sm leading-relaxed">
                All transactions are encrypted with 256-bit SSL and processed through Stripe — 
                a PCI-DSS Level 1 certified provider trusted by millions worldwide. 
                We never store your card details on our servers.
              </p>
            </div>
            <div className="shrink-0 flex flex-col items-center gap-1">
              <div className="bg-teal-800 border border-teal-600 rounded-xl px-4 py-2 text-xs text-teal-300 font-medium">
                SSL Encrypted
              </div>
              <div className="bg-teal-800 border border-teal-600 rounded-xl px-4 py-2 text-xs text-teal-300 font-medium">
                PCI-DSS Certified
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-amber-400 mb-6">Payment FAQs</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-teal-800 border border-teal-700 rounded-2xl p-5 hover:border-amber-500/30 transition-colors">
                <h4 className="font-semibold text-amber-300 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-teal-300 text-sm leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Help Footer */}
        <section className="text-center pb-8">
          <p className="text-teal-400 text-sm">
            Have a payment issue?{" "}
            <a href="/contacts" className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors">
              Contact our support team
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}