"use client";

import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityChart } from "./_components/analytics/activity-chart";
import { StatsCard } from "./_components/analytics/stats-card";
import { DocumentGrid } from "./_components/documents/document-grid";
import { DocumentList } from "./_components/documents/document-list";
import { SearchDialog } from "./_components/dialog/search-dialog";
import { LayoutGrid, List, Search, Home, User, FileText } from "lucide-react";
import { useUserInfo } from "@/features/users/hooks/use-doc-content";

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

const mockActivityData = Array.from({ length: 30 }, (_, i) => ({
  date: `2024-${i + 1}`,
  value: Math.floor(Math.random() * 100),
}));

interface ParamProps {
  params: {
      username: string;
  };
}

export default function UserPage(props: ParamProps) {
  const { username } = props.params;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const user = useUserInfo({username});

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{user.data?.username}</h1>
        <Button variant="outline" onClick={() => setIsSearchOpen(true)}>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard title="Total Documents" value="42" />
        <StatsCard title="Active Days" value="156" />
        <StatsCard title="Storage Used" value="2.4 GB" />
      </div>

      {/* Activity Chart */}
      <Card className="p-4">
        <h2 className="mb-4 text-xl font-semibold">Activity Overview</h2>
        <ActivityChart data={mockActivityData} />
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="documents" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-accent" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-accent" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-4">
          {viewMode === "grid" ? (
            <DocumentGrid documents={mockDocuments} />
          ) : (
            <DocumentList documents={mockDocuments} />
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="mt-4">
          {/* Add more analytics components here */}
        </TabsContent>
      </Tabs>

      {/* Search Dialog */}
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        documents={mockDocuments}
      />
    </>
  );
}
