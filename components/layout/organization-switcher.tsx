"use client";

import { AudioWaveform, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { MyOrganizationResponse } from "@/features/organization";
import {
  useMyOrganizations,
  useOrganizationSwitcher,
} from "@/features/organization";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import OrganizationSwitcherSkeleton from "./organization-switcher-skeleton";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const { data: organizations = [], isLoading } = useMyOrganizations();
  const { activeOrganization, switchOrganization } = useOrganizationSwitcher();

  const handleOrganizationSelect = async (
    organization: MyOrganizationResponse,
  ) => {
    await switchOrganization(organization);
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    if (!activeOrganization && organizations.length > 0) {
      switchOrganization(organizations[0]);
    }
  }, [organizations, activeOrganization, switchOrganization]);

  if (isLoading) {
    return <OrganizationSwitcherSkeleton />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                  <AudioWaveform className="size-4" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeOrganization?.name}
                  </span>
                </div>

                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            }
          />

          <PopoverContent
            className="rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <Command>
              <CommandInput placeholder="Search organizations..." />

              <CommandList>
                <CommandEmpty>No organization found.</CommandEmpty>

                <CommandGroup>
                  {organizations.map((organization: MyOrganizationResponse) => (
                    <CommandItem
                      key={organization.id}
                      value={organization.name}
                      onSelect={() => handleOrganizationSelect(organization)}
                      data-checked={
                        activeOrganization &&
                        activeOrganization.id === organization.id
                      }
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                          <div className="flex size-6 items-center justify-center rounded-md border">
                            <AudioWaveform className="size-3.5 shrink-0" />
                          </div>

                          {organization.name}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
