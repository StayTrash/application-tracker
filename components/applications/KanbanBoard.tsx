"use client";

import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState, useEffect, useTransition } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { JobCard } from "./JobCard";
import { Application, ApplicationStatus } from "@prisma/client";
import { updateApplicationStatus } from "@/actions/applications";

// Temporary Types until we fetch from DB
export type Job = {
    id: string;
    title: string;
    company: string;
    status: ApplicationStatus | string;
};

const COLUMNS = [
    { id: "WISHLIST", title: "Wishlist" },
    { id: "APPLIED", title: "Applied" },
    { id: "RECRUITER_SCREEN", title: "Recruiter Screen" },
    { id: "TECHNICAL_INTERVIEW", title: "Technical Interview" },
    { id: "FINAL_ROUND", title: "Final Round" },
    { id: "OFFER", title: "Offer" },
    { id: "REJECTED", title: "Rejected" },
];

export function KanbanBoard({ initialData }: { initialData: Application[] }) {
    const [items, setItems] = useState<Application[]>(initialData);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as string);
    }

    function handleDragOver(event: DragOverEvent) {
        // const { active, over } = event;
        // if (!over) return;
        // Collision detection strategies often handle the visual sorting here
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // Check if dropped on a column (status change)
        if (COLUMNS.some(col => col.id === overId)) {
            // Find current item
            const activeItem = items.find(i => i.id === activeId);
            if (activeItem && activeItem.status !== overId) {
                setItems((items) =>
                    items.map((item) =>
                        item.id === activeId ? { ...item, status: overId as ApplicationStatus } : item
                    )
                );

                // Persist to DB
                startTransition(async () => {
                    await updateApplicationStatus(activeId, overId as ApplicationStatus);
                });
            }
        }
    }

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Prevent hydration mismatch
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex h-full gap-4 overflow-x-auto p-4">
                {COLUMNS.map((col) => (
                    <KanbanColumn
                        key={col.id}
                        id={col.id}
                        title={col.title}
                        items={items.filter((item) => item.status === col.id)}
                    />
                ))}
            </div>
            <DragOverlay>
                {activeId ? (
                    <JobCard application={items.find((i) => i.id === activeId)!} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
