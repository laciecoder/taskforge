"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

export default function ShowInfo({ isPro }: { isPro: boolean }) {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <ShowInfo.Skeleton />;
  }
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-16 h-16 relative">
        <Image
          src={organization?.imageUrl!}
          fill
          alt="Organization Logo"
          className="rounded-md object-cover "
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-1" />
          {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
}

ShowInfo.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-16 h-16 relative">
        <Skeleton className="absolute w-full h-full" />
      </div>
      <div className="space-y-1">
        <Skeleton className="w-48 h-10" />
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};
