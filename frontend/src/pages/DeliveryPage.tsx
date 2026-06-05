import { Truck, Clock, MapPin, CheckCircle, Package, AlertCircle, Gift } from "lucide-react";

const zones = [
  {
    zone: "Nairobi",
    fee: "Kshs 200",
    time: "Same day / Next day",
    freeAbove: "Kshs 2,500",
    details: "Orders before 2:00 PM are delivered same day. Orders after 2:00 PM are delivered next day.",
    color: "amber",
  },
  {
    zone: "Outside Nairobi",
    fee: "Kshs 500",
    time: "2 – 3 Business Days",
    freeAbove: "Kshs 5,000",
    details: "We deliver to all 47 counties across Kenya. Remote areas may take slightly longer.",
    color: "teal",
  },
];

const counties = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika",
  "Malindi", "Kitale", "Garissa", "Kakamega", "Machakos", "Meru",
  "Nyeri", "Kericho", "Embu", "Kisii", "Migori", "Homabay",
  "Bungoma", "Busia", "Siaya", "Vihiga", "Trans Nzoia", "Nandi",
  "Bomet", "Narok", "Kajiado", "Muranga", "Kiambu", "Kirinyaga",
  "Nyandarua", "Laikipia", "Samburu", "Isiolo", "Marsabit", "Mandera",
  "Wajir", "Tana River", "Lamu", "Taita Taveta", "Kwale", "Kilifi",
  "Makueni", "Kitui", "Tharaka Nithi",  "West Pokot", "Turkana",
];

const steps = [
  { icon: Package, title: "Place Your Order", description: "Add items to cart and complete checkout before 2:00 PM for same day delivery in Nairobi." },
  { icon: CheckCircle, title: "Order Confirmed", description: "You'll receive an SMS and email confirmation with your order details immediately." },
  { icon: Truck, title: "Out for Delivery", description: "Our rider will call you before arriving. Track your order status in your account." },
  { icon: Gift, title: "Delivered!", description: "Receive your order and enjoy! Pay cash on delivery or online at checkout." },
];

export default function DeliveryPage() {
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
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">Countrywide Delivery</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">
            Delivery Information
          </h1>
          <p className="text-teal-300 text-lg max-w-xl mx-auto">
            We deliver to all 47 counties across Kenya — fast, reliable, and right to your door.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">

        {/* Delivery Zones */}
        <section>
          <h2 className="text-2xl font-bold text-amber-400 mb-6">Delivery Zones & Fees</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {zones.map((zone) => (
              <div
                key={zone.zone}
                className={`bg-teal-800 rounded-2xl border p-6 transition-all
                  ${zone.color === "amber"
                    ? "border-amber-500/40 hover:border-amber-400"
                    : "border-teal-600 hover:border-teal-500"
                  }`}
              >
                {/* Zone Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl ${zone.color === "amber" ? "bg-amber-500/20" : "bg-teal-700"}`}>
                    <MapPin className={`w-5 h-5 ${zone.color === "amber" ? "text-amber-400" : "text-teal-300"}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{zone.zone}</h3>
                </div>

                {/* Fee & Time */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-teal-700/50 rounded-xl p-3 text-center">
                    <p className="text-teal-400 text-xs mb-1">Delivery Fee</p>
                    <p className="text-amber-400 font-bold text-lg">{zone.fee}</p>
                  </div>
                  <div className="bg-teal-700/50 rounded-xl p-3 text-center">
                    <p className="text-teal-400 text-xs mb-1">Delivery Time</p>
                    <p className="text-white font-semibold text-sm">{zone.time}</p>
                  </div>
                </div>

                {/* Free Delivery */}
                <div className={`flex items-center gap-2 rounded-xl px-4 py-2.5 mb-4
                  ${zone.color === "amber" ? "bg-amber-500/10 border border-amber-500/20" : "bg-teal-700/40 border border-teal-600"}`}>
                  <Gift className={`w-4 h-4 shrink-0 ${zone.color === "amber" ? "text-amber-400" : "text-teal-300"}`} />
                  <p className={`text-sm font-medium ${zone.color === "amber" ? "text-amber-300" : "text-teal-300"}`}>
                    FREE delivery on orders above {zone.freeAbove}
                  </p>
                </div>

                <p className="text-teal-400 text-sm leading-relaxed">{zone.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cutoff Time Banner */}
        <section className="bg-gradient-to-r from-amber-500/10 to-teal-700/20 border border-amber-500/20 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-amber-500/20 rounded-2xl shrink-0">
              <Clock className="w-10 h-10 text-amber-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-amber-300 mb-1">Same Day Delivery Cutoff</h3>
              <p className="text-teal-300 text-sm leading-relaxed">
                Place your Nairobi order before <span className="text-amber-400 font-semibold">2:00 PM</span> for same day delivery.
                Orders placed after 2:00 PM will be delivered the <span className="text-amber-400 font-semibold">next day</span>.
              </p>
            </div>
            <div className="bg-teal-800/60 border border-amber-500/30 rounded-xl px-8 py-4 text-center shrink-0">
              <p className="text-teal-400 text-xs mb-1">Order before</p>
              <p className="text-amber-400 text-3xl font-bold">2:00 PM</p>
              <p className="text-teal-400 text-xs mt-1">Same day delivery</p>
            </div>
          </div>
        </section>

        {/* How Delivery Works */}
        <section>
          <h2 className="text-2xl font-bold text-amber-400 mb-6">How Delivery Works</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="bg-teal-800 border border-teal-700 hover:border-amber-500/30 rounded-2xl p-5 h-full transition-colors">
                  <div className="p-2.5 bg-amber-500/15 rounded-xl w-fit mb-4">
                    <step.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-amber-500/25 mb-2">0{i + 1}</div>
                  <h3 className="font-semibold text-amber-300 mb-2 text-sm">{step.title}</h3>
                  <p className="text-teal-400 text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Counties */}
        <section>
          <h2 className="text-2xl font-bold text-amber-400 mb-2">We Deliver to All 47 Counties</h2>
          <p className="text-teal-400 text-sm mb-6">From Turkana to Mombasa — we've got Kenya covered</p>
          <div className="bg-teal-800 border border-teal-700 rounded-2xl p-6">
            <div className="flex flex-wrap gap-2">
              {counties.map((county) => (
                <span
                  key={county}
                  className="bg-teal-700/60 border border-teal-600 text-teal-200 text-xs px-3 py-1.5 rounded-full hover:border-amber-500/40 hover:text-amber-300 transition-colors"
                >
                  {county}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Important Note */}
        <section className="bg-teal-800 border border-teal-700 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-300 mb-2">Important Notes</h4>
              <ul className="space-y-2 text-teal-300 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  Our rider will call you before arriving — please keep your phone on.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  If you're unavailable on delivery, we'll reschedule at no extra cost.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  Cash on delivery is available — have the exact amount ready.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  Delivery times may vary during public holidays and peak seasons.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pb-8">
          <p className="text-teal-400 text-sm mb-4">
            Questions about your delivery?
          </p>
          <a
            href="/contacts"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-teal-900 font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            <Truck className="w-4 h-4" />
            Contact Support
          </a>
        </section>

      </div>
    </div>
  );
}