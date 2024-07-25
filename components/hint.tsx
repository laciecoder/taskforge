import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}
export default function Hint({
  children,
  description,
  side = "top",
  sideOffset = 0,
}: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        {" "}
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className="text-xs max-w-56 break-words rounded-md shadow-sm"
        >
          {description}
        </TooltipContent>{" "}
      </Tooltip>
    </TooltipProvider>
  );
}
