import ActivityItem from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ActivityList() {
  const { orgId } = auth();
  if (!orgId) redirect("/select-org");

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy:{
      createdAt: "desc"
    }
  });

  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No Activity found inside this organization
      </p>
      {auditLogs.map((log) => (
        <ActivityItem data={log} key={log.id} />
      ))}
    </ol>
  );
}

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[90%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[20%] h-14" />
    </ol>
  );
};
