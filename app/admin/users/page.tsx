'use client';

import { useState } from 'react';

import { InviteUserDialog, UserTable } from '@/features/user';

export default function UsersPage() {
  const [isInviteUserDialogOpen, setIsInviteUserDialogOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex h-full flex-col space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Users</h1>

          <p className="text-muted-foreground">Manage users across the platform.</p>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <UserTable onInviteUser={() => setIsInviteUserDialogOpen(true)} />
        </div>
      </div>

      <InviteUserDialog open={isInviteUserDialogOpen} onOpenChange={setIsInviteUserDialogOpen} />
    </>
  );
}
