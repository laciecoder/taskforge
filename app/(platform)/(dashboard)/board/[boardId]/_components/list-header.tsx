import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/useAction";
import { updateList } from "@/server/update-list";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import ListOptions from "./list-options";

export default function ListHeader({
  data,
  onAddCard,
}: {
  data: List;
  onAddCard: () => void;
}) {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }

  function disableEditing() {
    setIsEditing(false);
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") formRef.current?.requestSubmit();
  }

  useEventListener("keydown", onKeydown);

  let content = (
    <div onClick={enableEditing} className="w-full text-sm px-2.5 py-1 h-7">
      {data.title}
    </div>
  );

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success("List Renamed Successfully");
      setTitle(data.title);
    },
    onError: (err) => toast.error(err),
    onComplete: () => {
      disableEditing();
    },
  });

  function handleSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }
    execute({ title, id, boardId });
  }

  function onBlur() {
    formRef.current?.requestSubmit();
  }

  if (isEditing) {
    content = (
      <form className="flex-1 px-[2px]" ref={formRef} action={handleSubmit}>
        <input hidden id="id" name="id" value={data.id} />
        <input hidden id="boardId" name="boardId" value={data.boardId} />
        <FormInput
          ref={inputRef}
          errors={fieldErrors}
          id="title"
          placeholder="Enter list title..."
          defaultValue={title}
          onBlur={onBlur}
          className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input
           focus:border-input transition truncate bg-transparent focus:bg-white"
        />
        <button type="submit" hidden />
      </form>
    );
  }

  return (
    <div
      className="pt-2 px-2 text-sm font-semibold flex 
  justify-between items-start gap-x-2"
    >
      {content}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
}
