'use client';

import { MoreVerticalIcon, PencilIcon, PowerIcon } from 'lucide-react';
import { useState } from 'react';

import { ConfirmationDialog } from '@/components/common/confirmation-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getErrorMessage } from '@/lib/error-handler';

import { useOrganizationMutations } from '../../hooks/use-organization-mutations';
import { type Organization, OrganizationStatusEnum } from '../../types/organization.types';
import { OrganizationFormDialog } from './organization-form-dialog';

export function OrganizationRowActions({ organization }: { organization: Organization }) {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState<boolean>(false);
  const [statusError, setStatusError] = useState<string>();

  const { updateStatusMutation } = useOrganizationMutations();

  const isActivating = organization.status === OrganizationStatusEnum.INACTIVE;

  const confirmStatusChange = async () => {
    setStatusError(undefined);

    try {
      await updateStatusMutation.mutateAsync({ id: organization.id, isActive: isActivating });

      setIsStatusDialogOpen(false);
    } catch (error) {
      setStatusError(getErrorMessage(error));
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${organization.name}`}>
              <MoreVerticalIcon />
            </Button>
          }
        />

        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            <PencilIcon />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            variant={isActivating ? 'default' : 'destructive'}
            onClick={() => setIsStatusDialogOpen(true)}
          >
            <PowerIcon />
            {isActivating ? 'Activate' : 'Deactivate'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <OrganizationFormDialog open={isEditOpen} onOpenChange={setIsEditOpen} organization={organization} />

      <ConfirmationDialog
        open={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
        title={isActivating ? 'Activate Organization' : 'Deactivate Organization'}
        description={
          <>
            Are you sure you want to {isActivating ? 'activate' : 'deactivate'} {organization.name}?
          </>
        }
        confirmLabel={isActivating ? 'Activate' : 'Deactivate'}
        confirmVariant={isActivating ? 'default' : 'destructive'}
        onConfirm={confirmStatusChange}
        isPending={updateStatusMutation.isPending}
        error={statusError}
      />
    </>
  );
}
