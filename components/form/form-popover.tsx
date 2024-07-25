"use client";

import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { FormInput } from "./form-input";
import FormSubmit from "./form-submit";
import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/server/create-board";
import { toast } from "sonner";
import FormPicker from "./form-picker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

interface PopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export default function FormPopOver({
  children,
  side = "bottom",
  sideOffset = 0,
  align,
}: PopoverProps) {
  const popOverCloseRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();

  const proModal = useProModal();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board Created!");
      router.push(`/board/${data.id}`);
      popOverCloseRef.current?.click();
    },
    onError: (err) => {
      toast.error(err);
      proModal.onOpen();
    },
  });

  const onSubmit = (data: FormData) => {
    const title = data.get("title") as string;
    const image = data.get("image") as string;
    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
        align={align}
      >
        <div className="text-sm font-medium text-center text-neutral-600">
          Create board
        </div>
        <PopoverClose ref={popOverCloseRef} asChild>
          <Button
            variant="ghost"
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form className="space-y-4" action={onSubmit}>
          <FormPicker id="image" errors={fieldErrors} />
          <FormInput
            id="title"
            errors={fieldErrors}
            label="board title"
            type="text"
          />
          <FormSubmit className="w-full">create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
