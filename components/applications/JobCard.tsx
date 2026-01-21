import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Application } from "@prisma/client";
import { ApplicationDialog } from "./ApplicationDialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface JobCardProps {
    application: Application;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "OFFER":
            return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
        case "REJECTED":
            return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
        case "APPLIED":
            return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
        case "TECHNICAL_INTERVIEW":
        case "RECRUITER_SCREEN":
        case "FINAL_ROUND":
            return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800";
        case "WISHLIST":
            return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
        default:
            return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    }
};

export function JobCard({ application }: JobCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: application.id });

    // Local state to control dialog open, although ApplicationDialog can handle it
    const [open, setOpen] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ApplicationDialog initialData={application} mode="edit" open={open} onOpenChange={setOpen}>
                <Card className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group relative">
                    <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start gap-2">
                            <div className="flex items-center gap-2">
                                {application.companyLogo && (
                                    <img
                                        src={application.companyLogo}
                                        alt={application.company}
                                        className="h-8 w-8 rounded-md object-contain bg-white p-0.5 border"
                                    />
                                )}
                                <CardTitle className="text-sm font-medium leading-tight">
                                    {application.company}
                                </CardTitle>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent drag start
                                    // e.preventDefault(); // Might be needed
                                    setOpen(true);
                                }}
                                onPointerDown={(e) => e.stopPropagation()} // Important for dnd-kit
                            >
                                <Pencil className="h-3 w-3" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground mb-2 font-medium">{application.title}</p>
                        <Badge variant="outline" className={cn("text-xs font-normal", getStatusColor(application.status))}>
                            {application.status.replace(/_/g, " ")}
                        </Badge>
                        {application.location && (
                            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                {application.location}
                            </p>
                        )}
                        {application.salaryMin && (
                            <p className="text-xs text-muted-foreground">
                                {application.currency} {application.salaryMin.toLocaleString()}
                                {application.salaryMax ? ` - ${application.salaryMax.toLocaleString()}` : '+'}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </ApplicationDialog>
        </div>
    );
}
