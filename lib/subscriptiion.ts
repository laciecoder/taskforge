import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

const DAY_IN_MS = 86_400_000;

export async function checkSubscription() {
  const { orgId } = auth();
  if (!orgId) return false;
  const subscription = await db.organizationSubscription.findUnique({
    where: {
      orgId,
    },
  });

  if (!subscription) return false;

  const {
    stripeCurrentPeriodEnd,
    stripeCustomerId,
    stripePriceId,
    stripeSubscriptionId,
  } = subscription;

  const isValid =
    stripePriceId &&
    stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid; // !! is conversion to boolean without using Boolean()
}
