"use client";

import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { updateCard } from "@/server/update-card";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

export default function Header({ data }: { data: CardWithList }) {
  const [title, setTitle] = useState(data.title);

  const queryClient = useQueryClient();
  const params = useParams();

  const inputRef = useRef<ElementRef<"input">>(null);

  function onBlur() {
    inputRef.current?.form?.requestSubmit();
  }

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;
    if (title === data.title) return;
    execute({ title, boardId, id: data.id });
  }

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`card name changed to ${data.title}`);
      setTitle(data.title);
    },
    onError: (err) => toast.error(err),
  });

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-4 w-4 mt-1 text-neutral-600" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            defaultValue={title}
            ref={inputRef}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-3 bg-neutral-200" />
      </div>
    </div>
  );
};
