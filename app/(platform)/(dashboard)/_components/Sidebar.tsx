"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import NavItem, { Organization } from "./NavItem";

export default function Sidebar({
  storageKey = "sidebar-desktop",
}: {
  storageKey?: string;
}) {
  const [showing, setShowing] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization, isLoaded } = useOrganization();
  const { userMemberships, isLoaded: isLoadedList } = useOrganizationList({
    // https://clerk.com/docs/references/react/use-organization-list#use-organization-list for pagination
    userMemberships: {
      infinite: true,
    },
  });
  const accordionKeys: string[] = Object.keys(showing).reduce(
    (acc: string[], key: string) => {
      if (showing[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );
  const onShowing = function (id: string) {
    setShowing((prev) => ({ ...prev, [id]: !showing[id] }));
  };

  if (!isLoaded || !isLoadedList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="font-medium flex items-center mb-2 text-xs">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          variant="ghost"
          size="icon"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={accordionKeys} className="mt-2">
        {userMemberships.data.map(({ organization: item }) => (
          <NavItem
            key={item.id}
            isActive={item.id === organization?.id}
            isShowing={showing[item.id]}
            organization={item as Organization}
            onShowing={onShowing}
          />
        ))}
      </Accordion>
    </>
  );
}
