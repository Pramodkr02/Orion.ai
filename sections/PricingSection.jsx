export default function PricingSection() {
  const pricingData = [
    {
      title: "Basic Plan",
      price: 29,
      features: [
        "5 Projects",
        "10 GB Storage",
        "Basic Support",
        "Community Access",
        "Basic code review",
      ],
      buttonText: "Get Started",
    },
    {
      title: "Pro Plan",
      price: 79,
      mostPopular: true,
      features: [
        "50 Projects",
        "100 GB Storage",
        "Priority Support",
        "Team Collaboration",
        "Advanced Analytics",
        "Premium Code Review",
      ],
      buttonText: "Upgrade Now",
    },
    {
      title: "Enterprise Plan",
      price: 149,
      features: [
        "Unlimited Projects",
        "1 TB Storage",
        "24/7 Dedicated Support",
        "Custom Integrations",
        "SLA Guarantee",
      ],
      buttonText: "Contact Sales",
    },
  ];

  return (
    <section className="w-full px-4 py-20" id="pricing">
      {/* Header */}
      <p className="text-center uppercase font-medium text-indigo-600">
        Pricing
      </p>
      <h3 className="text-3xl font-semibold text-center mt-2">
        Our Pricing Plans
      </h3>
      <p className="text-sm text-slate-500 text-center mt-4 max-w-lg mx-auto">
        Flexible pricing options designed to meet your needs — whether you're
        just getting started or scaling up.
      </p>

      {/* Pricing Cards */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-16 w-full">
        {pricingData.map((plan, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl max-w-80 w-full shadow-[0px_4px_26px] shadow-black/5 ${
              plan.mostPopular
                ? "relative pt-12 bg-gradient-to-b from-indigo-600 to-violet-600 text-white"
                : "bg-white/50"
            }`}
          >
            {/* Most Popular Badge */}
            {plan.mostPopular && (
              <div className="flex items-center text-xs gap-1 py-1.5 px-2 absolute top-4 right-4 rounded bg-white text-indigo-600 font-medium">
                ✨ Most Popular
              </div>
            )}

            <p className="font-medium">{plan.title}</p>

            <h4 className="text-3xl font-semibold mt-1">
              ${plan.price}
              <span
                className={`font-normal text-sm ${
                  plan.mostPopular ? "text-white/80" : "text-slate-300"
                }`}
              >
                /mo
              </span>
            </h4>

            <hr
              className={`my-8 ${
                plan.mostPopular ? "border-white/40" : "border-slate-300"
              }`}
            />

            {/* Features */}
            <div
              className={`space-y-2 ${
                plan.mostPopular ? "text-white" : "text-slate-600"
              }`}
            >
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span
                    className={`text-lg ${
                      plan.mostPopular ? "text-white" : "text-indigo-600"
                    }`}
                  >
                    ✓
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              className={`transition w-full py-3 rounded-lg font-medium mt-8 ${
                plan.mostPopular
                  ? "bg-white hover:bg-slate-100 text-slate-800"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
