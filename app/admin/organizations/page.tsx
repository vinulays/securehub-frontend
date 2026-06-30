import { OrganizationTable } from '@/features/organization';

export default function OrganizationsPage() {
  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Organizations</h1>

        <p className="text-muted-foreground">Manage organizations across the platform.</p>
      </div>

      <OrganizationTable />
    </div>
  );
}
