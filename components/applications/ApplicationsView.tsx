"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanBoard } from "./KanbanBoard";
import { ApplicationList } from "./ApplicationList";
import { Application } from "@prisma/client";
import { LayoutGrid, List } from "lucide-react";

interface ApplicationsViewProps {
    initialData: Application[];
}

export function ApplicationsView({ initialData }: ApplicationsViewProps) {
    return (
        <Tabs defaultValue="kanban" className="flex h-full flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
                    <p className="text-muted-foreground">
                        Manage and track your job applications.
                    </p>
                </div>
                <TabsList>
                    <TabsTrigger value="kanban">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Board
                    </TabsTrigger>
                    <TabsTrigger value="list">
                        <List className="mr-2 h-4 w-4" />
                        List
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="kanban" className="flex-1 overflow-hidden data-[state=inactive]:hidden">
                <KanbanBoard initialData={initialData} />
            </TabsContent>
            <TabsContent value="list" className="flex-1 overflow-auto data-[state=inactive]:hidden">
                <ApplicationList items={initialData} />
            </TabsContent>
        </Tabs>
    );
}
