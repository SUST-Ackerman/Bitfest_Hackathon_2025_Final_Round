"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Grid, List } from "lucide-react";

const dummyDocuments = [
  {
    id: 1,
    title: "Project Objective: Fine-Tuning Open-Source LLMs",
    createdBy: "You",
    lastViewed: "18 days ago",
    private: true,
  },
  {
    id: 2,
    title: "Fine-Tuning Open-Source LLMs for Historical Q&A",
    createdBy: "You",
    lastViewed: "23 days ago",
    private: true,
  },
  {
    id: 3,
    title: "Gamma Tips & Tricks",
    createdBy: "You",
    lastViewed: "2 months ago",
    private: true,
  },
];

const UserDocuments = () => {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Documents</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-blue-500 text-white" : ""}
          >
            <Grid className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-blue-500 text-white" : ""}
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Button variant="outline">All</Button>
        <Button variant="outline">Recently Viewed</Button>
        <Button variant="outline">Created by You</Button>
        <Button variant="outline">Favorites</Button>
      </div>

      {/* Documents Display */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col space-y-4"
        }
      >
        {dummyDocuments.map((doc) => (
          <Card key={doc.id} className="p-4 shadow-sm border rounded-md">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg truncate">{doc.title}</h2>
              {doc.private && (
                <span className="text-sm text-gray-500 border px-2 py-1 rounded">
                  Private
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Created by: {doc.createdBy}
            </p>
            <p className="text-sm text-gray-600">
              Last viewed: {doc.lastViewed}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserDocuments;
