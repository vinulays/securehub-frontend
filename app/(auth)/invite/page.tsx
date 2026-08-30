'use client';

import { GalleryVerticalEnd } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { InvitationActivationForm } from '@/features/user';

export default function InvitePage() {
  return (
    <Suspense fallback={<InvitePageLoading />}>
      <InvitePageContent />
    </Suspense>
  );
}

function InvitePageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            SecureHub
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-8">
            <InvitationActivationForm token={token} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InvitePageLoading() {
  return <div className="min-h-svh" />;
}
