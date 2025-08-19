"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import Image from "next/image";

const subscription = [
  {
    id: 1,
    name: "Momentum",
    image: "/subscriptions/image_1.png",
    badge: "BEST VALUED",
    pricing: "30",
    originalPrice: "999",
    duration: "days free - Then $999/Year",
    yearlyPrice: "$999/Year",
    description: "This is a basic subscription",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "Unlimited Post and Media",
      "Upload any many as Events",
      "Unlimited Discounts",
    ],
    bgColor: "bg-green-50",
    buttonColor: "bg-teal-500 hover:bg-teal-600",
    buttonTextColor: "text-white",
  },
  {
    id: 2,
    name: "Acceleration",
    image: "/subscriptions/image_2.png",
    pricing: "7",
    originalPrice: "99",
    duration: "days free - Then $99/Month",
    yearlyPrice: "$999/Year",
    description: "This is a basic subscription",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "Unlimited Post and Media",
      "Upload any many as Events",
      "Unlimited Discounts",
    ],
    bgColor: "bg-orange-50",
    buttonColor: "bg-green-500 hover:bg-green-600",
    buttonTextColor: "text-white",
  },
  {
    id: 3,
    name: "Elevate",
    image: "/subscriptions/image_1.png",
    pricing: "7",
    originalPrice: "9",
    duration: "days free - Then $9/Month",
    yearlyPrice: "$999/Year",
    description: "This is a basic subscription",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "Unlimited Post and Media",
      "Upload any many as Events",
      "Unlimited Discounts",
    ],
    bgColor: "bg-purple-50",
    buttonColor: "bg-red-500 hover:bg-red-600",
    buttonTextColor: "text-white",
  },
  {
    id: 4,
    name: "Ignite",
    image: "/subscriptions/image_1.png",
    pricing: "7",
    originalPrice: "9",
    duration: "days free - Then $9/Month",
    yearlyPrice: "$999/Year",
    description: "This is a basic subscription",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "Unlimited Post and Media",
      "Upload any many as Events",
      "Unlimited Discounts",
    ],
    bgColor: "bg-yellow-50",
    buttonColor: "bg-lime-400 hover:bg-lime-500",
    buttonTextColor: "text-black",
  },
];

function Subscriptions() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>
      {subscription.map((sub) => (
        <div
          key={sub.id}
          className={`${sub.bgColor} rounded-2xl p-6 shadow-lg relative overflow-hidden `}
        >
          {/* Badge for best valued */}
          {sub.badge && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {sub.badge}
            </div>
          )}

          {/* Header with illustration */}
          <div className="flex flex-col items-center mb-6">
            <Image
              src={sub.image}
              alt={sub.name}
              width={200}
              height={200}
              className="w-full h-40 object-contain bg-opacity-50 flex items-center justify-center mb-4"
            />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{sub.name}</h3>

          {/* Pricing */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">
              First {sub.pricing} {sub.duration}
            </p>
            <p className="text-xl font-bold text-gray-800">{sub.yearlyPrice}</p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {sub.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Button */}
          <button
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${sub.buttonColor} ${sub.buttonTextColor}`}
            onMouseEnter={() => setHoveredCard(sub.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {hoveredCard === sub.id ? "Edit Details" : "Get Now"}
          </button>
        </div>
      ))}
    </>
  );
}

export default Subscriptions;
