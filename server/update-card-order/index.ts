"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";
import { revalidatePath } from "next/cache";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "unauthorized user",
    };
  }
  const { items, boardId } = data;
  let cards;

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );
    cards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder cards",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: cards };
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
