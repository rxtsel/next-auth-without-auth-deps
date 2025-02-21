import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="ps-10 pt-10 flex justify-between max-w-screen-lg flex-col gap-4">
      <h1 className=" text-3xl">Welcome to Next.js Auth without Auth deps</h1>

      <a
        href="/sign-in"
        className={buttonVariants({
          variant: "default",
          className: "w-fit",
        })}
      >
        Go to auth page
      </a>
    </main>
  );
}
