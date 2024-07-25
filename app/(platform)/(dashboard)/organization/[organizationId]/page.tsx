import { Separator } from "@/components/ui/separator";
import ShowInfo from "./settings/show-info";
import BoardList from "./_components/board-list";
import { Suspense } from "react";
import { checkSubscription } from "@/lib/subscriptiion";

export default async function OrganizationIdPage() {
  const isPro = await checkSubscription();
  return (
    <div className="w-full mb-20">
      <ShowInfo isPro={isPro} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
}
