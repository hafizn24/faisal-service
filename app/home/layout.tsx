import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="grow">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
