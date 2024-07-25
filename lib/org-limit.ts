import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { FREE_BOARD_LIMIT } from "@/constants/board-limit";

export async function incrementAvailableCount() {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorized");

  const orgLimit = await db.organizationLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await db.organizationLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count + 1,
      },
    });
  } else {
    await db.organizationLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
}

export async function decrementAvailableCount() {
  const { orgId } = auth();

  if (!orgId) throw new Error("Unauthorized");

  const orgLimit = await db.organizationLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await db.organizationLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
      },
    });
  } else {
    await db.organizationLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
}

export async function isFreeAvailable() {
  const { orgId } = auth();
  if (!orgId) throw new Error("Unauthorized");
  const orgLimit = await db.organizationLimit.findUnique({
    where: {
      orgId,
    },
  });
  if (!orgLimit || orgLimit.count < FREE_BOARD_LIMIT) return true;
  return false;
}

export async function getAvailableCount() {
  const { orgId } = auth();
  if (!orgId) return 0;
  const limit = await db.organizationLimit.findUnique({
    where: {
      orgId,
    },
  });
  if (!limit) return 0;
  return limit.count;
}
