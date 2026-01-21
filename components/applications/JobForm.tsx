"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, ApplicationValues } from "@/lib/schemas";
import { Application } from "@prisma/client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import { createApplication, updateApplication } from "@/actions/applications";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
// We will implement server actions later, for now we log to console

export function JobForm({ initialData, onSuccess }: { initialData?: Application, onSuccess?: () => void }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<ApplicationValues>({
        resolver: zodResolver(applicationSchema) as any,
        defaultValues: {
            company: initialData?.company || "",
            companyLogo: initialData?.companyLogo || "",
            title: initialData?.title || "",
            status: (initialData?.status as any) || "WISHLIST",
            currency: initialData?.currency || "USD",
            workType: (initialData?.workType as any) || "Remote",
            jobUrl: initialData?.jobUrl || "",
            location: initialData?.location || "",
            notes: initialData?.notes || "",
            salaryMin: initialData?.salaryMin ?? undefined,
            salaryMax: initialData?.salaryMax ?? undefined,
            dateApplied: initialData?.dateApplied ? new Date(initialData.dateApplied) : undefined,
        },
        mode: "onChange",
    });

    const { formState: { errors } } = form; // Destructure for debugging if needed

    function onSubmit(data: ApplicationValues) {
        startTransition(async () => {
            if (initialData?.id) {
                // Update
                const result = await updateApplication(initialData.id, data);
                if (result.error) {
                    toast.error(result.error);
                } else {
                    toast.success("Application updated successfully");
                    if (onSuccess) onSuccess();
                    router.refresh();
                }
            } else {
                // Create
                const result = await createApplication(data);
                if (result.error) {
                    toast.error(result.error);
                } else {
                    toast.success("Application added successfully");
                    form.reset();
                    if (onSuccess) onSuccess();
                    router.refresh();
                }
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="Google, Amazon..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Senior Frontend Engineer" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="New York, Remote..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="workType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Work Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Remote">Remote</SelectItem>
                                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                                        <SelectItem value="On-site">On-site</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="salaryMin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Min Salary</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        {...field}
                                        value={field.value ?? ""}
                                        onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="salaryMax"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Max Salary</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        {...field}
                                        value={field.value ?? ""}
                                        onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Currency</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Currency" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="GBP">GBP</SelectItem>
                                        <SelectItem value="INR">INR</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="WISHLIST">Wishlist</SelectItem>
                                        <SelectItem value="APPLIED">Applied</SelectItem>
                                        <SelectItem value="RECRUITER_SCREEN">Recruiter Screen</SelectItem>
                                        <SelectItem value="TECHNICAL_INTERVIEW">Technical Interview</SelectItem>
                                        <SelectItem value="FINAL_ROUND">Final Round</SelectItem>
                                        <SelectItem value="OFFER">Offer</SelectItem>
                                        <SelectItem value="REJECTED">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateApplied"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date Applied</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <FormField
                        control={form.control}
                        name="jobUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : (initialData ? "Save Changes" : "Add Application")}
                </Button>
            </form>
        </Form>
    );
}
