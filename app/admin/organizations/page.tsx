'use client';

import { useState } from 'react';

import { OrganizationTable } from '@/features/organization';
import { OrganizationFormDialog } from '@/features/organization';

export default function OrganizationsPage() {
  const [isOrganizationDialogOpen, setIsOrganizationDialogOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex h-full flex-col space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Organizations</h1>

          <p className="text-muted-foreground">Manage organizations across the platform.</p>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <OrganizationTable onAddOrganization={() => setIsOrganizationDialogOpen(true)} />
        </div>
      </div>

      <OrganizationFormDialog open={isOrganizationDialogOpen} onOpenChange={setIsOrganizationDialogOpen} />
    </>
  );
}
