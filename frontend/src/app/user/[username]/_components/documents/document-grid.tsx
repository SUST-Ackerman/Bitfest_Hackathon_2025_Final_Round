import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import type { UserDocument } from "../user";

interface DocumentGridProps {
  documents: UserDocument[];
}

export function DocumentGrid({ documents }: DocumentGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Card key={doc.id} className="cursor-pointer hover:bg-accent">
          <CardHeader className="flex flex-row items-center gap-2">
            <FileText className="h-4 w-4" />
            <CardTitle className="text-sm font-medium">{doc.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Uploaded by {doc.uploadedBy} on{" "}
            {new Date(doc.uploadedAt).toLocaleDateString()}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
