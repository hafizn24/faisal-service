"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

export default function Header() {
  return (
    <header className="bg-black text-white shadow">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold">Faisal</h1>
      </div>
    </header>
  );
}
