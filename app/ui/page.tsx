'use client'
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Building, Trees, Coffee, Music, Book, ShoppingBag } from 'lucide-react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

const District = ({ name, icon: Icon, description, isActive, onEnter }) => {
  const districtRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onEnter();
        }
      },
      { threshold: 0.5 }
    );

    if (districtRef.current) {
      observer.observe(districtRef.current);
    }

    return () => {
      if (districtRef.current) {
        observer.unobserve(districtRef.current);
      }
    };
  }, [onEnter]);

  return (
    <section
      ref={districtRef}
      className={`min-h-screen flex items-center justify-center p-8 transition-all duration-500 ${
        isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
      }`}
    >
      <div className="max-w-2xl text-center">
        <Icon size={64} className="mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4">{name}</h2>
        <p className="text-xl">{description}</p>
      </div>
    </section>
  );
};

const CityMap = ({ activeDistrict, districts }) => {
  return (
    <div className="fixed top-4 left-4 w-64 h-64 bg-white rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out transform hover:scale-110">
      <div className="relative w-full h-full bg-blue-100 rounded-lg overflow-hidden">
        {districts.map((district, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-300 ${
              index === activeDistrict ? 'text-red-500 scale-125' : 'text-gray-500 scale-100'
            }`}
            style={{
              top: `${(index * 20 + 10)}%`,
              left: `${((index % 3) * 40 + 10)}%`,
            }}
          >
            <district.icon size={24} />
          </div>
        ))}
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-500">City Map</span>
        </div>
      </div>
    </div>
  );
};

const VirtualCityExplorer = () => {
  const scrollPosition = useScrollPosition();
  const [activeDistrict, setActiveDistrict] = useState(0);

  const districts = [
    { name: "Downtown", icon: Building, description: "The heart of the city, filled with towering skyscrapers and bustling streets." },
    { name: "Green Park", icon: Trees, description: "A tranquil oasis in the urban jungle, perfect for relaxation and outdoor activities." },
    { name: "Café Quarter", icon: Coffee, description: "Charming streets lined with cozy cafés and artisanal bakeries." },
    { name: "Music Row", icon: Music, description: "The rhythm of the city comes alive with live music venues and recording studios." },
    { name: "Library Lane", icon: Book, description: "A haven for book lovers with historic libraries and quaint bookshops." },
    { name: "Shopping District", icon: ShoppingBag, description: "From boutique stores to grand malls, shop till you drop in this retail paradise." },
  ];

  return (
    <div className="relative bg-gradient-to-b from-blue-100 to-green-100">
      <CityMap activeDistrict={activeDistrict} districts={districts} />

      <div className="ml-72"> {/* Add margin to prevent overlap with the map */}
        {districts.map((district, index) => (
          <District
            key={index}
            {...district}
            isActive={index === activeDistrict}
            onEnter={() => setActiveDistrict(index)}
          />
        ))}
      </div>

      <div className="fixed bottom-4 right-4 bg-white rounded-full p-4 shadow-lg text-blue-500 animate-bounce">
        <MapPin size={32} />
      </div>
    </div>
  );
};

export default VirtualCityExplorer;
