'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { OrganizationFormDialog } from './organization-form-dialog';

export function AddOrganizationButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusIcon />
        Add Organization
      </Button>

      <OrganizationFormDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
