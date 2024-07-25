import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: "Title is required!",
      invalid_type_error: "Title is not of appropriate type!",
    })
    .min(3, {
      message: "Title should be of 3 characters minimum",
    }),
  image: z.string({
    required_error: "Image is Required",
    invalid_type_error: "Image is not of appropriate type",
  }),
});
