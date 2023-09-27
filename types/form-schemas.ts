import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const loginSchema = z.object({
  email: z.string().nonempty({ message: "Email required!" }),
  password: z.string().nonempty({ message: "Password Required!" }),
});

export const postSchema = z.object({
  content: z
    .string()
    .max(300, { message: "Post cannot exceed 300 characters." }),
  images: z.any().optional(),
  videos: z.any().optional(),
});

export const commentSchema = z.object({
  content: z.string(),
});
