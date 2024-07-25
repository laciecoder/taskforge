import { checkSubscription } from "@/lib/subscriptiion";
import ShowInfo from "../settings/show-info";
import { Separator } from "@/components/ui/separator";
import SubscriptionButton from "./_components/subscription-button";

export default async function BillingPage() {
  const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <ShowInfo isPro={isPro} />
      <Separator className="my-2" />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
}
