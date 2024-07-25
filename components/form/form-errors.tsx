import { XCircleIcon } from "lucide-react";

interface FormErrorProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export default function FormErrors({ id, errors }: FormErrorProps) {
  if (!errors) return null;
  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-xs text-rose-500"
    >
      {errors?.[id]?.map((error: string) => (
        <div
          key={error}
          className="flex items-center font-medium border border-rose-500
          bg-rose-500/10 rounded-sm p-3"
        >
          <XCircleIcon className="h-4 w-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
}
