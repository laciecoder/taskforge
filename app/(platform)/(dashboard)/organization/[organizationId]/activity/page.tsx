import { Separator } from "@/components/ui/separator";
import ShowInfo from "../settings/show-info";
import ActivityList from "./activity-list";
import { Suspense } from "react";
import { checkSubscription } from "@/lib/subscriptiion";

export default async function ActivityPage() {
  const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <ShowInfo isPro={isPro} />
      <Separator />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
}
