"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { UserDocument } from "../user";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  documents: UserDocument[];
}

export function SearchDialog({
  isOpen,
  onClose,
  documents,
}: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        {/* Adding DialogTitle for accessibility */}
        <DialogTitle>Search Documents and Users</DialogTitle>

        <div className="space-y-4">
          <Input
            placeholder="Search documents or users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <div className="max-h-[400px] overflow-auto">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-2 rounded-lg p-2 hover:bg-accent"
              >
                <div className="flex-1">
                  <div className="font-medium">{doc.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Uploaded by {doc.uploadedBy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
