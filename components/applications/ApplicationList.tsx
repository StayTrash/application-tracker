"use client";

import { Application } from "@prisma/client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, ExternalLink } from "lucide-react";
import { ApplicationDialog } from "./ApplicationDialog";
import { format } from "date-fns";
import { useState } from "react";

interface ApplicationListProps {
    items: Application[];
}

export function ApplicationList({ items }: ApplicationListProps) {
    const [editingId, setEditingId] = useState<string | null>(null);

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                                No applications found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        items.map((app) => (
                            <TableRow key={app.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        {app.companyLogo && (
                                            <img
                                                src={app.companyLogo}
                                                alt={app.company}
                                                className="h-6 w-6 rounded-full object-cover"
                                            />
                                        )}
                                        {app.company}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {app.title}
                                        {app.jobUrl && (
                                            <a
                                                href={app.jobUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{app.status}</Badge>
                                </TableCell>
                                <TableCell>{app.location || "-"}</TableCell>
                                <TableCell>
                                    {app.salaryMin !== null && app.salaryMax !== null
                                        ? `${app.currency} ${app.salaryMin.toLocaleString()} - ${app.salaryMax.toLocaleString()}`
                                        : "-"}
                                </TableCell>
                                <TableCell>
                                    {app.dateApplied
                                        ? format(new Date(app.dateApplied), "MMM d, yyyy")
                                        : "-"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <ApplicationDialog
                                        mode="edit"
                                        initialData={app}
                                        open={editingId === app.id}
                                        onOpenChange={(open) => setEditingId(open ? app.id : null)}
                                    >
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </ApplicationDialog>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
