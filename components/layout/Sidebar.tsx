import Link from "next/link";
import { LayoutDashboard, Briefcase, BarChart2, Settings, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ApplicationDialog } from "@/components/applications/ApplicationDialog";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Applications", href: "/dashboard/applications", icon: Briefcase },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    return (
        <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span>JobTracker</span>
                </Link>
            </div>

            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t">
                <ApplicationDialog mode="create">
                    <Button className="w-full gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Add New Job
                    </Button>
                </ApplicationDialog>
            </div>
        </div>
    );
}
