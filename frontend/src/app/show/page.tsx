"use client";

import {
  Bell,
  Coins,
  Plus,
  Import,
  Grid,
  List,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pagination } from "@/components/ui/pagination"; // Assume you have this component or use custom implementation.

export default function WorkspacePage() {
  const router = useRouter();
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [coinBalance, setCoinBalance] = useState(100);
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const [pdfs] = useState([
    {
      id: 1,
      name: "Annual Report 2023",
      status: "Private",
      color: "bg-blue-100",
    },
    {
      id: 2,
      name: "মার্কেটিং স্ট্র্যাটেজি",
      status: "Shared",
      color: "bg-green-100",
    },
    {
      id: 3,
      name: "Financial Projections",
      status: "Public",
      color: "bg-yellow-100",
    },
    {
      id: 4,
      name: "Product Roadmap",
      status: "Private",
      color: "bg-purple-100",
    },
    { id: 5, name: "দলীয় লক্ষ্য", status: "Shared", color: "bg-pink-100" },
    { id: 6, name: "Project A", status: "Public", color: "bg-orange-100" },
    { id: 7, name: "Project B", status: "Shared", color: "bg-red-100" },
    { id: 8, name: "Design Mockups", status: "Private", color: "bg-teal-100" },
    { id: 9, name: "Roadmap Plan", status: "Public", color: "bg-indigo-100" },
    {
      id: 10,
      name: "Team Collaboration",
      status: "Shared",
      color: "bg-gray-100",
    },
  ]);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPdfs = pdfs.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(pdfs.length / itemsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search) {
      const pdfMatch = pdfs.find((pdf) =>
        pdf.name.toLowerCase().includes(search.toLowerCase())
      );

      if (pdfMatch) {
        router.push(`/pdf/${pdfMatch.id}`);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white p-6 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Workspace</h2>
              <Badge variant="secondary">FREE</Badge>
            </div>
          </div>
        </div>

        <div className="relative mb-6">
          <Input
            placeholder="Search PDFs or Profiles"
            value={search}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            className="pl-8"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <header className="border-b bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">PDF Manager</h1>
            <div className="flex items-center gap-4">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New PDF
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="default"
                className="flex items-center gap-2 bg-yellow-500 text-white"
              >
                <Coins className="h-4 w-4" />
                {coinBalance} Coins
              </Button>
            </div>
          </div>
        </header>

        <ScrollArea className="flex-1 p-6">
          <div
            className={`grid ${
              view === "grid" ? "grid-cols-2" : "grid-cols-1"
            } gap-4`}
          >
            {currentPdfs.map((pdf) => (
              <Card
                key={pdf.id}
                className="cursor-pointer overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                onClick={() => router.push(`/pdf/${pdf.id}`)}
              >
                <CardContent className="p-4 flex flex-col items-start">
                  <div
                    className={`w-full h-40 rounded-lg flex items-center justify-center text-3xl font-bold text-white ${pdf.color}`}
                  >
                    {pdf.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-semibold text-lg mt-4">{pdf.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant={
                        pdf.status === "Private" ? "secondary" : "default"
                      }
                      className="text-xs"
                    >
                      {pdf.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {pdf.updatedAt}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
