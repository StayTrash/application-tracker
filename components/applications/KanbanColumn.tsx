import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { JobCard } from "./JobCard";
import { Application } from "@prisma/client";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
    id: string;
    title: string;
    items: Application[];
}

export function KanbanColumn({ id, title, items }: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div
            ref={setNodeRef}
            className="flex h-full w-80 min-w-[20rem] flex-col rounded-lg bg-secondary/50 p-4"
        >
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">{title}</h3>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium border">
                    {items.length}
                </span>
            </div>

            <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
                <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                    {items.map((app) => (
                        <JobCard key={app.id} application={app} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}
