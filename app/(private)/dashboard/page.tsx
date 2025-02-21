import { testUser } from "@/tests";
import { Logout } from "./_components/logout";

export default function Page() {
  return (
    <header className="flex justify-between items-center max-w-screen-lg mt-10 ps-10">
      <h1 className="text-4xl ">
        Welcome back Mr. {testUser.lastName}, this is a protected page!
      </h1>

      <Logout />
    </header>
  );
}
