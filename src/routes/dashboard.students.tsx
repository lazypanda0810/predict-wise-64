import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Search, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { STUDENTS, bandColor } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/students")({
  head: () => ({
    meta: [
      { title: "Students — EduPredict.ai" },
      { name: "description", content: "Search, filter and manage every student record in the cohort." },
      { property: "og:title", content: "Students — EduPredict.ai" },
      { property: "og:description", content: "Manage student records and predictions." },
    ],
  }),
  component: StudentsPage,
});

const PAGE_SIZE = 10;

function StudentsPage() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const rows = useMemo(
    () =>
      STUDENTS.filter(
        (s) =>
          s.name.toLowerCase().includes(q.toLowerCase()) ||
          s.department.toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const view = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
        <div className="relative min-w-0 sm:w-80">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value.slice(0, 60));
              setPage(1);
            }}
            placeholder="Search students or departments"
            className="pl-9"
          />
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 size-4" /> Import CSV
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="surface-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Internal</TableHead>
              <TableHead>Band</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {view.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="text-muted-foreground">{s.id}</TableCell>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.department}</TableCell>
                <TableCell>{s.attendance}%</TableCell>
                <TableCell>{s.internal}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={bandColor(s.band)}>
                    {s.band}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {view.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  No students match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Page {page} of {pages} · {rows.length} records
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled={page === pages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}