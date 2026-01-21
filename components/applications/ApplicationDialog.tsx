"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { JobForm } from "@/components/applications/JobForm";
import { useState } from "react";
import { Application } from "@prisma/client";

interface ApplicationDialogProps {
    children?: React.ReactNode;
    initialData?: Application;
    mode?: "create" | "edit";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function ApplicationDialog({
    children,
    initialData,
    mode = "create",
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange
}: ApplicationDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const setOpen = isControlled ? controlledOnOpenChange : setInternalOpen;

    const handleSuccess = () => {
        if (setOpen) setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children && <DialogTrigger asChild>{children}</DialogTrigger>}
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{mode === "create" ? "Add New Application" : "Edit Application"}</DialogTitle>
                    <DialogDescription>
                        {mode === "create"
                            ? "Enter the details of the job you applied for."
                            : "Update the details of your application."}
                    </DialogDescription>
                </DialogHeader>
                <JobForm initialData={initialData} onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    );
}
