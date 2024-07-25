"use client";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { updateBoard } from "@/server/update-board";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

export default function BoardTitle({ data }: { data: Board }) {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated`);
      disableEditing();
    },
    onError: (err) => {
      toast.error("Title Update Failed");
    },
  });

  const [isClicked, setIsClicked] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  function enableEditing() {
    setIsClicked(true);
    setTimeout(() => {
      inputRef.current?.select();
      inputRef.current?.focus();
    }); // to execute in next event cycle so component would be created and ref is pointed
  }

  function disableEditing() {
    setIsClicked(false);
  }

  function onBlur() {
    formRef.current?.requestSubmit();
  }

  const onSubmit = function (formData: FormData) {
    const title = formData.get("title") as string;
    execute({
      title,
      id: data.id,
    });
    disableEditing();
  };

  if (isClicked) {
    return (
      <form ref={formRef} action={onSubmit}>
        <FormInput
          ref={inputRef}
          id="title"
          defaultValue={data.title}
          onBlur={onBlur}
          className="text-lg font-bold px-2 py-1 h-7 bg-transparent 
          focus-visible:outline-none focus-visible:ring-transparent
          border-none"
        />
      </form>
    );
  }

  return (
    <Button
      className="font-bold text-lg h-auto w-auto p-1"
      variant="transparent"
      onClick={enableEditing}
    >
      {data.title}
    </Button>
  );
}
