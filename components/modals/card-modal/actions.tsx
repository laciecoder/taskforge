"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";
import { useAction } from "@/hooks/useAction";
import { copyCard } from "@/server/copy-card";
import { deleteCard } from "@/server/delete-card";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionProps {
  data: CardWithList;
}

export default function Actions({ data }: ActionProps) {
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isCopying } = useAction(
    copyCard,
    {
      onSuccess: (data) => toast.success(`Card "${data.title}" is copied`),
      onError: (err) => toast.error(err),
    }
  );
  const { execute: executeDeleteCard, isLoading: isDeleting } = useAction(
    deleteCard,
    {
      onSuccess: (data) => toast.success(`Card "${data.title}" is deleted`),
      onError: (err) => toast.error(err),
      onComplete: () => cardModal.onClose(),
    }
  );

  const params = useParams();
  const boardId = params.boardId as string;

  function onCopy() {
    executeCopyCard({ boardId, id: data.id });
  }

  function onDelete() {
    executeDeleteCard({ boardId, id: data.id });
  }

  return (
    <div className="space-y-2 mt-2 flex flex-col">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="ghost"
        className="bg-gray-200"
        size="sm"
        onClick={onCopy}
        disabled={isCopying}
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        variant="ghost"
        className="bg-gray-200"
        size="sm"
        onClick={onDelete}
        disabled={isDeleting}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
}

Actions.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
