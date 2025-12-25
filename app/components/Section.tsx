"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

function Section() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-yellow-400 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Premium Motorcycle Service & Repair
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Keep your ride smooth, safe, and powerful with expert care.
        </p>
        <Button
          asChild
          className="bg-black text-white hover:bg-gray-800"
        >
          <a href="#contact">Book a Service</a>
        </Button>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 container mx-auto px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>🛠️ General Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Oil changes, brake checks, and routine inspections to keep your bike in top shape.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle>⚡ Engine Diagnostics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Advanced tools to detect and fix performance issues quickly and efficiently.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle>🛡️ Custom Upgrades</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Performance tuning, exhaust systems, and accessories tailored to your style.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Why Choose Us?</h3>
          <p className="max-w-2xl mx-auto text-lg">
            With certified mechanics and years of experience, we provide reliable motorcycle
            services that ensure safety and performance. Your ride deserves the best care.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Section;
