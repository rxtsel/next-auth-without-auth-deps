"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

import { signIn } from "@/app/(auth)/actions";
import { testUser } from "@/tests";
import { useActionState, useId } from "react";

export default function SignInForm() {
  const [formState, formAction, isPending] = useActionState(signIn, undefined);

  const id = useId();

  const emailError = formState?.error?.email;
  const passwordError = formState?.error?.password;

  return (
    <section className="max-w-sm shadow-sm p-6 w-full sm:w-sm space-y-5">
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full border"
          aria-hidden="true"
        >
          CM
        </div>
        <header>
          <h1 className="sm:text-center font-semibold text-lg">Welcome back</h1>
          <p className="sm:text-center text-muted-foreground text-sm pt-2">
            Enter your credentials to login to your account.
          </p>
        </header>
      </div>
      <form className="space-y-5" action={formAction}>
        <div className="space-y-4">
          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input
              id={`${id}-email`}
              placeholder="hi@yourcompany.com"
              type="email"
              name="email"
              defaultValue={testUser.email}
              // required
            />
            {emailError && <p className="text-xs text-red-500">{emailError}</p>}
          </div>

          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-password`}>Password</Label>
            <InputPassword
              id={`${id}-password`}
              placeholder="Enter your password"
              type="password"
              name="password"
              defaultValue={testUser.password}
              // required
            />
            {passwordError && (
              <p className="text-xs text-red-500">{passwordError}</p>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-remember`} name="remember" />
            <Label
              htmlFor={`${id}-remember`}
              className="text-muted-foreground font-normal"
            >
              Remember me
            </Label>
          </div>
          <a className="text-sm underline hover:no-underline" href="#">
            Forgot password?
          </a>
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader className="animate-spin h-5 w-5" /> : "Sign in"}
        </Button>
      </form>

      {/* TODO: // Implement google auth */}
      {/* <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1"> */}
      {/*   <span className="text-muted-foreground text-xs">Or</span> */}
      {/* </div> */}
      {/* <Button variant="outline" className="w-full"> */}
      {/*   Login with Google */}
      {/* </Button> */}

      <p className="text-muted-foreground text-center text-sm">
        Don&apos;t have an account?{" "}
        <a className="underline hover:no-underline text-black" href="/sign-up">
          Sign up
        </a>
        .
      </p>
    </section>
  );
}
