'use client';

import { UserPlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface InviteUserButtonProps {
  onOpen: () => void;
  disabled?: boolean;
}

export function InviteUserButton({ onOpen, disabled = false }: InviteUserButtonProps) {
  return (
    <Button className="h-10 px-8 py-6" onClick={onOpen} disabled={disabled}>
      <UserPlusIcon />
      Invite User
    </Button>
  );
}
