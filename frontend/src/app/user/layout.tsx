"use client";

import { FileText, Home, Search, User } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

// Mock data - replace with real data fetching
const mockDocuments = [
    {
        id: "1",
        name: "Document 1.pdf",
        uploadedBy: "user1",
        uploadedAt: "2024-01-03T12:00:00Z",
        fileUrl: "/docs/1.pdf",
    },
    // Add more mock documents as needed
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const pathname = usePathname();
    const username = params.username;
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const navLinks = [
        { href: `/user/${params.username}/`, label: "Profile", icon: User },
        {
            href: `/user/${params.username}/documents`,
            label: "Documents",
            icon: FileText,
        },
        { href: `/${params.username}/search`, label: "Search", icon: Search },
    ];

    return (
        <div className="flex h-screen">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-gray-900 text-white p-6">
                <h2 className="text-xl font-bold mb-6">Workspace</h2>
                <nav className="space-y-4">
                    {navLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 ${
                                pathname === href ? "bg-gray-800" : ""
                            }`}
                        >
                            <Icon className="h-5 w-5" /> {label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 space-y-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}