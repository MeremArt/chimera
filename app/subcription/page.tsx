import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

// Define a type for the props of PricingCard
interface PricingCardProps {
  title: string;
  price: number;
  description: string;
  features: string[];
  isPopular: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  isPopular,
}) => (
  <div
    className={`w-full max-w-sm mx-auto text-black rounded-lg border shadow-lg transition-all duration-300 ${
      isPopular ? "border-blue-500 border-2" : "border-gray-300"
    } hover:scale-105 hover:shadow-xl hover:border-[#6F7EFF]`} // Hover effect for the card
  >
    <div className="flex justify-between items-center p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {isPopular && (
        <span className="px-3 py-1 text-sm text-white bg-blue-500 rounded-full">
          Popular
        </span>
      )}
    </div>
    <div className="p-6">
      <div className="text-4xl text-black font-bold">${price}</div>
      {price > 0 && <div className="text-black mt-2">/month</div>}
      <p className="text-black mt-4">{description}</p>
    </div>
    <div className="p-6">
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-[#32CD32] mr-2 mt-0.5" />
            <span className="text-black">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="p-6">
      <Link href="/bookacall">
        <button
          className={`w-full py-2 px-4 rounded-md transition-all duration-300 ${
            isPopular
              ? "bg-[#7581f0] text-white "
              : "border-2 border-gray-500 text-black hover:bg-[#7581f0] "
          }`}
        >
          Get Started
        </button>
      </Link>
    </div>
  </div>
);

const SubscriptionPlans = () => {
  const plans = [
    {
      title: "Free",
      price: 0,
      description: "Get started with basic AI capabilities",
      features: [
        "Basic AI agent for Twitter",
        "Limited requests per day",
        "Standard response time",
        "Community support",
      ],
      isPopular: false,
    },
    {
      title: "Premium",
      price: 29,
      description: "Advanced features for power users",
      features: [
        "Advanced AI agent with multiple languages",
        "Telegram integration",
        "Discord integration",
        "Unlimited requests",
        "Priority support",
        "Custom agent plugins",
      ],
      isPopular: true,
    },
    {
      title: "Premium+",
      price: 49,
      description: "Ultimate AI experience with multimedia",
      features: [
        "All Premium features",
        "Image generation",
        "Video generation",
        "Advanced analytics",
        "24/7 priority support",
        "API access",
        "Custom branding",
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Get access to powerful AI agents tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {plans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
