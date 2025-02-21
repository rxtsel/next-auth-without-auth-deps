"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

import { signUp } from "@/app/(auth)/actions";
import { useActionState, useId } from "react";

export default function Component() {
  const [formState, formAction, isPending] = useActionState(signUp, undefined);
  const id = useId();

  const emailError = formState?.error?.email;
  const passwordError = formState?.error?.password;
  const firstName = formState?.error?.firstName;
  const lastName = formState?.error?.lastName;

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
          <h1 className="sm:text-center font-semibold text-lg">
            Sign up CM Auth
          </h1>
          <p className="sm:text-center text-muted-foreground text-sm pt-2">
            We just need a few details to get you started.
          </p>
        </header>
      </div>

      <form className="space-y-5" action={formAction}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-first-name`}>First name</Label>
              <Input
                id={`${id}-first-name`}
                placeholder="Matt"
                type="text"
                name="firstName"
                // required
              />
              {firstName && <p className="text-xs text-red-500">{firstName}</p>}
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-last-name`}>Last name</Label>
              <Input
                id={`${id}-last-name`}
                placeholder="Welsh"
                type="text"
                name="lastName"
                // required
              />
              {lastName && <p className="text-xs text-red-500">{lastName}</p>}
            </div>
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input
              id={`${id}-email`}
              placeholder="hi@domain.com"
              type="email"
              name="email"
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
              // required
            />
            {passwordError && (
              <p className="text-xs text-red-500">{passwordError}</p>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader className="animate-spin h-5 w-5" /> : "Sign up"}
        </Button>
      </form>

      {/* TODO: // Implement google auth */}
      {/* <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1"> */}
      {/*   <span className="text-muted-foreground text-xs">Or</span> */}
      {/* </div> */}
      {/* <Button variant="outline" className="w-full"> */}
      {/*   Continue with Google */}
      {/* </Button> */}

      <p className="text-muted-foreground text-center text-sm">
        Already have an account?{" "}
        <a className="underline hover:no-underline text-black" href="/sign-in">
          Sign in
        </a>
        .
      </p>
    </section>
  );
}
