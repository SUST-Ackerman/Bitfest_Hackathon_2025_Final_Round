import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";
import type { UserDocument } from "../user";

interface DocumentListProps {
  documents: UserDocument[];
}

export function DocumentList({ documents }: DocumentListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Uploaded By</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {doc.name}
            </TableCell>
            <TableCell>{doc.uploadedBy}</TableCell>
            <TableCell>
              {new Date(doc.uploadedAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
