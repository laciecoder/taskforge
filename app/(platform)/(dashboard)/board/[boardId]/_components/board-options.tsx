"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/useAction";
import { deleteBoard } from "@/server/delete-board";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

export default function BoardOptions({ id }: { id: string }) {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (err) => toast.error(err),
  });

  function onDelete() {
    execute({ id });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto p-2">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="bottom" className="px-0 pt-3 pb-3">
        <div className="text-sm pb-4 font-medium text-center text-neutral-600">
          Board Actions
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            disabled={isLoading}
            className="text-neutral-600 h-auto w-auto p-2 absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          onClick={onDelete}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Delete this Board
        </Button>
      </PopoverContent>
    </Popover>
  );
}
