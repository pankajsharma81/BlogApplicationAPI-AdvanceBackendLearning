import z from "zod";

export const registerUserSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  email: z.email("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type registerUserDTO = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.email("Email is required"),
  password: z.string(),
});

export type loginUserDTO = z.infer<typeof loginUserSchema>;

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh Token is required"),
})

export type refreshTokenDTO = z.infer<typeof refreshTokenSchema>;
