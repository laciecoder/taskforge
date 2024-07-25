"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateListOrder } from "./schema";
import { revalidatePath } from "next/cache";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "unauthorized user",
    };
  }
  const { items, boardId } = data;
  let lists;

  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );
    lists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder list",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: lists };
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
