"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import createAuditLog from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementAvailableCount, isFreeAvailable } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscriptiion";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }

  const canCreate = await isFreeAvailable();
  const isPro = await checkSubscription();
  if (!canCreate && !isPro)
    return {
      error:
        "You have reached your free limit. Delete some of your existing boards or Please upgrade to create more!",
    };

  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");
  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  )
    return { error: "Missing Fields. Failed to create Board." };
  let board;
  try {
    // testing purpose
    // throw new Error("testing");
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });
    if (!isPro) await incrementAvailableCount();
    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "db error", // db connection or network error
    };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
}

export const createBoard = createSafeAction(CreateBoard, handler);
