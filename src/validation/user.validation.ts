import z from "zod";

export const addUserSchema = z.object({
  name: z.string().min(2, "User name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Doctor", "Patient"], {
    message: "User role is required",
  }),
});

export type AddUserFormData = z.infer<typeof addUserSchema>;
