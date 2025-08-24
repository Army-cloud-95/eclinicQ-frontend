import React, { useState } from "react";

const plans = [
  {
    title: "Tire 1",
    price: "₹3K",
    period: "per month",
    features: [
      "Minimum 3 Users Can Invited",
      "Daily Queue limit 20",
      "Can Access Complete System",
    ],
    color: "bg-green-500",
  },
  {
    title: "Tire 2",
    price: "₹5K",
    period: "per month",
    features: [
      "Minimum 5 Users Can Invited",
      "Daily Queue limit 20 - 50",
      "Can Access Complete System",
    ],
    color: "bg-blue-500",
  },
  {
    title: "Tire 3",
    price: "₹3K",
    period: "per month",
    features: [
      "Minimum 3 Users Can Invited",
      "Personalized Dashboards",
      "Can Access Complete System",
    ],
    color: "bg-indigo-500",
  },
  {
    title: "Tire 4",
    price: "₹3K",
    period: "per month",
    features: [
      "Minimum 3 Users Can Invited",
      "Personalized Dashboards",
      "Can Access Complete System",
    ],
    color: "bg-purple-500",
  },
];

const Packages = () => {
  // keep track of selected plan
  const [selectedPlan, setSelectedPlan] = useState("Tire 1");

  return (
    <div className="flex flex-col items-center p-8 bg-white h-full">
      <h2 className="text-2xl font-bold mb-2">Package & Payment</h2>
      <p className="text-gray-500 mb-8">
        Select the suitable package and make the payment to activate the account.
      </p>
      <div className="grid grid-cols-2 gap-6">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.title;

          return (
            <div
              key={index}
              className={`w-[330px] transition-colors h-auto border rounded-lg shadow-sm p-4 flex flex-col ${
                isSelected ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {/* Top Row with colored div + Title/Price */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg ${plan.color}`}></div>
                <div>
                  <h3 className="font-semibold">{plan.title}</h3>
                  <p className="text-lg font-bold">
                    {plan.price}{" "}
                    <span className="text-sm">{plan.period}</span>
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mt-4 space-y-2">
                <p className="font-medium">Access To:</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span>✔️</span>
                    <p className="text-sm">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                onClick={() => setSelectedPlan(plan.title)}
                className={`mt-4 py-2 rounded transition-colors ${
                  isSelected
                    ? "bg-white text-blue-600 font-semibold"
                    : " bg-blue-600 text-white"
                }`}
              >
                {isSelected ? "Selected Plan" : "Choose"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Packages;
