import { ActionState } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { Board } from "@prisma/client";
import { z } from "zod";

export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, Board>;
