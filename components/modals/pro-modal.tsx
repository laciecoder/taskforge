"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/useAction";
import { stripeRedirect } from "@/server/stripe-redirect";
import { toast } from "sonner";

export default function ProModal() {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (err) => toast.error(err),
  });
  function onClick() {
    execute({});
  }
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/hero.jpg" alt="Hero" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade to TaskForge Pro Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of TaskForge
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited Boards</li>
              <li>Advanced Checklists</li>
              <li>Admin and Security Features</li>
              <li>And Much More!</li>
            </ul>
          </div>
          <Button onClick={onClick} disabled={isLoading} className="w-full">
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
