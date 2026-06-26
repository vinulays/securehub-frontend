import { Skeleton } from "../ui/skeleton";

export default function OrganizationSwitcherSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg p-3">
      <Skeleton className="size-8 rounded-lg" />

      <div className="flex-1 space-y-2">
        <Skeleton className="h-[17.5px] w-32" />
      </div>
    </div>
  );
}
