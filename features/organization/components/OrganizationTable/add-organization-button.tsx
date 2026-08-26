'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AddOrganizationButtonProps {
  onOpen: () => void;
  disabled?: boolean;
}

export function AddOrganizationButton({ onOpen, disabled = false }: AddOrganizationButtonProps) {
  return (
    <Button className="h-10 px-8 py-6" onClick={onOpen} disabled={disabled}>
      <PlusIcon />
      Add Organization
    </Button>
  );
}
