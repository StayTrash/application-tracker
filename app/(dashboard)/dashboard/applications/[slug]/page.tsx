import { getApplicationBySlug } from "@/actions/get-application";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, LinkIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function JobDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const job = await getApplicationBySlug(slug);

    if (!job) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Link href="/dashboard/applications" className="hover:text-foreground">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <span>Back to Applications</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
                    <div className="flex items-center gap-2 text-lg font-medium text-muted-foreground">
                        {job.company}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge className="text-md px-3 py-1" variant={job.status === "OFFER" ? "default" : "secondary"}>
                        {job.status}
                    </Badge>
                    <Button>Edit Job</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {job.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location} ({job.workType})
                            </div>
                        )}
                        {job.jobUrl && (
                            <div className="flex items-center gap-1">
                                <LinkIcon className="h-4 w-4" />
                                <a href={job.jobUrl} target="_blank" rel="noreferrer" className="hover:underline">
                                    Job Posting
                                </a>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Applied {job.dateApplied?.toLocaleDateString()}
                        </div>
                    </div>

                    <Tabs defaultValue="notes" className="w-full">
                        <TabsList>
                            <TabsTrigger value="notes">Notes</TabsTrigger>
                            <TabsTrigger value="timeline">Timeline</TabsTrigger>
                            <TabsTrigger value="checklist">Checklist</TabsTrigger>
                        </TabsList>
                        <TabsContent value="notes" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>My Notes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose dark:prose-invert">
                                        {job.notes ? (
                                            <div dangerouslySetInnerHTML={{ __html: job.notes }} />
                                        ) : (
                                            <p className="text-muted-foreground italic">No notes added yet.</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="timeline" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Stage History</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Timeline implementation coming soon.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="checklist" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>To-Do List</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Checklist implementation coming soon.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Salary Range</div>
                                <div className="text-sm">
                                    {job.salaryMin ? `${job.currency} ${job.salaryMin.toLocaleString()}` : 'N/A'}
                                    {' - '}
                                    {job.salaryMax ? `${job.salaryMax.toLocaleString()}` : ''}
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Contacts</div>
                                <div className="mt-2 space-y-2">
                                    {job.contacts.length === 0 && <span className="text-sm text-muted-foreground italic">No contacts added</span>}
                                    {job.contacts.map(c => (
                                        <div key={c.id} className="text-sm">
                                            <div className="font-medium">{c.name}</div>
                                            <div className="text-xs text-muted-foreground">{c.role}</div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" size="sm" className="mt-2 w-full">Add Contact</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
