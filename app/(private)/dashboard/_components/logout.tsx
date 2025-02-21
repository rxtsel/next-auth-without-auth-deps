"use client";

import { signOut } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useActionState } from "react";

export function Logout() {
  const [, formAction, isPending] = useActionState(signOut, undefined);
  return (
    <form action={formAction}>
      <Button type="submit" disabled={isPending} className="min-w-20">
        {isPending ? <Loader className="animate-spin h-5 w-5" /> : "Logout"}
      </Button>
    </form>
  );
}
