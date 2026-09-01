import z from "zod";

export const registerUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type registerUserDTO = z.infer<typeof registerUserSchema>;
