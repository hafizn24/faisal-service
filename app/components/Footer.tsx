"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto text-center px-6">
        {/* Optional separator line above footer */}
        <Separator className="mb-4 bg-gray-700" />

        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Faisal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
