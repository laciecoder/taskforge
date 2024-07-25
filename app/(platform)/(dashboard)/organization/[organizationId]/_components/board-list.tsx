import FormPopOver from "@/components/form/form-popover";
import Hint from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { FREE_BOARD_LIMIT } from "@/constants/board-limit";
import { db } from "@/lib/db";
import { getAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscriptiion";
import { auth } from "@clerk/nextjs/server";
import { HelpCircleIcon, UserRound } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BoardList() {
  const { orgId } = auth();

  if (!orgId) redirect("/select-org");

  const boards = await db.board.findMany({
    where: {
      orgId: orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const availableCount = await getAvailableCount();
  const isPro = await checkSubscription();

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <UserRound className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="group relative aspect-video bg-no-repeat 
            bg-center bg-cover rounded-sm overflow-hidden
            h-full w-full p-2 "
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="text-white relative font-semibold p-2">
              {board.title}
            </p>
          </Link>
        ))}
        <FormPopOver sideOffset={30} side="right">
          <div
            role="button"
            className="flex items-center flex-col 
          aspect-video relative h-full w-full bg-muted rounded-sm 
          gap-y-1 justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Create New Board</p>
            <span className="text-xs">
              {isPro
                ? "Unlimited"
                : `${FREE_BOARD_LIMIT - availableCount} Remaining`}
            </span>
            <Hint
              sideOffset={30}
              description="Free Workspaces can have upto 5 boards. To create more boards upgrade this workspace."
            >
              <HelpCircleIcon className="absolute bottom-2 right-2 h-3 w-3" />
            </Hint>
          </div>
        </FormPopOver>
      </div>
    </div>
  );
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
