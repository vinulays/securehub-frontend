import { UserTable } from '@/features/user';

export default function UsersPage() {
  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Users</h1>

        <p className="text-muted-foreground">Manage users across the platform.</p>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <UserTable />
      </div>
    </div>
  );
}
