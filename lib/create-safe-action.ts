import { z } from "zod";

// whatever the content it is of type string
export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

// first type would be of input, second type would be of output
export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export function createSafeAction<TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const result = schema.safeParse(data);
    if (!result.success) {
      return {
        fieldErrors: result.error.flatten().fieldErrors as FieldErrors<TInput>,
      };
    }
    return handler(result.data);
  };
}
