import { ApplicationsView } from "@/components/applications/ApplicationsView";
import { getUserApplications } from "@/actions/applications";

export default async function ApplicationsPage() {
    const applications = await getUserApplications();

    return (
        <div className="flex h-full flex-col">
            <ApplicationsView initialData={applications} />
        </div>
    );
}
