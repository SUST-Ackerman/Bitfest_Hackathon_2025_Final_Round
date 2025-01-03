"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Home, FileText, Settings, Menu } from "lucide-react";
import Link from "next/link";

export function NavBar() {
  return (
    <Sheet>
      {/* Navbar Toggle Button */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      {/* Sidebar Content */}
      <SheetContent side="left" className="p-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-lg font-bold">Dashboard</div>

          {/* Navigation Links */}
          <nav className="space-y-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-lg font-medium hover:text-primary"
            >
              <Home className="h-5 w-5" />
              Banglish to Bangla
            </Link>
            <Link
              href="/documents"
              className="flex items-center gap-3 text-lg font-medium hover:text-primary"
            >
              <FileText className="h-5 w-5" />
              See Documents
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 text-lg font-medium hover:text-primary"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
