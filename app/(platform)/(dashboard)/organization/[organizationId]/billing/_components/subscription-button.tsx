"use client";

import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { useAction } from "@/hooks/useAction";
import { stripeRedirect } from "@/server/stripe-redirect";
import { toast } from "sonner";

export default function SubscriptionButton({ isPro }: { isPro: boolean }) {
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => (window.location.href = data),
    onError: (err) => toast.error(err),
  });

  const proModal = useProModal();

  function onClick() {
    if (isPro) execute({});
    else proModal.onOpen();
  }

  return (
    <div>
      <Button disabled={isLoading} onClick={onClick}>
        {isPro ? "Manage Subscription" : "Upgrade to Pro"}
      </Button>
    </div>
  );
}
