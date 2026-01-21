import { UserNav } from "@/components/layout/UserNav";

export function TopNav({ session }: { session: any }) {
    return (
        <header className="flex h-16 w-full items-center justify-between border-b bg-card px-6">
            <div className="font-semibold text-lg">Dashboard</div>
            <div className="flex items-center gap-4">
                <UserNav session={session} />
            </div>
        </header>
    );
}
