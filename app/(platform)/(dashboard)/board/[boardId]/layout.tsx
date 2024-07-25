import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import BoardNavBar from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId)
    return {
      title: "Board",
    };
  const data = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });
  return {
    title: data?.title || "Board",
  };
}

export default async function BoardIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) redirect("/select-org");
  const { boardId } = params;
  const board = await db.board.findUnique({
    where: {
      orgId: orgId,
      id: boardId,
    },
  });
  if (!board) notFound();

  return (
    <div
      className="bg-no-repeat h-full relative bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavBar board={board} />
      <div className="absolute inset-0 bg-black/25 z-0" />
      <main className="relative pt-28 h-full z-1">{children}</main>
    </div>
  );
}
