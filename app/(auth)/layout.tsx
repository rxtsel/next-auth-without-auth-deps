import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh w-full grid justify-center items-center">
      {children}
    </main>
  );
}
