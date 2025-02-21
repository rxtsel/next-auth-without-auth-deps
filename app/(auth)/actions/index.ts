"use server";

import { sleep } from "@/lib/utils";
import { testUser } from "@/tests";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession } from "../utils/session";

/* eslint-disable @typescript-eslint/no-explicit-any */

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  remember: z.string().optional(),
});

/**
 * Handles the sign-in process.
 *
 * @param _prevState - The previous state (not used in this function).
 * @param formData - The form data containing the user's email and password.
 * @returns An object containing an error message if the sign-in fails, otherwise redirects to the dashboard.
 */
export async function signIn(_prevState: any, formData: FormData) {
  await sleep(1000);

  const result = signInSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      error: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession({
    userId: testUser.id.toString(),
    remember: result.data.remember === "on",
  });

  redirect("/dashboard");
}

const signUpSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

// TODO: Implement the sign-up process. add local db or connect to a db
export async function signUp(prevState: any, formData: FormData) {
  await sleep(1000);

  const result = signUpSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
    };
  }

  return {
    ...prevState,
  };
}

/**
 * Signs out the user by deleting the session cookie and redirecting to the sign-in page.
 *
 * @returns  A promise that resolves when the sign-out process is complete.
 */
export async function signOut() {
  await sleep(1000);
  (await cookies()).delete("session");
  redirect("/sign-in");
}
